import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { wishListItems } from "@/db/schema/wishlist-items";
import { eq } from "drizzle-orm";
import { productItems } from "@/db/schema/product-items";


export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const user = await params;    
    if (!user?.id)
      return NextResponse.json('gest user', { status: 401 },);

    const items = await db
      .select()
      .from(wishListItems)
      .innerJoin(productItems, eq(wishListItems.productId, productItems.id))
      .where(eq(wishListItems.userId, user.id));
      
    if (items.length === 0)
      return NextResponse.json("wishlist is empty", { status: 200 },);

    const transformedData = items.map((item) => ({
      id: item.wishlist_items.id,
      productId: item.product_items.id,
      name: item.product_items.name,
      price: item.product_items.price,
      quantity: item.wishlist_items.quantity, // from wishlist_items
      size: item.wishlist_items.size, // wishlist size, not product_items.sizes
      image: item.product_items.image,
      updatedAt: item.wishlist_items.updatedAt,
    }));

    return NextResponse.json(transformedData, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong in fetching wishlist!", { status: 501 },);
  }
};
