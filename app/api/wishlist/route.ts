import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { wishListItems } from "@/db/schema/wishlist-items";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const { userId, productId, size, action } = await req.json();

  if (!userId || !productId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const [existing] = await db
    .select()
    .from(wishListItems)
    .where(and(eq(wishListItems.userId, userId), eq(wishListItems.productId, productId)))
    .limit(1);

  if (action === "remove" && existing) {
    await db.delete(wishListItems).where(eq(wishListItems.id, existing.id));
    return NextResponse.json({ removed: true });
  }

  if (action === "add" && !existing) {
    const [created] = await db.insert(wishListItems).values({
      userId,
      productId,
      size,
      quantity: 1,
    }).returning();
    return NextResponse.json({ created });
  }

  return NextResponse.json({ success: true });
}
