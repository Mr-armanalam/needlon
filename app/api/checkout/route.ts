/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartItem } from "@/features/cart-slice";
import { NextResponse } from "next/server";
import Stripe from "stripe";

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
      mrp_price
    } = await req.json();

    if (!(userId && currentAddressId)) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    let stripeCouponId: string | undefined = undefined;
    let couponDiscount: number | undefined = undefined;

    if (percentDiscount) {
      const couponPercent = await stripe.coupons.create({
        percent_off: percentDiscount,
        duration: "once",
      });

      stripeCouponId = couponPercent.id;
      couponDiscount = price*percentDiscount/100;
    }else if (discountAmount) {
       const couponAmount = await stripe.coupons.create({
        amount_off: discountAmount*100 ,
        currency: 'INR',
        duration: "once",
      });

      couponDiscount = discountAmount *100;
      stripeCouponId = couponAmount.id;
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
        currentAddressId,
        couponId,
        coupon_discount : couponDiscount ?? 0,
        invoice,
        mrp_price,
        items: JSON.stringify(
          cartItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            // order properties
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
