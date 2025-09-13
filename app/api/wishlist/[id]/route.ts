import { NextResponse } from "next/server";
import { db } from "@/db";
import { wishListItems } from "@/db/schema/wishlist-items";
import { eq } from "drizzle-orm";

export async function GET({ params }: { params: Promise<{ userId: string }> }) {
  try {
    const user = await params;
    if (!user) return NextResponse.json("Something is wrong", { status: 500 });
    const userId = user.userId;

    const wishlist = await db
      .select()
      .from(wishListItems)
      .where(eq(wishListItems.userId, userId));
    return NextResponse.json(wishlist);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something is wrong", { status: 500 });
  }
}
