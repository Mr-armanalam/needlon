"use server";
import { db } from "@/db";
import { wishListItems } from "@/db/schema/wishlist-items";
import { eq } from "drizzle-orm";

export const getWishlistData = async (userId: string) => {
  try {
    if (!userId)
      return { message: "Something is wrong", status: 500, data: [] };

    const wishlist = await db
      .select()
      .from(wishListItems)
      .where(eq(wishListItems.userId, userId));

    if (wishlist.length === 0) {
      return { message: "No wishList Item", status: 200, data: [] };
    }
    return { message: "success", status: 200, data: wishlist };
  } catch (error) {
    console.log(error);
    return { message: "Something is wrong", status: 500, data: [] };
  }
};
