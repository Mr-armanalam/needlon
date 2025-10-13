/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { orders } from "@/db/schema/orders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const buf = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const userId = session.metadata?.userId;
      const items = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : [];
      const total = session.amount_total || 0;
      const currency = session.currency?.toUpperCase() || "INR"; // e.g. "usd", "inr"

      await db.insert(orders).values({
        userId,
        items,
        total,
        currency,
        status: "PAID",
        paymentId: session.id,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
