import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { wishListItems } from "@/db/schema/wishlist-items";
import { eq } from "drizzle-orm";
import { productItems } from "@/db/schema/product-items";


// export const GET = async (
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) => {  
//   try {
//     const user = await params;        
//     if (!user?.id)
//       return NextResponse.json('gest user', { status: 401 },);

//     const items = await db
//       .select()
//       .from(wishListItems)
//       .innerJoin(productItems, eq(wishListItems.productId, productItems.id))
//       .where(eq(wishListItems.userId, user.id));
      
//       console.log(items);
      
//     if (items.length === 0)
//       return NextResponse.json(`wishlist is empty`, { status: 300 });

//     const transformedData = items.map((item) => ({
//       id: item.wishlist_items.id,
//       productId: item.product_items.id,
//       name: item.product_items.name,
//       price: item.product_items.price,
//       quantity: item.wishlist_items.quantity, // from wishlist_items
//       size: item.wishlist_items.size, // wishlist size, not product_items.sizes
//       image: item.product_items.image,
//       updatedAt: item.wishlist_items.updatedAt,
//     }));

//     return NextResponse.json(transformedData, {status: 200});
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json("something went wrong in fetching wishlist!", { status: 501 },);
//   }
// };


export const GET = async (
  req: NextRequest,
  // { params }: { params: { id: string } }  // ✅ Not Promise
    { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const {id:userId} = await params;
    // const userId = params.id; // ✅ Directly access
    if (!userId) return NextResponse.json("guest user", { status: 401 });

    const items = await db
      .select()
      .from(wishListItems)
      .innerJoin(productItems, eq(wishListItems.productId, productItems.id))
      .where(eq(wishListItems.userId, userId));

    if (items.length === 0)
      return NextResponse.json([], { status: 204 }); // ✅ Proper status

    const transformedData = items.map((item) => ({
      id: item.wishlist_items.id,
      productId: item.product_items.id,
      name: item.product_items.name,
      price: item.product_items.price,
      quantity: item.wishlist_items.quantity,
      size: item.wishlist_items.size,
      image: item.product_items.image,
      updatedAt: item.wishlist_items.updatedAt,
    }));

    return NextResponse.json(transformedData, { status: 200 });
  } catch (error) {
    console.log("API Error:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
