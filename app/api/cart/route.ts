import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { cartItems } from "@/db/schema/cart-items";

export async function POST(req: NextRequest) {
  const { userId, cartItem } = await req.json();
  console.log(cartItem);
  

  if (!userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existingCart = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.userId, userId),
        eq(cartItems.productId, cartItem.id),
        eq(cartItems.size, cartItem.size)
      )
    )
    .limit(1);

  if (existingCart.length > 0) {
    const updated = await db
      .update(cartItems)
      .set({ quantity: existingCart[0].quantity + cartItem.quantity })
      .where(eq(cartItems.id, existingCart[0].id))
      .returning();

    return NextResponse.json(updated[0]);
  }

  const [created] = await db
    .insert(cartItems)
    .values({
      userId,
      productId : cartItem.id,
      size: cartItem.size,
      quantity : cartItem.quantity,
    })
    .returning();

  return NextResponse.json(created);
}
