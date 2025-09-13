import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { cartItems } from "@/db/schema/cart-items";
import { productItems } from "@/db/schema/product-items";

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   const { quantity } = await req.json();

//   if (!quantity || quantity < 1) {
//     return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
//   }

//   const updated = await db
//     .update(cartItems)
//     .set({ quantity })
//     .where(eq(cartItems.id, id))
//     .returning(); // so we get the updated row back

//   return NextResponse.json(updated[0] ?? null);
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await params;
//   await db.delete(cartItems).where(eq(cartItems.id, id));

//   return NextResponse.json({ success: true });
// }

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const cartItem = await db
      .select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        size: cartItems.size,
        status: cartItems.status,
        createdAt: cartItems.createdAt,
        updatedAt: cartItems.updatedAt,
        name: productItems.name,
        category: productItems.category,
        CatType: productItems.CatType,
        price: productItems.price,
        image: productItems.image,
        modalImage: productItems.modalImage,
      })
      .from(cartItems)
      .where(eq(cartItems.userId, id))
      .innerJoin(productItems, eq(cartItems.productId, productItems.id));

    return NextResponse.json(cartItem);
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}
