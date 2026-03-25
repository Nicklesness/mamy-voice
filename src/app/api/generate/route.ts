import { NextRequest, NextResponse } from "next/server";
import { generateSpeech, splitText, ElevenLabsError } from "@/lib/elevenlabs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadAudio, generationKey } from "@/lib/r2";

// Safety limit: only generate ~30 seconds of audio (≈75 words)
// Remove this limit when ready for full-book generation
const PREVIEW_WORD_LIMIT = 75;

function truncateToPreview(text: string): string {
  const words = text.split(/\s+/);
  if (words.length <= PREVIEW_WORD_LIMIT) return text;
  // Find sentence boundary near the limit
  const truncated = words.slice(0, PREVIEW_WORD_LIMIT).join(" ");
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

    // Check balance (preview mode: ~0.5 min, full book: estimatedMinutes)
    const previewMinutes = 0.5; // ~30 seconds preview
    const minutesNeeded = previewMinutes; // TODO: use book.estimatedMinutes for full generation
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { minuteBalance: true },
    });
    if (!user || user.minuteBalance < minutesNeeded) {
      return NextResponse.json(
        {
          error: "Not enough minutes. Please purchase more.",
          minutesNeeded,
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

    // Generate speech (preview mode: ~30 seconds)
    // TODO: remove PREVIEW_WORD_LIMIT for full-book generation
    // For full books, use: const chunks = splitText(book.text, 5000);
    // then generate each chunk and concatenate MP3 buffers
    const previewText = truncateToPreview(book.text);
    const audioBuffer = await generateSpeech(previewText, voice.elevenLabsId);
    const combined = new Uint8Array(audioBuffer);

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
          minutesUsed: minutesNeeded,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          minuteBalance: { decrement: minutesNeeded },
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
