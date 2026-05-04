import { db } from "@/db";
import { productItems } from "@/db/schema/product-items";
import { productCategory } from "@/db/schema/product-category";
import { orderItems } from "@/db/schema/order-items";
import { eq, desc, inArray, ilike, or, sql, aliasedTable } from "drizzle-orm";
import { productFilterOptions } from "@/db/schema/product-filter-options";
import { filterOptions } from "@/db/schema/filter-options";

export const ProductService = {
  // Standard Row Selection to keep DRY (Don't Repeat Yourself)
  baseSelect: {
    product: productItems,
    category: productCategory,
  },

  async getPremium() {
    return db.select(this.baseSelect)
      .from(productItems)
      .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
      .where(eq(productItems.isPremium, true));
  },

  async getTrending() {
    return db.select(this.baseSelect)
      .from(productItems)
      .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
      .innerJoin(orderItems, eq(orderItems.productId, productItems.id))
      .groupBy(productItems.id, productCategory.id)
      .orderBy(desc(sql`count(*)`))
      .limit(10);
  },

  async getNewArrivals(limit = 12) {
    return db.select(this.baseSelect)
      .from(productItems)
      .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
      .orderBy(desc(productItems.createdAt))
      .limit(limit);
  },

  async getByCategory(dbValue: string, dynamicFilters: Record<string, string>) {
    let query = db.select(this.baseSelect)
      .from(productItems)
      .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
      .where(
        or(
          ilike(productCategory.CatType, dbValue),
          ilike(productCategory.SubCatType, dbValue)
        )
      ).$dynamic(); // Allows dynamic joins

    // Apply dynamic attribute filters (Season, Material, etc.)
    for (const [key, value] of Object.entries(dynamicFilters)) {
      const optionAlias = aliasedTable(productFilterOptions, `filter_${key}`);
      const metaAlias = aliasedTable(filterOptions, `meta_${key}`);
      query = query
        .innerJoin(optionAlias, eq(productItems.id, optionAlias.productId))
        .innerJoin(metaAlias, eq(optionAlias.filterOptionId, metaAlias.id))
        .where(eq(metaAlias.slug, value));
    }
    return await query;
  }
};