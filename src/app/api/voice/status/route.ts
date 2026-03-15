import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const voice = await prisma.voice.findUnique({
      where: { userId: session.user.id },
    });

    if (!voice) {
      return NextResponse.json({ exists: false, name: null, voiceId: null });
    }

    return NextResponse.json({
      exists: true,
      name: voice.name,
      voiceId: voice.elevenLabsId,
      createdAt: voice.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Voice status error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
