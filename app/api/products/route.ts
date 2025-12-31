/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { NextRequest, NextResponse } from "next/server";
import { eq, asc, desc, or, ilike, SQL, and, sql } from "drizzle-orm";
import { productItems } from "@/db/schema/product-items";
import { db } from "@/db";
import { createClient } from "@supabase/supabase-js";
import { productCategory } from "@/db/schema/product-category";

interface ProductItemResult {
  id: string;
  categoryId: string;
  name: string;
  tagName: string;
  mrp_price: string | null;
  price: string;
  image: string | null;
  modalImage: string[] | null;
  quantity: number;
  averageRating: string;
  reviewCount: number;
  isPremium: boolean;
  // seasonType: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface ClientProductItemWithCategory extends ProductItemResult {
  category: string | null;
  CatType: string | null;
  SubCatType: string | null;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const categoryParam = searchParams.get("category"); // e.g., "items-for-men"
  const subcategoryParam = searchParams.get("subcategory"); // e.g., "formal-shirt-stitching"
  const sort = searchParams.get("sort") || "featured";

  const subcatSlug = subcategoryParam?.toLowerCase() || "";
  const cleanCatType = categoryParam?.split("-").pop()?.toLowerCase();

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
          cleanCatType
            ? ilike(productCategory.CatType, cleanCatType)
            : undefined,

          subcatSlug
            ? or(
                sql`lower(${subcatSlug}) LIKE '%' || lower(${productCategory.SubCatType}) || '%'`,
                sql`lower(${subcatSlug}) LIKE '%' || lower(${productCategory.category}) || '%'`,
                ...(subcatSlug
                  .split("-")
                  .map((word) =>
                    word.length > 3
                      ? or(
                          ilike(productCategory.SubCatType, `%${word}%`),
                          ilike(productCategory.category, `%${word}%`)
                        )
                      : undefined
                  )
                  .filter(Boolean) as any)
              )
            : undefined
        )
      )
      .orderBy(orderBy);

    if (results.length === 0) {
      return NextResponse.json({
        productData: [],
        productTagDes: {
          descriptiveContent: "No products found for this category.",
          contentTag: "cleanSubcat",
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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const [category] = await db
      .select()
      .from(productCategory)
      .where(
        and(
          ilike(productCategory.category, `%${body.category}%`),
          ilike(productCategory.CatType, `%${body.CatType}%`),
          ilike(productCategory.SubCatType, `%${body.SubCatType}%`)
        )
      );

    if (!category)
      return NextResponse.json(
        { error: "Error in to insert category" },
        { status: 400 }
      );

    await db.insert(productItems).values({
      name: body.name,
      price: body.price,
      quantity: body.quantity,
      image: body.image,
      modalImage: body.modalImage,
      categoryId: category.id,
      averageRating: "0",
      reviewCount: 0,
      isPremium: body.isPremium ?? "false",
      tagName: body.tagName ?? "Hi this is default tag",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { data: product } = await supabase
    .from("product_items")
    .select("image, modal_image")
    .eq("id", id)
    .single();

  if (!product) return new Response("Not found", { status: 404 });
  const files = [product.image, ...(product.modal_image || [])].map((url) => {
    const key = url.split("/product-images/")[1];
    return key || url;
  });

  const { error: storageError } = await supabase.storage
    .from("product-images")
    .remove(files);

  if (storageError) {
    console.error("Storage delete failed:", storageError);
    throw new Response("Error deleting images", { status: 500 });
  }

  await supabase.from("product_items").delete().eq("id", id);

  return new Response("Deleted successfully");
}
