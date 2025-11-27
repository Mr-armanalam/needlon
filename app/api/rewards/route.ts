import { db } from "@/db";
import { coupons } from "@/db/schema/coupons";
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

    const data = await db
      .select({
        reward: rewardSchema,
        coupon_code: coupons.code,
      })
      .from(rewardSchema)
      .leftJoin(coupons, eq(rewardSchema.coupon_id, coupons.id));

    const rewards = data.map((row) => ({
      coupon_code: row.coupon_code,
      ...row.reward,
    }));

    return NextResponse.json({ rewards }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};
