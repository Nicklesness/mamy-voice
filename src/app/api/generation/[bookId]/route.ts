import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookId } = await params;

  const generation = await prisma.generation.findUnique({
    where: { userId_bookId: { userId: session.user.id, bookId } },
  });

  if (!generation || generation.status !== "DONE" || !generation.audioUrl) {
    return NextResponse.json({ audioUrl: null });
  }

  return NextResponse.json({ audioUrl: generation.audioUrl });
}
