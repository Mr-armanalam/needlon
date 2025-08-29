import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { wishListItems } from "@/db/schema/wishlist-items";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { userId } = params;

  const wishlist = await db.select().from(wishListItems).where(eq(wishListItems.userId, userId));
  return NextResponse.json(wishlist);
}
