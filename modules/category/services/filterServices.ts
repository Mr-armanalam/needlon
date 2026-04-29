import { db } from "@/db";
import { filterOptions } from "@/db/schema/filter-options";
import { filterGroups } from "@/db/schema/filter-group";
import { productCategory } from "@/db/schema/product-category";
import { eq, asc, inArray, sql } from "drizzle-orm";

/**  Finds category ID based on name using case-insensitive partial match 
 */
export async function getCategoryIdByName(categoryName: string) {
  const [result] = await db
    .select({ id: productCategory.id })
    .from(productCategory)
    .where(sql`${categoryName.toLowerCase()} ILIKE '%' || ${productCategory.category} || '%'`);
  return result?.id ?? null;
}

/**  Fetches all groups and their options for a specific category 
 */
export async function getCategoryFilters(categoryId: string) {
  const groups = await db
    .select()
    .from(filterGroups)
    .where(eq(filterGroups.categoryId, categoryId))
    .orderBy(asc(filterGroups.sortOrder));

  if (groups.length === 0) return [];

  const groupIds = groups.map((g) => g.id);
  const allOptions = await db
    .select()
    .from(filterOptions)
    .where(inArray(filterOptions.filterGroupId, groupIds))
    .orderBy(asc(filterOptions.sortOrder));

  // Organize options into a Map for O(1) lookup
  const optionsMap = new Map<string, any[]>();
  allOptions.forEach((opt) => {
    const list = optionsMap.get(opt.filterGroupId) || [];
    list.push({ id: opt.id, label: opt.value, slug: opt.slug });
    optionsMap.set(opt.filterGroupId, list);
  });

  return groups.map((group) => ({
    id: group.id,
    name: group.name,
    slug: group.slug,
    options: optionsMap.get(group.id) || [],
  }));
}