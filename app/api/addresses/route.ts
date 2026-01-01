import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { userAddress } from "@/db/schema/user-address";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId)
      return NextResponse.json(
        { success: false, message: "User ID required" },
        { status: 511 } // Network authentication required on client side
      );

    const addresses = await db
      .select()
      .from(userAddress)
      .where(eq(userAddress.userId, userId));

    return NextResponse.json({ success: true, addresses }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch addresses" },
      { status: 500 } // Internal server error
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, data, editingAddressId } = body;

    if (!userId)
      return NextResponse.json(
        { success: false, message: "User ID required" },
        { status: 401 } // unauthorised
      );

    if (editingAddressId) {
      await db
        .update(userAddress)
        .set(data)
        .where(
          and(
            eq(userAddress.userId, userId),
            eq(userAddress.id, editingAddressId)
          )
        );
    } else {
      await db.insert(userAddress).values({
        ...data,
        userId,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to save address" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id)
      return NextResponse.json(
        { success: false, message: "Bad request" },
        { status: 400 }
      );

    await db.delete(userAddress).where(eq(userAddress.id, id));
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete address" },
      { status: 500 }
    );
  }
}
