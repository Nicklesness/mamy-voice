import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPackById } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";

/**
 * Stub checkout — immediately grants minutes without real payment.
 * Replace with actual payment provider (Stripe, YooKassa, etc.) later.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { packId } = await request.json();
    const pack = getPackById(packId);
    if (!pack) {
      return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
    }

    // Stub: immediately add minutes + create purchase record
    await prisma.$transaction([
      prisma.purchase.create({
        data: {
          userId: session.user.id,
          paymentProvider: "stub",
          minutesPack: pack.minutes,
          amountCents: pack.priceCents,
          status: "COMPLETED",
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          minuteBalance: { increment: pack.minutes },
        },
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to process purchase" },
      { status: 500 }
    );
  }
}
