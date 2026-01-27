import { db } from "@/db";
import { filterGroups } from "@/db/schema/filter-group";
import { filterOptions } from "@/db/schema/filter-options";
import { productCategory } from "@/db/schema/product-category";
import { productFilterOptions } from "@/db/schema/product-filter-options";
import { productItems } from "@/db/schema/product-items";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ productId: string }> },
) => {
  try {
    const { productId } = await params;

    if (!productId)
      return NextResponse.json({ productItem: null }, { status: 404 });

    const [product] = await db
      .select()
      .from(productItems)
      .where(eq(productItems.id, productId))
      .leftJoin(
        productCategory,
        eq(productCategory.id, productItems.categoryId),
      );

    const filter = await db
      .select()
      .from(productFilterOptions)
      .where(eq(productFilterOptions.productId, product.product_items.id))
      .innerJoin(
        filterOptions,
        eq(filterOptions.id, productFilterOptions.filterOptionId),
      )
      .innerJoin(
        filterGroups,
        eq(filterGroups.id, filterOptions.filterGroupId),
      );

    const productFilterData = filter.map((data) => ({
      [data.filter_groups.name]: data.filter_options.value,
    }));

    console.log(productFilterData);

    if (!product)
      return NextResponse.json({ productItem: null }, { status: 500 });

    return NextResponse.json({ productItem: product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
