import { NextRequest, NextResponse } from "next/server";
import { generateSpeech, splitText, ElevenLabsError } from "@/lib/elevenlabs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadAudio, generationKey } from "@/lib/r2";

// Average TTS speed: ~150 words per minute
const WORDS_PER_MINUTE = 150;

/**
 * Truncate book text to fit within available minutes.
 * Cuts at sentence boundary near the word limit.
 */
function truncateToMinutes(text: string, minutes: number): string {
  const wordLimit = Math.floor(minutes * WORDS_PER_MINUTE);
  const words = text.split(/\s+/);

  if (words.length <= wordLimit) return text;

  const truncated = words.slice(0, wordLimit).join(" ");
  // Find last sentence boundary
  const lastSentence = truncated.search(/[.!?][^.!?]*$/);
  if (lastSentence > truncated.length / 2) {
    return truncated.slice(0, lastSentence + 1);
  }
  return truncated + "...";
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { bookId } = body;

    if (!bookId || typeof bookId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'bookId' field." },
        { status: 400 }
      );
    }

    // Get user's voice from DB
    const voice = await prisma.voice.findUnique({
      where: { userId: session.user.id },
    });
    if (!voice) {
      return NextResponse.json(
        { error: "No voice recorded. Please record your voice first." },
        { status: 400 }
      );
    }

    // Get book
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book || !book.isPublished) {
      return NextResponse.json(
        { error: `Book not found: ${bookId}` },
        { status: 404 }
      );
    }

    // Check balance
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { minuteBalance: true },
    });
    if (!user || user.minuteBalance < 0.5) {
      return NextResponse.json(
        {
          error: "Not enough minutes. Please purchase more.",
          minutesNeeded: book.estimatedMinutes,
          minuteBalance: user?.minuteBalance ?? 0,
        },
        { status: 402 }
      );
    }

    // Check for existing generation
    const existing = await prisma.generation.findUnique({
      where: { userId_bookId: { userId: session.user.id, bookId } },
    });
    if (existing?.status === "DONE" && existing.audioKey) {
      return NextResponse.json({ audioUrl: `/api/audio?key=${encodeURIComponent(existing.audioKey)}` });
    }

    // Determine how many minutes to generate
    // Use the lesser of: book duration or user's balance
    const minutesToGenerate = Math.min(book.estimatedMinutes, user.minuteBalance);

    // Truncate text if user doesn't have enough minutes for full book
    const textToGenerate = truncateToMinutes(book.text, minutesToGenerate);

    // Create or update generation record
    const generation = await prisma.generation.upsert({
      where: { userId_bookId: { userId: session.user.id, bookId } },
      create: {
        userId: session.user.id,
        bookId,
        voiceId: voice.id,
        status: "GENERATING",
      },
      update: {
        voiceId: voice.id,
        status: "GENERATING",
        errorMessage: null,
      },
    });

    // Split text into chunks (ElevenLabs has a ~5000 char limit per request)
    const chunks = splitText(textToGenerate, 4500);

    // Generate speech for each chunk and concatenate
    const audioBuffers: ArrayBuffer[] = [];
    for (const chunk of chunks) {
      const buffer = await generateSpeech(chunk, voice.elevenLabsId);
      audioBuffers.push(buffer);
    }

    // Concatenate all MP3 buffers
    const totalLength = audioBuffers.reduce((sum, buf) => sum + buf.byteLength, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of audioBuffers) {
      combined.set(new Uint8Array(buf), offset);
      offset += buf.byteLength;
    }

    // Upload to R2
    const audioKey = generationKey(session.user.id, bookId, voice.elevenLabsId);
    await uploadAudio(audioKey, combined);

    const audioUrl = `/api/audio?key=${encodeURIComponent(audioKey)}`;

    // Update generation record and deduct minutes
    await prisma.$transaction([
      prisma.generation.update({
        where: { id: generation.id },
        data: {
          status: "DONE",
          audioUrl,
          audioKey,
          minutesUsed: minutesToGenerate,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          minuteBalance: { decrement: minutesToGenerate },
        },
      }),
    ]);

    return NextResponse.json({ audioUrl });
  } catch (error) {
    if (error instanceof ElevenLabsError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode === 429 ? 429 : 502 }
      );
    }

    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
