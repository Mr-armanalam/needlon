'use client'

// A shared component which is common for premium, recommendation, you may like section in a home page

import { Button } from "@/components/ui/button";
import ProductCardPreview from "../components/card/item-card";
import { ClientProductItem } from "@/types/product";
import { useRouter } from "next/navigation";


const HomePremRecomLike = ({heading, items, navigateTo}:{heading: string, items:ClientProductItem[], navigateTo: string}) => {
  const router = useRouter();
  // console.log(items, 'item');
  
  return (
    <div className="bg-white dark:bg-black">
      <h1 className="pt-8 pl-8 text-3xl font-semibold font-garamond text-gray-950 dark:text-white">
        {heading}
      </h1>
      <div className="flex overflow-auto px-6 gap-x-4 py-8 rounded-sm no-scrollbar relative">
        {items?.length > 0 && items.map((i, k) => (
          <ProductCardPreview
            key={k}
            item={i}
          />
        ))}
        <Button
          type="button"
          onClick={() => router.push(navigateTo) }
          className="my-auto -right-6 sticky text-2xl px-2.5 rounded-r-none dark:bg-zinc-900/70  dark:border dark:text-white cursor-pointer h-30"
        >
          &gt;
        </Button>
      </div>
    </div>
  );
};

export default HomePremRecomLike;
