import { NextResponse } from "next/server";
import { db } from "@/db";
import { ilike, desc, eq, or } from "drizzle-orm";
import { productItems } from "@/db/schema/product-items";
import { productCategory } from "@/db/schema/product-category";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ searchResult: [] }, { status: 400 });
  }

  const products = await db
    .select({
      id: productItems.id,
      name: productItems.name,
      category: productCategory.category,
      subcategory: productCategory.CatType,
    })
    .from(productItems)
    .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
    .where(
      or(
        ilike(productItems.name, `%${query}%`),
        ilike(productCategory.category, `%${query}%`),
        ilike(productCategory.CatType, `%${query}%`)
      )
    )
    .limit(12);

  const grouped: Record<string, any[]> = {};

  for (const p of products) {
    const key = p.category;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  }

  return NextResponse.json({ searchResult: {...grouped} });
}
