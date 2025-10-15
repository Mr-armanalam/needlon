/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from "@/features/cart-slice";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { cartItems, couponDiscount, userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    let stripeCouponId: string | undefined = undefined;

    if (couponDiscount) {
      const coupon = await stripe.coupons.create({
        percent_off: couponDiscount,
        duration: "once",
      });
      stripeCouponId = coupon.id;
    }

    // Convert cart items to Stripe line items
    const line_items = cartItems.map((item: CartItem) => ({
      price_data: {
        currency: "INR",
        product_data: { name: item.name, images: [item.image] },
        unit_amount: item.price * 100, // paise
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : [],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      metadata: {
        userId,
        items: JSON.stringify(
          cartItems.map((item:any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
















// import { CartItem } from "@/features/cart-slice";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// export async function POST(req: Request) {
//   try {
//     const { cartItems, couponDiscount, userId } = await req.json();

//     if (!userId)
//       return NextResponse.json(
//         { error: "Unauthorised access" },
//         { status: 500 }
//       );

//     let stripeCouponId: string | undefined = undefined;

//     if (couponDiscount) {
//       const coupon = await stripe.coupons.create({
//         percent_off: couponDiscount,
//         duration: "once",
//       });
//       stripeCouponId = coupon.id;
//     }

//     const line_items = cartItems.map((item: CartItem) => ({
//       price_data: {
//         currency: "INR",
//         product_data: { name: item.name, images: [item.image] },
//         unit_amount: item.price * 100, // Price in cents
//       },
//       quantity: item.quantity || 1,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items,
//       discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : [],
//       metadata: {
//         userId: userId,
//         items: JSON.stringify(
//           cartItems.map((p: any) => ({
//             productId: p.id,
//             quantity: p.quantity,
//           }))
//         ),
//       },
//       success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe Error:", error);
//     return NextResponse.json(
//       { error: "Failed to create session" },
//       { status: 500 }
//     );
//   }
// }
