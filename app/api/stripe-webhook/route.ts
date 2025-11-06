import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { orders } from "@/db/schema/orders";
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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    const coupon_discount = session.metadata?.coupon_discount;
    if (orderId) {
      await db
        .update(orders)
        .set({ status: "PAID", coupon_discount: Number(coupon_discount) })
        .where(eq(orders.id, orderId));
    }
  }

  if (
    event.type === "checkout.session.expired" ||
    event.type === "checkout.session.async_payment_failed"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId) {
      await db
        .update(orders)
        .set({ status: "FAILED" })
        .where(eq(orders.id,orderId));
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { db } from "@/db";
// import { orders } from "@/db/schema/orders";
// import { orderItems } from "@/db/schema/order-items";
// import { and, eq, sql } from "drizzle-orm";
// import { coupons } from "@/db/schema/coupons";

// // Stripe Raw Body Config
// export const config = { api: { bodyParser: false } };

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// async function buffer(readable: ReadableStream<Uint8Array>) {
//   const reader = readable.getReader();
//   const chunks = [];
//   let result;
//   while (!(result = await reader.read()).done) chunks.push(result.value);
//   return Buffer.concat(chunks);
// }

// export async function POST(req: Request) {
//   const body = await buffer(req.body!);
//   const sig = req.headers.get("stripe-signature")!;
//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     console.error("❌ Webhook signature verification failed.", err);
//     return new Response(`Webhook Error: ${err}`, { status: 400 });
//   }

//   switch (event.type) {
//     case "checkout.session.completed": {
//       console.log("✅ Payment Successful");
//       const session = event.data.object as any;

//       const userId = session.metadata?.userId;
//       const shippingAddress = session.metadata?.currentAddressId;
//       const couponId = session.metadata?.couponId;
//       const coupon_discount = session.metadata?.coupon_discount;
//       const mrp_price = session.metadata?.mrp_price;
//       const invoice = session.metadata?.invoice;

//       const items: Array<{
//         productId: string;
//         quantity: number;
//         price: number;
//         properties: string;
//       }> = session.metadata?.items ? JSON.parse(session.metadata.items) : [];

//       const total = Math.round(session.amount_total || 0) / 100;
//       const currency = session.currency?.toUpperCase() || "INR";
//       const paymentId = session.id;

//       // ✅ Insert Order
//       const [newOrder] = await db
//         .insert(orders)
//         .values({
//           userId,
//           total,
//           coupon_discount,
//           shipping_address: shippingAddress || "",
//           currency,
//           status: "PAID",
//           mrp_price,
//           paymentId,
//         })
//         .returning({ id: orders.id });

//       if (couponId) {
//         await db
//           .update(coupons)
//           .set({
//             usedCount: sql`${coupons.usedCount} + 1`,
//           })
//           .where(and(eq(coupons.userId, userId), eq(coupons.id, couponId)));
//       }

//       const itemData = items.map((item) => ({
//         orderId: newOrder.id,
//         productId: item.productId,
//         quantity: item.quantity,
//         priceAtPurchase: Math.round(Number(item.price) * 100),
//         properties: item.properties,
//         invoice,
//       }));

//       // Insert order items as an array of rows that match the orderItems schema
//       if (itemData.length > 0) {
//         await db.insert(orderItems).values(itemData);
//       }

//       console.log("✅ Order Stored:", newOrder.id);
//       break;
//     }

//     case "checkout.session.async_payment_failed":
//     case "payment_intent.payment_failed": {
//       console.log("❌ Payment Failed");

//       const session = event.data.object as any;
//       const paymentId = session.id || session.payment_intent;

//       await db
//         .update(orders)
//         .set({ status: "FAILED" })
//         .where(eq(orders.paymentId, paymentId));
//       console.log("⚠️ Order Marked as FAILED");
//       break;
//     }

//     default:
//       console.log("ℹ️ Unhandled event:", event.type);
//   }

//   return NextResponse.json({ received: true }, { status: 200 });
// }
