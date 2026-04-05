import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PLANS } from "@/lib/pricing";

// TODO: Add webhook signature verification for production security.
// Lava.top may provide HMAC or other signing mechanism — verify before trusting payload.

interface LavaWebhookPayload {
  eventType: string;
  product: { id: string; title: string };
  buyer: { email: string };
  contractId: string;
  amount: number;
  currency: string;
  status: string;
  timestamp: string;
}

/**
 * Webhook endpoint for Lava.top payment notifications.
 * On successful payment: finds user by email, grants minutes, creates Purchase record.
 */
export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as LavaWebhookPayload;

    // Only process successful payments
    if (payload.eventType !== "payment.success") {
      return NextResponse.json({ ok: true });
    }

    const email = payload.buyer?.email;
    if (!email) {
      console.error("Lava webhook: missing buyer email", payload);
      return NextResponse.json(
        { error: "Missing buyer email" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error("Lava webhook: user not found for email", email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Match plan by Lava offer ID (product.id) or by amount
    const plan =
      PLANS.find((p) => p.lavaOfferId === payload.product?.id) ??
      PLANS.find((p) => p.priceCents === payload.amount);

    if (!plan) {
      console.error(
        "Lava webhook: could not match plan",
        payload.product,
        payload.amount
      );
      return NextResponse.json(
        { error: "Could not match payment to a plan" },
        { status: 400 }
      );
    }

    const minutesToGrant = plan.hours * 60;

    // Create purchase record and grant minutes atomically
    await prisma.$transaction([
      prisma.purchase.create({
        data: {
          userId: user.id,
          paymentProvider: "lava",
          externalId: payload.contractId,
          minutesPack: minutesToGrant,
          amountCents: payload.amount,
          currency: payload.currency,
          status: "COMPLETED",
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          minuteBalance: { increment: minutesToGrant },
        },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lava webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
