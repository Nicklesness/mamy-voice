import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPlanById } from "@/lib/pricing";
import { createInvoice } from "@/lib/lava";

/**
 * Checkout — creates a Lava.top payment invoice and returns paymentUrl.
 * Minutes are NOT granted here; the webhook handles that after payment confirmation.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { packId } = await request.json();
    const plan = getPlanById(packId);
    if (!plan) {
      return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
    }

    const invoice = await createInvoice({
      email: session.user.email,
      offerId: plan.lavaOfferId,
    });

    return NextResponse.json({ paymentUrl: invoice.paymentUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create payment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
