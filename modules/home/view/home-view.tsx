import React from "react";
import HeroSection from "../section/hero-section";
import ProductCard from "../components/premium-item-components/premium-item";
import { Button } from "@/components/ui/button";

const HomeView = () => {
  return (
    <div>
      <HeroSection />
      <div className="px-8 rounded-sm mt-16 pt-10 pb-20 bg-gray-100 ">
        <h1 className="pb-10 text-3xl font-semibold font-garamond text-gray-950">Premium Item</h1>
        <div className="flex py-8 rounded-sm justify-between bg-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCard
              key={i}
              image="/images/image1.png"
              title="serwani"
              offer="from ₹500"
            />
          ))}
          <Button type="button" className="my-auto text-2xl px-2.5 rounded-r-none cursor-pointer h-[120px]">
            &gt;
          </Button>
        </div>
      </div>
      <div className="px-8 rounded-sm my-2 pt-10 pb-20 bg-gray-100 ">
        <h1 className="pb-10 text-3xl font-semibold font-garamond text-gray-950">You may like</h1>
        <div className="flex py-8 rounded-sm justify-between bg-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCard
              key={i}
              image="/images/image1.png"
              title="serwani"
              offer="from ₹500"
            />
          ))}
          <Button type="button" className="my-auto text-2xl px-2.5 rounded-r-none cursor-pointer h-[120px]">
            &gt;
          </Button>
        </div>
      </div>
      <div className="px-8 rounded-sm my-2 pt-10 pb-20 bg-gray-100 ">
        <h1 className="pb-10 text-3xl font-semibold font-garamond text-gray-950">Recommended Item</h1>
        <div className="flex py-8 rounded-sm justify-between bg-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCard
              key={i}
              image="/images/image1.png"
              title="serwani"
              offer="from ₹500"
            />
          ))}
          <Button type="button" className="my-auto text-2xl px-2.5 rounded-r-none cursor-pointer h-[120px]">
            &gt;
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default HomeView;
