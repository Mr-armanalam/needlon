/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { NextRequest, NextResponse } from "next/server";
import { eq, desc, or, ilike, sql, aliasedTable, inArray } from "drizzle-orm";
import { productItems } from "@/db/schema/product-items";
import { db } from "@/db";
import { productCategory } from "@/db/schema/product-category";
import { productFilterOptions } from "@/db/schema/product-filter-options";
import { filterOptions } from "@/db/schema/filter-options";
import { orderItems } from "@/db/schema/order-items";
import { buildUserPreferenceVector } from "@/lib/recommendation-item";
import { auth } from "@/auth";
import { getSeasonProduct } from "@/modules/shared/product-items/server/get-season-product";

const categoryMap: Record<string, string> = {
  "items-for-men": "men",
  "items-for-women": "women",
  "kids-wear": "kids",
  // add more as business grows
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const session = await auth();
    const userId = session?.user.id;

    //  EXTRACT DYNAMIC PARAMS
    const filterType = searchParams.get("filterType"); // e.g., 'item-for-men', 'priumproduct'
    const sort = searchParams.get("sort") || "featured";

    const dynamicFilters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (!["filterType", "sort"].includes(key)) dynamicFilters[key] = value;
    });

    let results: any[] = [];
    let productTagDes = { descriptiveContent: "", contentTag: "" };

    // ------------------------------------------------------------------
    //  DETERMINING THE DATA SOURCE
    // ------------------------------------------------------------------

    if (filterType === "recom-product" || filterType === "you-may-like") {
      // PERSONALIZATION LOGIC
      results = await handlePersonalizedFetch(userId, filterType);
    } else if (filterType === "premium-product") {
      // PREMIUM LOGIC
      results = await db
        .select({ product: productItems, category: productCategory })
        .from(productItems)
        .innerJoin(
          productCategory,
          eq(productItems.categoryId, productCategory.id),
        )
        .where(eq(productItems.isPremium, true));
    } else if (filterType === "season-product") {
      // SEASON LOGIC
      const seasonProductData = await getSeasonProduct({
        seasonType: "winter",
      });
      results =
        seasonProductData?.map((item) => ({ product: item.seasonProduct })) ??
        [];
    } else {
      // CATEGORY / SUBCATEGORY
      const dbValue = categoryMap[filterType || ""] || filterType || "";
      const baseQuery = db
        .select({ product: productItems, category: productCategory })
        .from(productItems)
        .innerJoin(
          productCategory,
          eq(productItems.categoryId, productCategory.id),
        )
        .where(
          or(
            ilike(productCategory.CatType, dbValue || ""),
            ilike(productCategory.SubCatType, dbValue || ""),
          ),
        );

      // Handle additional Season/Attribute filters via productFilterOptions
      if (Object.keys(dynamicFilters).length > 0) {
        // This is a complex join for dynamic attributes
        results = await applyAttributeFilters(baseQuery, dynamicFilters);
      } else {
        results = await baseQuery;
      }
    }
    // Capture SEO/Heading data from the first matched category
    if (results.length > 0) {
      productTagDes = {
        descriptiveContent:
          results[0]?.category?.descriptiveContent ||
          "Discover the shirt that redefines the male wardrobe. Using superior cottons and precise construction, our shirts offer a fit that is both contemporary and comfortable, carrying the wearer from morning commitment to evening engagement with flawless style.",
        contentTag:
          results[0]?.category?.contentTag || results[0]?.product?.tagName,
      };
    }

    // DATA TRANSFORMATION (Standardized Output)
    const productData = results.map((r) => ({
      id: r.product.id,
      name: r.product.name,
      price: Number(r.product.price),
      mrp_price: Number(r.product.mrp_price),
      image: r.product.image,
      modalImage: r.product.modalImage,
      sizes: r.product.sizes,
      category: r.category?.category || "Uncategorized",
      catType: r.category?.CatType || "",
      isPremium: r.product.isPremium,
      rating: r.product.averageRating,
    }));

    return NextResponse.json({ productData, productTagDes }, { status: 200 });
  } catch (error) {
    console.error("API_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// ------------------------------------------------------------------
// HELPER FUNCTIONS (Scalable Infrastructure)
// ------------------------------------------------------------------

async function handlePersonalizedFetch(
  userId: string | undefined,
  type: string,
) {
  if (!userId) {
    // Fallback for Guest Users: Trending or New Arrivals
    return type === "recommendate-product"
      ? await getTrendingWithCategory()
      : await getNewArrivalsWithCategory();
  }

  const prefs = await buildUserPreferenceVector(userId);
  if (prefs.topCategories.length === 0) return await getTrendingWithCategory();

  return await db
    .select({ product: productItems, category: productCategory })
    .from(productItems)
    .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
    .where(inArray(productItems.categoryId, prefs.topCategories))
    .orderBy(desc(productItems.averageRating))
    .limit(12);
}

async function getTrendingWithCategory() {
  return await db
    .select({ product: productItems, category: productCategory })
    .from(productItems)
    .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
    .innerJoin(orderItems, eq(orderItems.productId, productItems.id))
    .groupBy(productItems.id, productCategory.id)
    .orderBy(desc(sql`count(*)`))
    .limit(10);
}

async function getNewArrivalsWithCategory() {
  return await db
    .select({ product: productItems, category: productCategory })
    .from(productItems)
    .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
    .orderBy(desc(productItems.createdAt))
    .limit(12);
}

async function applyAttributeFilters(
  baseQuery: any,
  filters: Record<string, string>,
) {
  // Logic to join productFilterOptions dynamically
  // This allows filtering by 'season', 'material', etc., stored in the options table
  let query = baseQuery;
  for (const [key, value] of Object.entries(filters)) {
    const optionAlias = aliasedTable(productFilterOptions, `filter_${key}`);
    const metaAlias = aliasedTable(filterOptions, `meta_${key}`);

    query = query
      .innerJoin(optionAlias, eq(productItems.id, optionAlias.productId))
      .innerJoin(metaAlias, eq(optionAlias.filterOptionId, metaAlias.id))
      .where(eq(metaAlias.slug, value));
  }
  return await query;
}
