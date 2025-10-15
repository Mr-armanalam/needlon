/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { orders } from "@/db/schema/orders";
import { orderItems } from "@/db/schema/order-items";
import { eq } from "drizzle-orm";

// Stripe Raw Body Config
export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks = [];
  let result;
  while (!(result = await reader.read()).done) chunks.push(result.value);
  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  const body = await buffer(req.body!);
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed.", err);
    return new Response(`Webhook Error: ${err}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      console.log("✅ Payment Successful");
      const session = event.data.object as any;

      const userId = session.metadata?.userId;
      const items: Array<{ productId: string; quantity: number; price: number }> =
        session.metadata?.items ? JSON.parse(session.metadata.items) : [];

      const total = Math.round(session.amount_total || 0);
      const currency = session.currency?.toUpperCase() || "INR";
      const paymentId = session.id;

      // ✅ Insert Order
      const [newOrder] = await db
        .insert(orders)
        .values({ userId, total, currency, status: "PAID", paymentId })
        .returning({ id: orders.id });

      await db.insert(orderItems).values(
        items.map((item) => ({
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: Math.round(Number(item.price) * 100),
        }))
      );

      console.log("✅ Order Stored:", newOrder.id);
      break;
    }

    case "checkout.session.async_payment_failed":
    case "payment_intent.payment_failed": {
      console.log("❌ Payment Failed");

      const session = event.data.object as any;
      const paymentId = session.id || session.payment_intent;

      await db.update(orders).set({ status: "FAILED" }).where(eq(orders.paymentId, paymentId));
      console.log("⚠️ Order Marked as FAILED");
      break;
    }

    default:
      console.log("ℹ️ Unhandled event:", event.type);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
