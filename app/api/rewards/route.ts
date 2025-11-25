import { db } from "@/db";
import { rewardSchema } from "@/db/schema/rewards";
import { authOptions } from "@/lib/auth-option/auth-data";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rewards = await db
      .select()
      .from(rewardSchema)
      .where(eq(rewardSchema.userId, userId));
    return NextResponse.json({ rewards }, { status: 200 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};
