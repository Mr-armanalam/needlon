import { db } from "@/db";
import { productItems } from "@/db/schema/product-items";
import { productCategory } from "@/db/schema/product-category";
import { eq, and, desc, asc, ilike } from "drizzle-orm";
import { buildSubcategoryFilter } from "../lib/search-utils";

export const ProductService = {
  async getFilteredProducts(categoryType?: string, subcatSlug?: string, sort?: string) {
    let orderBy = desc(productItems.createdAt);
    if (sort === "priceHigh") orderBy = desc(productItems.price);
    if (sort === "priceLow") orderBy = asc(productItems.price);

    return await db
      .select({
        product: productItems,
        category: productCategory,
      })
      .from(productItems)
      .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
      .where(
        and(
          categoryType ? ilike(productCategory.CatType, categoryType) : undefined,
          subcatSlug ? buildSubcategoryFilter(subcatSlug) : undefined
        )
      )
      .orderBy(orderBy);
  }
};