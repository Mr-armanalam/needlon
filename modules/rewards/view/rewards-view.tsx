/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Rewards = {
  id: string;
  coupon_code: string;
  discount: string;
  discription: string;
  validFrom: Date; // ISO Date
  validTo: Date;
  metallic?: string;   // ISO Date
  status: "active" | "upcoming" | "expired";
  gradient?: string; 
};


const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
    },[])
        
  
  return (
    <section>
      <h1 className="font-garamond text-2xl font-semibold text-gray-900">
        Your rewards & coupons
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-7">
        {allRewards.length !== 0 && allRewards.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
      <p className="font-garamond mx-auto text-center w-full mt-[100px] text-gray-500 font-semibold text-xl">End Here</p>
    </section>
  );
}

function CouponCard({ coupon }: {coupon:Rewards}) {
  const isMetallic = coupon?.metallic;  

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl shadow-xl border bg-white/5 backdrop-blur-sm transition transform hover:scale-[1.02] hover:shadow-2xl",
        !isMetallic && `bg-gradient-to-br ${coupon.gradient}`,
        isMetallic &&
          "bg-gradient-to-br from-zinc-900 to-zinc-700 border-zinc-600"
      )}
    >
      {isMetallic && (
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_60%)]" />
      )}

      <CardContent className="relative p-6 text-white">
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
            {coupon.discount}
          </div>

          <div className="text-base opacity-90">{coupon.discription}</div>

          <div
            className={cn(
              "mt-3 w-fit px-4 py-2 rounded-xl border backdrop-blur text-sm font-semibold tracking-wider",
              isMetallic
                ? "border-zinc-400 bg-white/10"
                : "bg-white/20 border-white/40"
            )}
          >
            {coupon.coupon_code}
          </div>

          {/* Validity */}
          <div className="text-xs mt-2 opacity-90">
            Valid: {formatDate(String(coupon.validFrom))} – {formatDate(String(coupon.validTo))}
          </div>

          {/* Status Tag */}
          <div className="mt-3 text-xs font-bold uppercase tracking-wide">
            {coupon.status === "active" && (
              <span className="px-3 py-1 bg-green-500/30 border border-green-400/40 rounded-full text-green-200">
                ACTIVE
              </span>
            )}

            {coupon.status === "upcoming" && (
              <span className="px-3 py-1 bg-yellow-500/30 border border-yellow-400/40 rounded-full text-yellow-200">
                UPCOMING
              </span>
            )}

            {coupon.status === "expired" && (
              <span className="px-3 py-1 bg-red-500/30 border border-red-400/40 rounded-full text-red-200">
                EXPIRED
              </span>
            )}
          </div>

          <Button
            disabled={coupon.status !== "active"}
            className={cn(
              "mt-4 w-full font-bold rounded-xl py-3 text-base",
              coupon.status === "active"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-white/30 text-white/60 cursor-not-allowed"
            )}
          >
            Apply Coupon
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
