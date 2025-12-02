// import RewardsView from '@/modules/rewards/view/rewards-view'
import RewardsView from "@/modules/rewards/view/rewards-view";
import { cookies } from "next/headers";
import React from "react";

export type Rewards = {
  id: string;
  title: string;
  coupon_code: string;
  discount: string;
  discription: string;
  validFrom: Date; // ISO Date
  validTo: Date;
  metallic?: string; // ISO Date
  status: "active" | "upcoming" | "expired";
  gradient?: string;
};

const page = async () => {
  const cookie = await cookies();
  const cookieStore = cookie.toString();

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/rewards`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore,
    },
  });

  if (!response.ok) return alert("something went wrong !");
  const result = await response.json();
  const allRewards: Rewards[] = response.status !== 200 ? [] : result?.rewards;

  return (
    <div className="px-8 ">
      <RewardsView allRewards={allRewards} />
    </div>
  );
};

export default page;
