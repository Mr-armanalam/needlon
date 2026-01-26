import { db } from "@/db";
import { productCategory } from "@/db/schema/product-category";
import { productItems } from "@/db/schema/product-items";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) => {
  try {
    const { productId } = await params;

    if (!productId) return NextResponse.json({ productItem: null }, { status: 404 });

    const [product] = await db
      .select()
      .from(productItems)
      .where(eq(productItems.id, productId))
      .leftJoin(
        productCategory,
        eq(productCategory.id, productItems.categoryId),
      );

    if (!product) return NextResponse.json({ productItem: null }, { status: 500 });

    return NextResponse.json({ productItem: product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
