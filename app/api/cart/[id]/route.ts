import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { cartItems } from "@/db/schema/cart-items";
import { productItems } from "@/db/schema/product-items";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id)
      return NextResponse.json(
        { success: false, message: "Bad request" },
        { status: 400 }
      );

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
        price: productItems.price,
        mrp_price: productItems.mrp_price,
        image: productItems.image,
        modalImage: productItems.modalImage,
      })
      .from(cartItems)
      .where(eq(cartItems.userId, id))
      .innerJoin(productItems, eq(cartItems.productId, productItems.id));

    return NextResponse.json(cartItem, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json([], { status: 204 }); // no-content in response body
  }
}
