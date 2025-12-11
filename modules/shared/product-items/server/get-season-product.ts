import { db } from "@/db"
import { productItems } from "@/db/schema/product-items"
import { eq } from "drizzle-orm"

export const getSeasonProduct = async ({seasonType='casual'}: {seasonType?: string}) => {
  try {
    const data = await db.select().from(productItems).where(eq(productItems.seasonType, seasonType));
    if (!data) return [];
    return data
  } catch (error) {
    console.log(error);
    return []
  }
}