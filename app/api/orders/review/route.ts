import { db } from "@/db";
import { orderItems } from "@/db/schema/order-items";
import { productReview } from "@/db/schema/product-review";
import { authOptions } from "@/lib/auth-option/auth-data";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { orderItemId, productId, comment, rating } = await req.json();

    if (!orderItemId && !productId && !rating) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [checkValidOrder] = await db.select({
      rating,
      // validate order
    }).from(orderItems).where(
      eq(orderItems.id, orderItemId )
    )

    const [createRating] = await db
      .insert(productReview)
      .values({
        productId: productId,
        userId: session.user.id,
        userName: session.user.name ?? "",
        rating,
        comment,
      })
      .returning();

    if (!createRating)
      return NextResponse.json(
        { error: "Failed to reviewing this product" },
        { status: 500 }
      );

    const [updateOrderItem] = await db
      .update(orderItems)
      .set({
        rating: createRating.id,
      })
      .where(eq(orderItems.id, orderItemId)).returning();

    if (!updateOrderItem)
      return NextResponse.json(
        { error: "Failed to update order rating" },
        { status: 500 }
      );

      console.log(createRating, updateOrderItem);
      

    return NextResponse.json({ createRating }, { status: 200 });

    // const [data] = await db.insert(updateOrderItems).values()
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};
