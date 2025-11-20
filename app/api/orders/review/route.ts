import { db } from "@/db";
import { orderItems } from "@/db/schema/order-items";
import { orders } from "@/db/schema/orders";
import { productReview } from "@/db/schema/product-review";
import { authOptions } from "@/lib/auth-option/auth-data";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// export const POST = async (req: NextRequest) => {
//   try {
//     const { orderItemId, productId, comment, rating } = await req.json();

//     if (!orderItemId && !productId && !rating) {
//       return NextResponse.json(
//         { error: "Unauthorized access" },
//         { status: 401 }
//       );
//     }

//     const session = await getServerSession(authOptions);

//     if (!session?.user?.id) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const [checkValidOrder] = await db
//       .select({
//         rating: orderItems.rating,
//         paymentStatus: orders.status,
//       })
//       .from(orderItems)
//       .innerJoin(orders, eq(orderItems.orderId, orders.id))
//       .where(eq(orderItems.id, orderItemId));

//     console.log(checkValidOrder);

//     if (
//       checkValidOrder.paymentStatus === "paid" &&
//       checkValidOrder.rating === null
//     ) {
//       const [createRating] = await db
//         .insert(productReview)
//         .values({
//           productId: productId,
//           userId: session.user.id,
//           userName: session.user.name ?? "",
//           rating,
//           comment,
//         })
//         .returning();

//       if (!createRating)
//         return NextResponse.json(
//           { error: "Failed to reviewing this product" },
//           { status: 500 }
//         );

//       const [updateOrderItem] = await db
//         .update(orderItems)
//         .set({
//           rating: createRating.id,
//         })
//         .where(eq(orderItems.id, orderItemId))
//         .returning();

//       if (!updateOrderItem)
//         return NextResponse.json(
//           { error: "Failed to update order rating" },
//           { status: 500 }
//         );

//       return NextResponse.json({ createRating }, { status: 200 });
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "something went wrong" },
//       { status: 500 }
//     );
//   }
// };

// export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.id) {
//     return Response.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const allreview = await db
//       .select()
//       .from(productReview)
//       .where(eq(productReview.userId, session.user.id));

//     return NextResponse.json({ allreview }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "something went wrong to fetching user review" },
//       { status: 500 }
//     );
//   }
// }

export const POST = async (req: NextRequest) => {
  try {
    const { orderItemId, productId, comment, rating } = await req.json();

    if (!orderItemId || !productId || !rating) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [checkValidOrder] = await db
      .select({
        rating: orderItems.rating,
        paymentStatus: orders.status,
      })
      .from(orderItems)
      .innerJoin(orders, eq(orderItems.orderId, orders.id))
      .where(eq(orderItems.id, orderItemId));

    if (
      checkValidOrder.paymentStatus === "paid" &&
      checkValidOrder.rating === null
    ) {
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

      const [updateOrderItem] = await db
        .update(orderItems)
        .set({
          rating: createRating.id,
        })
        .where(eq(orderItems.id, orderItemId))
        .returning();

      if (!updateOrderItem)
        return NextResponse.json(
          { error: "Failed to update order rating" },
          { status: 500 }
        );

      return NextResponse.json(
        { review: createRating, orderItemId },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allreview = await db
      .select({
        id: productReview.id,
        productId: productReview.productId,
        rating: productReview.rating,
        comment: productReview.comment,
        userId: productReview.userId,
        userName: productReview.userName,
        updatedAt: productReview.updatedAt,
        orderItemId: orderItems.id, // ⭐ IMPORTANT
      })
      .from(productReview)
      .innerJoin(orderItems, eq(orderItems.rating, productReview.id))
      .where(eq(productReview.userId, session.user.id));

    return NextResponse.json({ allreview }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "something went wrong fetching user review" },
      { status: 500 }
    );
  }
}
