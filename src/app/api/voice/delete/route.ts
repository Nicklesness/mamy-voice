import { NextResponse } from "next/server";
import { deleteVoice, ElevenLabsError } from "@/lib/elevenlabs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const voice = await prisma.voice.findUnique({
      where: { userId: session.user.id },
    });

    if (!voice) {
      return NextResponse.json(
        { error: "No voice found" },
        { status: 404 }
      );
    }

    // Delete from ElevenLabs
    await deleteVoice(voice.elevenLabsId);

    // Delete from DB
    await prisma.voice.delete({ where: { id: voice.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ElevenLabsError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode === 429 ? 429 : 502 }
      );
    }

    console.error("Voice delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
