import { db } from "@/db";
import { filterOptions } from "@/db/schema/filter-options";
import { productFilterOptions } from "@/db/schema/product-filter-options";
import { productItems } from "@/db/schema/product-items";
import { eq } from "drizzle-orm";

export const getSeasonProduct = async ({
  seasonType = "casual",
}: {
  seasonType?: string;
}) => {
  try {
    const [filterOptionData] = await db
      .select({ id: filterOptions.id })
      .from(filterOptions)
      .where(eq(filterOptions.slug, seasonType));
      console.log(filterOptionData, 'fod');
      

    const data = await db
      .select({
        seasonProduct: productItems,
      })
      .from(productFilterOptions)
      .innerJoin(
        productItems,
        eq(productItems.id, productFilterOptions.productId)
      )
      .where(eq(productFilterOptions.filterOptionId, filterOptionData.id));
      console.log('data', data);
      
    if (!data) return [];

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
