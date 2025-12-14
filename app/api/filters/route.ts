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
    // const categoryId = searchParams.get("categoryId");
    const category = searchParams.get("category");
    console.log(category,'category');
    

    // 1️⃣ Validate
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
    // 2️⃣ Fetch filter groups for category
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

    // 3️⃣ Fetch filter options for those groups
    const groupIds = groups.map((g) => g.id);

    // const options = await db
    //   .select()
    //   .from(filterOptions)
    //   .where(eq(filterOptions.filterGroupId, groupIds[0]) // temp
    //     // replaced below
    //   );

    // 👇 Correct IN query
    const allOptions = await db
      .select()
      .from(filterOptions)
      .where(inArray(filterOptions.filterGroupId, groupIds))
      .orderBy(asc(filterOptions.sortOrder));

    // 4️⃣ Map options under groups
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

    // 5️⃣ Build response
    const filters = groups.map((group) => ({
      id: group.id,
      name: group.name,
      slug: group.slug,
      options: optionsByGroup[group.id] ?? [],
    }));

    return NextResponse.json({
      filters,
    });
  } catch (error) {
    console.error("FILTER API ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
