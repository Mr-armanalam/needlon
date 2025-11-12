import { db } from "@/db";
import { orderItems } from "@/db/schema/order-items";
import { orders } from "@/db/schema/orders";
import { productItems } from "@/db/schema/product-items";
import { userAddress } from "@/db/schema/user-address";
import { authOptions } from "@/lib/auth-option/auth-data";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }


    const userId = session.user.id;

    const order = await db
      .select(
        {
        orderDate: orders.createdAt,
        orderId: orderItems.id,
        shippingAddress: {...userAddress},
        itemName: productItems.name,
        image: productItems.image,
        // size: orderItems.size
        productId: productItems.id,
        orderProperties: orderItems.properties,
        paymentMode: orders.paymentMode,
        shippingCharge: orderItems.shipping_charge,
        podCharge: orders.pod_charge,
        priceAtperchage: orderItems.priceAtPurchase,
        totalPurchasePrice: orders.total,
        couponDiscount: orders.coupon_discount
      }
    )
      .from(orderItems)
      .leftJoin(orders, eq(orderItems.orderId, orders.id))
      .leftJoin(productItems, eq(orderItems.productId, productItems.id))
      .leftJoin(userAddress, eq(orders.shipping_address, userAddress.id))
      .where(and(eq(orderItems.orderId, orderId), eq(orders.userId, userId)));
      

    return Response.json({ order }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Something went wrong in fetching orders" },
      { status: 400 }
    );
  }
}
