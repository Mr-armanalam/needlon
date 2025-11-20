/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- DEMO COUPON DATA ---
export const coupons = [
  {
    id: "1",
    code: "SAVE20",
    discount: "20% OFF",
    description: "Get flat 20% off on all textile products.",
    validFrom: "2025-11-01T00:00:00Z",
    validTo: "2025-11-30T23:59:59Z",
    status: "active", // active | upcoming | expired
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "2",
    code: "FESTIVE50",
    discount: "₹50 OFF",
    description: "₹50 off on orders above ₹499.",
    validFrom: "2025-11-20T00:00:00Z",
    validTo: "2025-12-10T23:59:59Z",
    status: "upcoming",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "3",
    code: "LUCKY100",
    discount: "₹100 OFF",
    description: "Premium Reward Coupon.",
    validFrom: "2025-10-01T00:00:00Z",
    validTo: "2025-10-10T23:59:59Z",
    status: "expired",
    metallic: true,
  },
];

// --- Helper ---
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function RewardsView() {
  return (
    <div>
      <h1 className="font-garamond text-3xl font-semibold text-gray-900">
        Your rewards & coupons
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}

// --- MAIN COUPON CARD WITH GRADIENT + METALLIC STYLE ---
function CouponCard({ coupon }: any) {
  const isMetallic = coupon.metallic;

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-2xl shadow-xl border bg-white/5 backdrop-blur-sm transition transform hover:scale-[1.02] hover:shadow-2xl",
        !isMetallic && `bg-gradient-to-br ${coupon.gradient}`,
        isMetallic &&
          "bg-gradient-to-br from-zinc-900 to-zinc-700 border-zinc-600"
      )}
    >
      {/* Metallic Shine Overlay */}
      {isMetallic && (
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_60%)]" />
      )}

      <CardContent className="relative p-6 text-white">
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-extrabold tracking-wide drop-shadow-lg">
            {coupon.discount}
          </div>

          <div className="text-base opacity-90">{coupon.description}</div>

          {/* Coupon Code Box */}
          <div
            className={cn(
              "mt-3 w-fit px-4 py-2 rounded-xl border backdrop-blur text-sm font-semibold tracking-wider",
              isMetallic
                ? "border-zinc-400 bg-white/10"
                : "bg-white/20 border-white/40"
            )}
          >
            {coupon.code}
          </div>

          {/* Validity */}
          <div className="text-xs mt-2 opacity-90">
            Valid: {formatDate(coupon.validFrom)} – {formatDate(coupon.validTo)}
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

          {/* Apply Button */}
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
