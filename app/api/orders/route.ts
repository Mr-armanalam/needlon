import { orders } from "@/db/schema/orders";
import { orderItems } from "@/db/schema/order-items";
import { productItems } from "@/db/schema/product-items";
import { and, eq, ilike, sql } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { db } from "@/db";
import { authOptions } from "@/lib/auth-option/auth-data";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

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
    })
    .from(orders)
    .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
    .leftJoin(productItems, eq(orderItems.productId, productItems.id))
    .where(
      and(
        eq(orders.userId, userId),
        search ? ilike(productItems.name, `%${search}%`) : sql`TRUE`
      )
    )
    .orderBy(orders.createdAt);

  return Response.json(data);
}
