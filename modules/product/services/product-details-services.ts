import { db } from "@/db";
import { productItems } from "@/db/schema/product-items";
import { productCategory } from "@/db/schema/product-category";
import { productFilterOptions } from "@/db/schema/product-filter-options";
import { filterOptions } from "@/db/schema/filter-options";
import { filterGroups } from "@/db/schema/filter-group";
import { eq } from "drizzle-orm";

export const ProductDetailService = {
  async getProductBase(productId: string) {
    const [result] = await db
      .select()
      .from(productItems)
      .where(eq(productItems.id, productId))
      .leftJoin(productCategory, eq(productCategory.id, productItems.categoryId));
    return result;
  },

  async getProductFilters(productId: string) {
    return await db
      .select({
        groupName: filterGroups.name,
        optionValue: filterOptions.value,
      })
      .from(productFilterOptions)
      .where(eq(productFilterOptions.productId, productId))
      .innerJoin(filterOptions, eq(filterOptions.id, productFilterOptions.filterOptionId))
      .innerJoin(filterGroups, eq(filterGroups.id, filterOptions.filterGroupId));
  }
};