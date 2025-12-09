/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import ProductCardPreview from "../components/card/item-card";
import { ClientProductItem } from "@/types/product";


const HomePremRecomLike = ({heading, items}:{heading: string, items:ClientProductItem[]}) => {
  return (
    <div className="bg-white">
      <h1 className="pt-8 pl-8 text-3xl font-semibold font-garamond text-gray-950">
        {heading}
      </h1>
      <div className="flex overflow-auto px-6 gap-x-4 py-8 rounded-sm no-scrollbar relative">
        {/* {Array.from({ length: 5 }).map((_, i) => (
          <ProductCardPreview
            key={i}
            image="/images/image1.png"
            title="serwani"
            offer="from ₹500"
          />
        ))} */}
        {items?.length > 0 && items.map((i, k) => (
          <ProductCardPreview
            key={k}
            item={i}
          />
        ))}
        <Button
          type="button"
          className="my-auto -right-6 sticky text-2xl px-2.5 rounded-r-none cursor-pointer h-[120px]"
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default HomePremRecomLike;
