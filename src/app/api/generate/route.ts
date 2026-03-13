import { NextRequest, NextResponse } from "next/server";
import { generateSpeech, splitText, ElevenLabsError } from "@/lib/elevenlabs";
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

    // Split text into chunks if needed (max 5000 chars per request)
    const chunks = splitText(book.text, 5000);

    // Generate speech for each chunk
    const audioBuffers: ArrayBuffer[] = [];
    for (const chunk of chunks) {
      const audioBuffer = await generateSpeech(chunk, voiceId);
      audioBuffers.push(audioBuffer);
    }

    // Concatenate all audio buffers
    const totalLength = audioBuffers.reduce((sum, buf) => sum + buf.byteLength, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const buf of audioBuffers) {
      combined.set(new Uint8Array(buf), offset);
      offset += buf.byteLength;
    }

    // Save to public/audio directory
    const audioDir = path.join(process.cwd(), "public", "audio");
    await mkdir(audioDir, { recursive: true });

    const filename = `${bookId}-${voiceId}.mp3`;
    const filePath = path.join(audioDir, filename);
    await writeFile(filePath, combined);

    const audioUrl = `/audio/${filename}`;

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
