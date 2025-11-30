/* eslint-disable @typescript-eslint/no-explicit-any */
import { orders } from "@/db/schema/orders";
import { orderItems } from "@/db/schema/order-items";
import { productItems } from "@/db/schema/product-items";
import { and, eq, ilike, sql } from "drizzle-orm";
import { db } from "@/db";
import { auth } from "@/auth";


export type GroupedOrder = {
  orderId: string;
  createdAt: Date | null;
  status: string;
  total: number;
  currency: string | null;
  paymentId: string | null;
  items: {
    productName: string;
    image: string | null;
    price: number;
    properties: string | null;
  }[];
};

export async function GET(req: Request) {
  console.log('hi');
  
  const session = await auth();  
  console.log(session, 'session');
  

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";

  // 🔍 Filter orders only for the logged-in user
  const data = await db
    .select({
      orderId: orders.id,
      createdAt: orders.createdAt,
      status: orders.status,
      total: orders.total,
      currency: orders.currency,
      paymentId: orders.paymentId,
      productName: productItems.name,
      image: productItems.image,
      price: orderItems.priceAtPurchase,
      properties: orderItems.properties,
    })
    .from(orders)
    .innerJoin(orderItems, eq(orders.id, orderItems.orderId))
    .innerJoin(productItems, eq(orderItems.productId, productItems.id))
    .where(
      and(
        eq(orders.userId, userId),
        search ? ilike(productItems.name, `%${search}%`) : sql`TRUE`
      )
    )
    .orderBy(orders.createdAt);

  const grouped = Object.values(
    data.reduce((acc, row) => {
      if (!acc[row.orderId]) {
        acc[row.orderId] = {
          orderId: row.orderId,
          createdAt: row.createdAt,
          status: row.status,
          total: row.total,
          currency: row.currency,
          paymentId: row.paymentId,
          items: [],
        };
      }

      acc[row.orderId].items.push({
        productName: row.productName,
        image: row.image,
        price: row.price,
        properties: row.properties,
      });

      return acc;
    }, {} as Record<string, GroupedOrder>)
  );

  // console.log(grouped);

  return Response.json(grouped);
}
