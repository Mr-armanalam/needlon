import { auth } from "@/auth";
import { db } from "@/db";
import { updateSchema } from "@/db/schema/updates";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notification = await db
      .select()
      .from(updateSchema)
      .where(eq(updateSchema.userId, userId));
    return NextResponse.json({ notification }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { notification_id } = await req.json();

    const notification = await db
      .update(updateSchema)
      .set({ read: true })
      .where(
        and(
          eq(updateSchema.userId, userId),
          eq(updateSchema.id, notification_id)
        )
      )
      .returning();

    return NextResponse.json({ notification }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};
