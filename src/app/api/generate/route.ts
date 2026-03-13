import { NextRequest, NextResponse } from "next/server";
import { generateSpeech, ElevenLabsError } from "@/lib/elevenlabs";
import { getBookById } from "@/lib/books";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookId, voiceId } = body;

    if (!bookId || typeof bookId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'bookId' field." },
        { status: 400 }
      );
    }

    if (!voiceId || typeof voiceId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'voiceId' field." },
        { status: 400 }
      );
    }

    const book = getBookById(bookId);
    if (!book) {
      return NextResponse.json(
        { error: `Book not found: ${bookId}` },
        { status: 404 }
      );
    }

    // Generate speech (single request — texts are short for MVP)
    const audioBuffer = await generateSpeech(book.text, voiceId);
    const combined = new Uint8Array(audioBuffer);

    // Save to data/audio directory (not public — served via API route)
    const audioDir = path.join(process.cwd(), "data", "audio");
    await mkdir(audioDir, { recursive: true });

    const filename = `${bookId}-${voiceId}.mp3`;
    const filePath = path.join(audioDir, filename);
    await writeFile(filePath, combined);

    const audioUrl = `/api/audio?file=${filename}`;

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
