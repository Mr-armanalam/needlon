import { db } from "@/db";
import { orderItems } from "@/db/schema/order-items";
import { productCategory } from "@/db/schema/product-category";
import { productItems } from "@/db/schema/product-items";
import { desc, eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";

export async function getNewSectionProduct({
  type,
}: {
  type: "best-sellers" | "trending" | "arrivals" | null;
}) {
  try {
    let data;
    const cookie = await cookies();
    const cookieStore = cookie.toString();

    switch (type) {
      case "best-sellers":
        data = await db
          .select({
            product: productItems,
            totalSales: sql<number>`count(${orderItems.id})`.as("total_sales"),
            Category: {categoryName: productCategory.category, categoryType: productCategory.CatType},
          })
          .from(productItems)
          .leftJoin(orderItems, eq(productItems.id, orderItems.productId))
          .leftJoin(productCategory, eq(productItems.categoryId, productCategory.id))
          .groupBy(productItems.id, productCategory.category, productCategory.CatType)
          .orderBy((t) => desc(t.totalSales))
          .limit(10); // Get top 10          

        break;

      case "trending":
        const recommendRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/home-recommendation`,
          {
            cache: "no-store",
            headers: {
              Cookie: cookieStore,
            },
          },
        );

        const { recommended } = await recommendRes.json();
        data = recommended;
        break;

      case "arrivals":
        const userLikeRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/home-recommendation`,
          { cache: "no-store" },
        );

        const { youMayLike } = await userLikeRes.json();
        data = youMayLike;
        break;

      default:
        break;
    }

    return data;
  } catch (error) {
    console.error("Error fetching best-sellers products:", error);
    throw new Error("Could not fetch best-sellers products.");
  }
}
