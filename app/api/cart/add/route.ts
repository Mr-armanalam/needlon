import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { cartItems } from "@/db/schema";

export async function POST(req: NextRequest) {
  const { userId, item } = await req.json();

  if (!userId || !item) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // check if product already exists in cart
  const existing = await db
    .select()
    .from(cartItems)
    .where(
      and(eq(cartItems.userId, userId), eq(cartItems.productId, item.id), eq(cartItems.size, item.size))
    )
    .limit(1);

  if (existing.length > 0) {
    const updated = await db
      .update(cartItems)
      .set({ quantity: existing[0].quantity + item.quantity })
      .where(eq(cartItems.id, existing[0].id))
      .returning();

    return NextResponse.json(updated[0]);
  }

  const created = await db
    .insert(cartItems)
    .values({
      userId,
      productId: item.id,
      name: item.name,
      price: item.price,
      size: item.size,
      image: item.image,
      quantity: item.quantity,
    })
    .returning();

  return NextResponse.json(created[0]);
}
