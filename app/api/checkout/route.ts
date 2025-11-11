/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { orders } from "@/db/schema/orders";
import { orderItems } from "@/db/schema/order-items";
import { eq, sql } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Helper: compute sums from order_items and return totals
 */
async function computeOrderSums(orderId: string) {
  const [result] = await db.execute(
    sql`
      SELECT
        COALESCE(SUM(price_at_purchase * quantity), 0) AS items_total,
        COALESCE(SUM(COALESCE(shipping_charge, 0)), 0) AS shipping_total
      FROM order_items
      WHERE order_id = ${orderId}
    `
  );

  return {
    itemsTotal: Number(result?.items_total || 0),
    shippingTotal: Number(result?.shipping_total || 0),
  };
}

async function recalcAndStoreOrderTotal(orderId: string, podCharge = 0, discountAmountRupees = 0, percentDiscount?: number) {
  const { itemsTotal, shippingTotal } = await computeOrderSums(orderId);

  const subtotal = itemsTotal + shippingTotal + Number(podCharge || 0);

  let discountApplied = 0;
  if (typeof percentDiscount === "number" && !Number.isNaN(percentDiscount) && percentDiscount > 0) {
    discountApplied = Math.round((subtotal * percentDiscount) / 100);
  } else if (discountAmountRupees && discountAmountRupees > 0) {
    discountApplied = Math.round(Number(discountAmountRupees));
  }

  const total = Math.max(0, Math.round(subtotal - discountApplied));

  await db
    .update(orders)
    .set({
      total,
      pod_charge: podCharge,
      coupon_discount: discountApplied,
    })
    .where(eq(orders.id, orderId));

  return { itemsTotal, shippingTotal, subtotal, discountApplied, total };
}

export async function POST(req: Request) {
  try {
    const {
      cartItems,          
      currentAddressId,
      userId,
      couponId,
      discountAmount,     
      percentDiscount,   
      invoice,
      paymentMode = "card", 
    } = await req.json();

    if (!userId || !currentAddressId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const podChargeForOrder = paymentMode === "pod" ? (typeof (req as any).podCharge === "number" ? (req as any).podCharge : 50) : 0;

    const [order] = await db
      .insert(orders)
      .values({
        userId,
        shipping_address: currentAddressId,
        couponId: couponId || null,
        total: 0,                
        status: "PENDING",
        mrp_price: 0,
        pod_charge: podChargeForOrder,
      })
      .returning();

    //Insert order_items (with per-item shipping charges)
    const itemData = cartItems.map((item: any) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      priceAtPurchase: Math.round(Number(item.price)),
      properties: item.properties || null,
      invoice: invoice || null,
      shipping_charge: Math.round(Number(item.shippingCharge || 0)),
      delivery_date: sql`NOW() + interval '7 days'`,
    }));

    await db.insert(orderItems).values(itemData);

    
    const { itemsTotal, shippingTotal, subtotal, discountApplied, total } =
      await recalcAndStoreOrderTotal(order.id, podChargeForOrder, discountAmount ?? 0, percentDiscount);

   
    let stripeCouponId: string | undefined = undefined;
    if (typeof percentDiscount === "number" && percentDiscount > 0) {
      const coupon = await stripe.coupons.create({
        percent_off: percentDiscount,
        duration: "once",
      });
      stripeCouponId = coupon.id;
    } else if (discountAmount && discountAmount > 0) {
      const coupon = await stripe.coupons.create({
        amount_off: Math.round(discountAmount * 100), // rupees -> paise
        currency: "INR",
        duration: "once",
      });
      stripeCouponId = coupon.id;
    }

  
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  
    for (const item of cartItems) {
      line_items.push({
        price_data: {
          currency: "INR",
          product_data: { name: item.name, images: item.image ? [item.image] : [] },
          unit_amount: Math.round(item.price * 100), // rupees -> paise
        },
        quantity: item.quantity || 1,
      });

      
      const shippingChargeForItem = Math.round(Number(item.shippingCharge || 0));
      if (shippingChargeForItem > 0) {
        line_items.push({
          price_data: {
            currency: "INR",
            product_data: { name: `${item.name} - Shipping` },
            unit_amount: shippingChargeForItem * 100,
          },
          quantity: 1,
        });
      }
    }

    
    if (podChargeForOrder > 0) {
      line_items.push({
        price_data: {
          currency: "INR",
          product_data: { name: "POD (Pay on Delivery) Charge" },
          unit_amount: Math.round(podChargeForOrder * 100),
        },
        quantity: 1,
      });
    }

    
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : [],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        orderId: String(order.id),
        userId: String(userId),
        couponId: couponId || "",
        // store server-verified totals for cross-checks
        verified_items_total: String(itemsTotal),
        verified_shipping_total: String(shippingTotal),
        verified_pod_charge: String(podChargeForOrder),
        coupon_discount: String(discountApplied),
        amount_total: String(total),
      },
    });

    
    await db
      .update(orders)
      .set({ paymentId: session.id, total })
      .where(eq(orders.id, order.id));

    
    return NextResponse.json({ url: session.url, orderId: order.id, total });
  } catch (error: any) {
    console.error("❌ Checkout Error:", error);
    return NextResponse.json({ error: "Checkout failed", details: error?.message || String(error) }, { status: 500 });
  }
}







// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { CartItem } from "@/features/cart-slice";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { db } from "@/db"; 
// import { orders } from "@/db/schema/orders"; 
// import { orderItems } from "@/db/schema/order-items"; 
// import { eq, sql } from "drizzle-orm";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(req: Request) {
//   try {
//     const {
//       cartItems,
//       discountAmount,
//       percentDiscount,
//       currentAddressId,
//       invoice,
//       userId,
//       couponId,
//       price,
//       mrp_price,
//     } = await req.json();

//     if (!userId || !currentAddressId) {
//       return NextResponse.json(
//         { error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const [order] = await db
//       .insert(orders)
//       .values({
//         userId: userId,
//         shipping_address: currentAddressId || '',
//         couponId :couponId || null,
//         total: 0,
//         mrp_price: mrp_price || 0,
//         status: "PENDING",
//       })
//       .returning();

//     // Optional: Insert order items separately

//     if (cartItems?.length) {
//       const itemData = cartItems.map((item: any) => ({
//         orderId: order.id,
//         productId: item.productId,
//         quantity: item.quantity,
//         priceAtPurchase: Math.round(Number(item.price)),
//         properties: item.properties,
//         delivery_date: sql`NOW() + interval '7 days'`,
//         invoice,
//       }));

//       if (itemData.length > 0) {
//         await db.insert(orderItems).values(itemData);
//       }
//     }

//     // 2️⃣ Handle coupon creation in Stripe
//     let stripeCouponId: string | undefined;
//     let couponDiscount: number | undefined = undefined;

//     if (percentDiscount) {
//       const couponPercent = await stripe.coupons.create({
//         percent_off: percentDiscount,
//         duration: "once",
//       });
//       stripeCouponId = couponPercent.id;
//       couponDiscount = (price * percentDiscount) / 100;
//     } else if (discountAmount) {
//       const couponAmount = await stripe.coupons.create({
//         amount_off: discountAmount * 100,
//         currency: "INR",
//         duration: "once",
//       });
//       stripeCouponId = couponAmount.id;
//       couponDiscount = discountAmount * 100;
//     }

//     // 3️⃣ Prepare line items for Stripe
//     const line_items = cartItems.map((item: CartItem) => ({
//       price_data: {
//         currency: "INR",
//         product_data: {
//           name: item.name,
//           images: item.image ? [item.image] : [],
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.quantity || 1,
//     }));

//     // 4️⃣ Create Stripe checkout session and link orderId
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items,
//       discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : [],
//       success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
//       metadata: {
//         orderId: String(order.id),
//         userId: String(userId),
//         coupon_discount: Number(couponDiscount) ?? 0,
//         couponId
//       },
//     });

//     // 5️⃣ Store Stripe sessionId in your DB (optional but helpful)
//     await db
//       .update(orders)
//       .set({ paymentId: session.id })
//       .where(eq(orders.id, order.id));

//     return NextResponse.json({ url: session.url });
//   } catch (error: any) {
//     console.error("❌ Stripe Checkout Error:", error);
//     return NextResponse.json(
//       { error: "Failed to create checkout session" },
//       { status: 500 }
//     );
//   }
// }
