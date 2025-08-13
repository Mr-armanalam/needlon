import React from "react";
import ProductCard from "../components/premium-item-components/premium-item";
import { Button } from "@/components/ui/button";

const HomePremRecomLike = ({heading}:{heading: string}) => {
  return (
    // <div className="px-8 rounded-sm my-2 pt-10 pb-20 bg-gray-100 ">
    <div className="bg-white">
      <h1 className="pt-8 pl-8 text-3xl font-semibold font-garamond text-gray-950">
        {heading}
      </h1>
      <div className="flex py-8 rounded-sm justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <ProductCard
            key={i}
            image="/images/image1.png"
            title="serwani"
            offer="from ₹500"
          />
        ))}
        <Button
          type="button"
          className="my-auto text-2xl px-2.5 rounded-r-none cursor-pointer h-[120px]"
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default HomePremRecomLike;
