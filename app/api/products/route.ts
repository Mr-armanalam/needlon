/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { NextResponse } from "next/server";
import { eq, asc, desc, or } from "drizzle-orm";
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
  // sizes: string[] | null;
  // material: string | null;
  image: string | null;
  modalImage: string[] | null;
  quantity: number;
  averageRating: string;
  reviewCount: number;
  isPremium: boolean;
  seasonType: string;
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const sort = searchParams.get("sort") || "featured";
  // const material = searchParams.get("material");

  let conditions: any[] = [];

  if (category) conditions.push(eq(productCategory.CatType, category));
  if (subcategory) conditions.push(eq(productCategory.category, subcategory));
  // if (material) conditions.push(eq(productItems?.material, material));

  let orderBy;
  if (sort === "priceHigh") orderBy = desc(productItems.price);
  else if (sort === "priceLow") orderBy = asc(productItems.price);
  else orderBy = desc(productItems.createdAt);

  const products = await db
    .select()
    .from(productItems)
    .leftJoin(productCategory, eq(productItems.categoryId, productCategory.id))
    .where(conditions.length ? or(...conditions) : undefined)
    .orderBy(orderBy);

  const productData = products.map((item) => {
    const product = item.product_items;
    const category = item.product_category;

    let mergedItem: ClientProductItemWithCategory = {
      ...product,

      // Default category fields to null in case of a failed join (though unlikely due to NOT NULL FK)
      category: null,
      CatType: null,
      SubCatType: null,
      mrp_price: null,
      seasonType: ""
    };

    if (category) {
      const { category: catName, CatType, SubCatType } = category;

      mergedItem = {
        ...mergedItem,
        category: catName,
        CatType: CatType,
        SubCatType: SubCatType,
      };
    }

    return mergedItem;
  });

  return NextResponse.json({
    productData,
    productTagDes: {
      contentTag: products[0].product_category?.contentTag,
      descriptiveContent: products[0].product_category?.descriptiveContent,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const [category] = await db
      .insert(productCategory)
      .values({
        category: body.category,
        CatType: body.CatType,
        SubCatType: body.SubCatType,
      })
      .returning();

    if (!category)
      return NextResponse.json(
        { error: "Error in to insert category" },
        { status: 400 }
      );

    await db.insert(productItems).values({
      name: body.name,
      price: body.price,
      // sizes: body.sizes,
      quantity: body.quantity,
      image: body.image,
      modalImage: body.modalImage,
      // material: body?.material,
      categoryId: category.id,
      averageRating: "0",
      reviewCount: 0,
      isPremium: body.isPremium ?? "false",
      // seasonType: body.seasonType ?? "casual",
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
