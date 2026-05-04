import { db } from "@/db";
import { productReview } from "@/db/schema/product-review";
import { orderItems } from "@/db/schema/order-items";
import { productItems } from "@/db/schema/product-items";
import { eq, sql } from "drizzle-orm";

export const ReviewService = {
  async createReview({ orderItemId, productId, userId, userName, rating, comment }: any) {
    // START process: Ensures all steps succeed or all fail
    return await db.transaction(async (tx) => {
      //  Create the Review
      const [newReview] = await tx
        .insert(productReview)
        .values({ productId, userId, userName, rating, comment })
        .returning();

      //  Link Review to Order Item
      await tx
        .update(orderItems)
        .set({ rating: newReview.id })
        .where(eq(orderItems.id, orderItemId));

      //  Update Product Stats (Atomic Math)
      await tx
        .update(productItems)
        .set({
          reviewCount: sql`${productItems.reviewCount} + 1`,
          averageRating: sql`(${productItems.averageRating} * ${productItems.reviewCount} + ${rating}) / (${productItems.reviewCount} + 1)`,
        })
        .where(eq(productItems.id, productId));

      return newReview;
    });
  }
};