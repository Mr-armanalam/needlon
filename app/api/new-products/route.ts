"use server";
import { NextRequest, NextResponse } from "next/server";
import { eq, asc, desc, or, ilike, SQL, and, sql } from "drizzle-orm";
import { productItems } from "@/db/schema/product-items";
import { db } from "@/db";
import { productCategory } from "@/db/schema/product-category";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const categoryParam = searchParams.get("category"); 
  const sort = searchParams.get("sort") || "featured";

  const catslug = categoryParam?.toLowerCase() || "";

  try {
    let orderBy = desc(productItems.createdAt);
    if (sort === "priceHigh") orderBy = desc(productItems.price);
    else if (sort === "priceLow") orderBy = asc(productItems.price);

    const results = await db
      .select({
        product: productItems,
        category: productCategory,
      })
      .from(productItems)
      .innerJoin(
        productCategory,
        eq(productItems.categoryId, productCategory.id)
      )
      .where(
        and(
          catslug
            ? ilike(productCategory.CatType, catslug)
            : undefined,
        )
      )
      .orderBy(orderBy);

    if (results.length === 0) {
      return NextResponse.json({
        productData: [],
        productTagDes: {
          // descriptiveContent: "No products found for this category.",
          // contentTag: "cleanSubcat",
          // descriptiveContent: "",
          // contentTag: "",
        },
      });
    }

    const productTagDes = {
      descriptiveContent: results[0].category.descriptiveContent || "",
      contentTag:
        results[0].category.contentTag || results[0].category.SubCatType || "",
    };

    const productData = results.map((r) => ({
      id: r.product.id,
      name: r.product.name,
      price: Number(r.product.price),
      image: r.product.image,
      modalImage: r.product.modalImage,
      sizes: r.product.sizes,
      category: r.category.category,
      catType: r.category.CatType,
    }));

    return NextResponse.json({ productData, productTagDes });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
