/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { subcatSearchItem } from "@/db/schema/sub-cat-search";

export const GET = async () => {
  try {
    const data = await db.select().from(subcatSearchItem);
    if (!data)
      return Response.json({ error: "server side error" }, { status: 501 });
    return Response.json({ success: true, items: data }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
