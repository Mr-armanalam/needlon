import { db } from "@/db";
import { productItems } from "@/db/schema/product-items";
import { eq } from "drizzle-orm";

export async function getProductByType({
  type,
}: {
  type: "premium" | "recommend" | "user_like" | null;
}) {
  try {
    let data;

    switch (type) {
      case "premium":
        data = await db
          .select()
          .from(productItems)
          .where(eq(productItems.isPremium, true));
        break;

      case "recommend":
        const recommendRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/home-recommendation`,
          { cache: "no-store" }
        );

        const { recommended } = await recommendRes.json();
        data = recommended;
        break;

      case "user_like":
        const userLikeRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/home-recommendation`,
          { cache: "no-store" }
        );

        const { youMayLike } = await userLikeRes.json();
        data = youMayLike;
        break;

      default:
        break;
    }

    return data;
  } catch (error) {
    console.error("Error fetching premium products:", error);
    throw new Error("Could not fetch premium products.");
  }
}
