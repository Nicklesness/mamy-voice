import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const AUDIO_DIR = path.join(process.cwd(), "data", "audio");

export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get("file");

  if (!filename || !/^[\w-]+\.mp3$/.test(filename)) {
    return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
  }

  const filePath = path.join(AUDIO_DIR, filename);

  try {
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Audio not found" }, { status: 404 });
  }
}
