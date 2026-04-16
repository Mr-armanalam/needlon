"use client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ClientProductItem, Product } from "@/types/product";
import Heading from "@/modules/category/section/heading";
import HomePremRecomLike from "@/modules/home/ui/home-prem-recom-like";

const NewItemView = ({
  premiumItems,
}: {
  premiumItems: ClientProductItem[];
}) => {
  const { type } = useParams<{ type: string }>();
  const [products, setProducts] = useState<Product>({
    productData: [],
    productTagDes: {
      descriptiveContent: "",
      contentTag: "",
    },
  });

  const productData = useCallback(async () => {
    await fetch(`/api/new-products?category=${type}`, { cache: "no-store" })
      .then(async (res) => await res.json())
      .then(setProducts);
  }, [type]);

  useEffect(() => {
    productData();
  }, [productData]);

  return (
    <>
      <div className="px-8 py-6">
        <Heading productTagDes={products.productTagDes} />
      </div>
      <div className="bg-stone-100 dark:bg-white/2 flex flex-col gap-y-2 p-2">
        <div className="h-50 px-6 py-12 ">
          <div className="rounded-full border-white shadow-sm px-12 flex items-center bg-white dark:bg-white/5 dark:text-white w-full h-full">
            <h1 className="text-stone-600 dark:text-white text-xl font-garamond font-bold">
              Select an Items which reperesent your choice !
            </h1>
          </div>
        </div>
        <HomePremRecomLike navigateTo={`/product/new-in`} items={premiumItems} heading={"Men's formalwear"} />
        <HomePremRecomLike navigateTo={`/product/new-in`} items={premiumItems} heading={"Men's Outerwear"} />
        <HomePremRecomLike navigateTo={`/product/new-in`}
          items={premiumItems}
          heading={"Women's Formalwear"}
        />
        <HomePremRecomLike navigateTo={`/product/new-in`} items={premiumItems} heading={"Women's Outerwear"} />
      </div>
    </>
  );
};

export default NewItemView;
