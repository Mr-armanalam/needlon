import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { cartItems } from "@/db/schema";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { quantity } = await req.json();

  if (!quantity || quantity < 1) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  const updated = await db
    .update(cartItems)
    .set({ quantity })
    .where(eq(cartItems.id, params.id))
    .returning(); // so we get the updated row back

  return NextResponse.json(updated[0] ?? null);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.delete(cartItems).where(eq(cartItems.id, params.id));

  return NextResponse.json({ success: true });
}
