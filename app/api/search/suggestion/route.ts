import { NextResponse } from "next/server";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { userViewHistory } from "@/db/schema/user-view-history";
import { productItems } from "@/db/schema/product-items";
import { productCategory } from "@/db/schema/product-category";

export async function GET(req: Request) {
 try {
  //TODO: modify it
   const userId = req.headers.get("x-user-id");
 
   const recent = userId
     ? await db
         .select({
           id: productItems.id,
           name: productItems.name,
           category: productCategory.category,
           subcategory: productCategory.CatType,
         })
         .from(userViewHistory)
         .innerJoin(productItems, eq(userViewHistory.productId, productItems.id))
         .innerJoin(
           productCategory,
           eq(productItems.categoryId, productCategory.id)
         )
         .where(eq(userViewHistory.userId, userId))
         .orderBy(desc(userViewHistory.createdAt))
         .limit(6)
     : [];
 
   const suggested = await db
     .select({
       id: productItems.id,
       name: productItems.name,
       category: productCategory.category,
       subcategory: productCategory.CatType,
     })
     .from(productItems)
     .innerJoin(productCategory, eq(productItems.categoryId, productCategory.id))
     .orderBy(desc(productItems.createdAt))
     .limit(10);
 
   return NextResponse.json({ recent, suggested }, {status: 200});
 } catch (error) {
  console.log(error);
  return NextResponse.json('something went wrong', { status : 500})
 }
}
