import { NextRequest, NextResponse } from "next/server";
import { generateSpeech, VoicvError } from "@/lib/voicv";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadAudio, generationKey } from "@/lib/r2";

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
    if (!user || user.minuteBalance < book.estimatedMinutes) {
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

    // Generate speech
    const audioBuffer = await generateSpeech(book.text, voice.elevenLabsId);
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
          minutesUsed: book.estimatedMinutes,
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          minuteBalance: { decrement: book.estimatedMinutes },
        },
      }),
    ]);

    return NextResponse.json({ audioUrl });
  } catch (error) {
    if (error instanceof VoicvError) {
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
