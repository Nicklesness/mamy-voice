import { NextResponse } from "next/server";
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

    // Voicv doesn't have a delete voice endpoint — just remove from DB
    await prisma.voice.delete({ where: { id: voice.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Voice delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
