import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { cartItems } from "@/db/schema/cart-items";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const { userId, cartItem, addQuantity = 0, removeQuantity = 0 } = await req.json();  

  if (!userId || !cartItem?.productId ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }  

  const [existingCart] = await db
    .select()
    .from(cartItems)
    .where(
      and(
        eq(cartItems.productId, cartItem.productId), // ✅ use productId
        eq(cartItems.userId, userId),
        eq(cartItems.size, cartItem.size)
      )
    )
    .limit(1);

  if (!existingCart) {
    const [created] = await db
      .insert(cartItems)
      .values({
        userId,
        productId: cartItem.productId, // ✅ real product id
        size: cartItem.size,
        quantity: cartItem.quantity ?? 1,
      })
      .returning();

    return NextResponse.json({ created }, { status: 200 });
  }

  // update existing row
  const newQuantity =
    existingCart.quantity + addQuantity - removeQuantity;

  if (newQuantity <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, existingCart.id));
    return NextResponse.json({ deleted: true }, { status: 200 });
  }

  const [updated] = await db
    .update(cartItems)
    .set({ quantity: newQuantity })
    .where(eq(cartItems.id, existingCart.id))
    .returning();

  return NextResponse.json({ updated });
}


// export const GET = async () => {
//   // const { userId } = await req.json();
//   const session = await auth();
//   const userId = session?.user.id;

//   if (!userId) return NextResponse.json({error: 'unauthorised access'}, {status: 401})

//   const [cartItem] = await db
//     .select()
//     .from(cartItems)
//     .where(eq(cartItems.userId, userId));

//   return NextResponse.json(cartItem, { status: 200 });
// };
