/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { db } from "@/db";
import { filterOptions } from "@/db/schema/filter-options";
import { eq, asc, inArray } from "drizzle-orm";
import { filterGroups } from "@/db/schema/filter-group";
import { productCategory } from "@/db/schema/product-category";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");    

    if (!category) {
      return NextResponse.json(
        { message: "category is required" },
        { status: 400 }
      );
    }

    const [{ categoryId }] = await db
      .select({ categoryId: productCategory.id })
      .from(productCategory)
      .where(eq(productCategory.category, category.toLowerCase()));

      if (!categoryId) {
      return NextResponse.json(
        { message: "categoryId is required" },
        { status: 400 }
      );
    }
    // Fetch filter groups for category
    const groups = await db
      .select()
      .from(filterGroups)
      .where(eq(filterGroups.categoryId, categoryId))
      .orderBy(asc(filterGroups.sortOrder));

    if (!groups.length) {
      return NextResponse.json({
        filters: [],
      });
    }

    // Fetch filter options for those groups
    const groupIds = groups.map((g) => g.id);
    const allOptions = await db
      .select()
      .from(filterOptions)
      .where(inArray(filterOptions.filterGroupId, groupIds))
      .orderBy(asc(filterOptions.sortOrder));

    // Map options under groups
    const optionsByGroup = allOptions.reduce<Record<string, any[]>>(
      (acc, opt) => {
        acc[opt.filterGroupId] ??= [];
        acc[opt.filterGroupId].push({
          id: opt.id,
          label: opt.value,
          slug: opt.slug,
        });
        return acc;
      },
      {}
    );

    // Build response
    const filters = groups.map((group) => ({
      id: group.id,
      name: group.name,
      slug: group.slug,
      options: optionsByGroup[group.id] ?? [],
    }));

    return NextResponse.json({
      filters,
    }, {status: 200});
  } catch (error) {
    console.error("FILTER API ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
