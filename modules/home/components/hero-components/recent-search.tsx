"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

const recentSearches = [
  { label: "recent" },
  { label: "Wedding Sherwani" },
  { label: "Custom Blazer" },
  { label: "Silk Saree" },
  { label: "Formal Shirt Stitching" },
  { label: "Lehenga Choli" },
  { label: "Designer Kurta" },
  { label: "Party Gown" },
  { label: "Tailored Waistcoat" },
  { label: "Casual Linen Shirt" },
  { label: "Office Pants" },
];

export default function RecentSearch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 0);
    setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = containerRef.current;
    if (el) el.addEventListener("scroll", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div className="relative top-1">
      {/* Left gradient */}
      {showLeftFade && (
        <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      )}

      {/* Scrollable tags */}
      <div
        ref={containerRef}
        className="flex gap-x-4 overflow-x-auto no-scrollbar"
      >
        {recentSearches.slice(0, 5).map((item, i) => (
          <Button
            key={i}
            className={cn(
              "text-xs cursor-pointer hover:bg-zinc-300",
              i === 0 &&
                "bg-gray-900 text-white hover:bg-black disabled:bg-black"
            )}
            variant={"secondary"}
            size={"sm"}
          >
            {item.label.toLowerCase()}
          </Button>
        ))}

        <Button
          className={cn("text-xs cursor-pointer hover:bg-zinc-300")}
          variant={"secondary"}
          size={"sm"}
        >
          {"see all"}
        </Button>
      </div>

      {/* Right gradient */}
      {showRightFade && (
        <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      )}
    </div>
  );
}
