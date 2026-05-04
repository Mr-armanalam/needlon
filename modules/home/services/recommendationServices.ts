import { db } from "@/db";
import { productItems } from "@/db/schema/product-items";
import { orderItems } from "@/db/schema/order-items";
import { eq, desc, inArray, sql } from "drizzle-orm";

export const fetchProductsByCategory = async (categoryIds: string[], limit: number) => {
  return await db
    .select()
    .from(productItems)
    .where(inArray(productItems.categoryId, categoryIds))
    .orderBy(desc(productItems.averageRating))
    .limit(limit);
};

export const getTrendingProducts = async () => {
  const res = await db
    .select({ product: productItems })
    .from(orderItems)
    .innerJoin(productItems, eq(orderItems.productId, productItems.id))
    .groupBy(productItems.id)
    .orderBy(desc(sql`COUNT(${orderItems.productId})`))
    .limit(10);
  return res.map((p) => p.product);
};

export const getNewArrivals = async (limit = 12) => {
  return await db.select().from(productItems).orderBy(desc(productItems.createdAt)).limit(limit);
};

export const getTopRated = async (limit = 12) => {
  return await db.select().from(productItems).orderBy(desc(productItems.averageRating)).limit(limit);
};