/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from "@/features/cart-slice";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db"; 
import { orders } from "@/db/schema/orders"; 
import { orderItems } from "@/db/schema/order-items"; 
import { eq, sql } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const {
      cartItems,
      discountAmount,
      percentDiscount,
      currentAddressId,
      invoice,
      userId,
      couponId,
      price,
      mrp_price,
    } = await req.json();

    if (!userId || !currentAddressId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const [order] = await db
      .insert(orders)
      .values({
        userId: userId,
        shipping_address: currentAddressId || '',
        couponId :couponId || null,
        total: 0,
        mrp_price: mrp_price || 0,
        status: "PENDING",
      })
      .returning();

    // Optional: Insert order items separately

    if (cartItems?.length) {
      const itemData = cartItems.map((item: any) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: Math.round(Number(item.price)),
        properties: item.properties,
        delivery_date: sql`NOW() + interval '7 days'`,
        invoice,
      }));

      if (itemData.length > 0) {
        await db.insert(orderItems).values(itemData);
      }
    }

    // 2️⃣ Handle coupon creation in Stripe
    let stripeCouponId: string | undefined;
    let couponDiscount: number | undefined = undefined;

    if (percentDiscount) {
      const couponPercent = await stripe.coupons.create({
        percent_off: percentDiscount,
        duration: "once",
      });
      stripeCouponId = couponPercent.id;
      couponDiscount = (price * percentDiscount) / 100;
    } else if (discountAmount) {
      const couponAmount = await stripe.coupons.create({
        amount_off: discountAmount * 100,
        currency: "INR",
        duration: "once",
      });
      stripeCouponId = couponAmount.id;
      couponDiscount = discountAmount * 100;
    }

    // 3️⃣ Prepare line items for Stripe
    const line_items = cartItems.map((item: CartItem) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    // 4️⃣ Create Stripe checkout session and link orderId
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : [],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        orderId: String(order.id),
        userId: String(userId),
        coupon_discount: Number(couponDiscount) ?? 0,
        couponId
      },
    });

    // 5️⃣ Store Stripe sessionId in your DB (optional but helpful)
    await db
      .update(orders)
      .set({ paymentId: session.id })
      .where(eq(orders.id, order.id));

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("❌ Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
