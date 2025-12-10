/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/db";
import { productItems } from "@/db/schema/product-items";
import { orderItems } from "@/db/schema/order-items";
import { eq, desc, inArray, sql } from "drizzle-orm";
import { buildUserPreferenceVector } from "@/lib/recommendation-item";
import { auth } from "@/auth";

// ----------------------------------------------------
// 1️⃣ Trending Products
// ----------------------------------------------------
async function getTrendingProducts() {
  const res = await db
    .select({
      product: productItems,
      count: sql<number>`COUNT(${orderItems.productId})`
    })
    .from(orderItems)
    .innerJoin(productItems, eq(orderItems.productId, productItems.id))
    .groupBy(productItems.id)
    .orderBy(desc(sql`COUNT(${orderItems.productId})`))
    .limit(10);

  return res.map((p) => p.product);
}

// ----------------------------------------------------
// 2️⃣ New Arrivals
// ----------------------------------------------------
async function getNewArrivalProducts() {
  return await db
    .select()
    .from(productItems)
    .orderBy(desc(productItems.createdAt))
    .limit(12);
}

// ----------------------------------------------------
// 3️⃣ Top Rated Products
// ----------------------------------------------------
async function getTopRatedProducts() {
  return await db
    .select()
    .from(productItems)
    .orderBy(desc(productItems.averageRating))
    .limit(12);
}

// ----------------------------------------------------
// MAIN API ROUTE
// ----------------------------------------------------
export async function GET() {
  const session = await auth();    
  const userId = session?.user.id;

  let recommended: any[] = [];
  let youMayLike: any[] = [];

  // ----------------------------------------------------------------
  // 🔴 IF USER IS **NOT LOGGED IN**
  // → return generic data
  // ----------------------------------------------------------------
  if (!userId) {
    return NextResponse.json({
      recommended: await getTrendingProducts(),
      youMayLike: await getNewArrivalProducts(),
    });
  }

  // ----------------------------------------------------------------
  // 🔵 IF USER IS LOGGED IN → Personalized logic
  // ----------------------------------------------------------------
  const prefs = await buildUserPreferenceVector(userId);

  // 1️⃣ Recommended (PERSONALIZED)
  if (prefs.topCategories.length > 0) {
    recommended = await db
      .select()
      .from(productItems)
      .where(
        inArray(productItems.categoryId, prefs.topCategories)
      )
      .orderBy(desc(productItems.averageRating))
      .limit(10);
  }

  // fallback
  if (recommended.length === 0) {
    recommended = await getTopRatedProducts();
  }

  // 2️⃣ You May Like (PERSONALIZED CATEGORY-WEIGHTED)
  if (prefs.topCategories.length > 0) {
    youMayLike = await db
      .select()
      .from(productItems)
      .where(
        inArray(productItems.categoryId, prefs.topCategories)
      )
      .orderBy(desc(productItems.averageRating))
      .limit(12);
  }

  // fallback
  if (youMayLike.length === 0) {
    youMayLike = await getNewArrivalProducts();
  }

  // Done ✔
  return NextResponse.json({
    recommended,
    youMayLike,
  });
}
