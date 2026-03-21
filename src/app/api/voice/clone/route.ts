import { NextRequest, NextResponse } from "next/server";
import { cloneVoice, VoicvError } from "@/lib/voicv";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const audioFiles = formData.getAll("audio").filter(
      (f): f is File => f instanceof Blob && f.size > 0
    );

    if (audioFiles.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'audio' field. Expected audio file(s)." },
        { status: 400 }
      );
    }

    // Validate total size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    const totalSize = audioFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > maxSize) {
      return NextResponse.json(
        { error: "Audio files are too large. Maximum total size is 50MB." },
        { status: 400 }
      );
    }

    // Delete existing voice if any
    const existingVoice = await prisma.voice.findUnique({
      where: { userId: session.user.id },
    });
    if (existingVoice) {
      await prisma.voice.delete({ where: { id: existingVoice.id } });
    }

    const name = `Mamy Voice - ${session.user.email || session.user.id}`;
    const result = await cloneVoice(audioFiles);

    // Save voice to DB
    await prisma.voice.create({
      data: {
        userId: session.user.id,
        elevenLabsId: result.voice_id,
        name,
      },
    });

    return NextResponse.json({ voice_id: result.voice_id });
  } catch (error) {
    if (error instanceof VoicvError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode === 429 ? 429 : 502 }
      );
    }

    console.error("Voice clone error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
