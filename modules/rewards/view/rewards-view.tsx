"use client";

import React, { useEffect, useState } from "react";
import { CouponCard } from "../components/coupon-card";

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


export default function RewardsView() {
  const [allRewards, setAllRewards] = useState<Rewards[]>([]);

  const fetch_all_rewards = async () => {
    const response = await fetch("/api/rewards");
    const result = await response.json();    
    if (!response.ok) return alert("something went wrong !");
    setAllRewards(result.rewards);
  };

  useEffect(() => {
    fetch_all_rewards();
  }, []);
  

  return (
    <section>
      <h1 className="font-garamond text-2xl font-semibold text-gray-900">
        Your rewards & coupons
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-7">
        {allRewards.length !== 0 &&
          allRewards.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
      </div>
      <p className="font-garamond mx-auto text-center w-full mt-[100px] text-gray-500 font-semibold text-xl">
        End Here
      </p>
    </section>
  );
}

