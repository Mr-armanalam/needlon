import { Separator } from "@/components/ui/separator";
import RatingDisplay from "@/modules/shared/rating/ratingDisplay";
import { individualProduct } from "@/types/product";
import { Heart, Share2Icon } from "lucide-react";
import React from "react";

const ProductDescriptionn = ({
  productData,
}: {
  productData: individualProduct;
}) => {
  const productItem = {
    ...productData.product_items,
    ...productData.product_category,
  };
  return (
    <div className="absolute p-6 top-16 border border-stone-100 bottom-16 rounded-sm right-10 left-123 bg-stone-50">
      <span className="font-garamond text-sm font-semibold bg-stone-200 px-4 rounded-md py-2">{`${(productItem.CatType ?? "").charAt(0).toUpperCase() + (productItem.CatType ?? "").slice(1)}'s ${(productItem.SubCatType ?? "").toLowerCase()}`}</span>
      <div className="flex gap-4 justify-between">
        <h1 className="font-garamond mt-6 text-5xl">{productItem.name}</h1>
        <div className="flex gap-4 mt-auto bg-stone-200 text-black py-2 px-4 rounded-full">
          <Share2Icon size={20} />
          <div className="w-px bg-black" />
          <Heart size={20} />
        </div>
      </div>
      <Separator className="mt-5 " />

      <h2 className="mt-4 ml-2 text-stone-700 font-garamond line-clamp-1">
        {productItem.tagName}
      </h2>

      <div className="flex ml-2 texg-sm mt-2 items-center text-gray-500 gap-x-1 ">
        <RatingDisplay size={12} avgRating={productItem.averageRating} />
        <span className="ml-2 text-sm text-gray-700">{productItem.averageRating} /{productItem.reviewCount}</span>
      </div>

      <div className="flex">
        <p className="text-7xl mt-4 font-garamond">
          <span className="text-[65px]">₹</span>
          {Math.round(Number(productItem.price))}
        </p>
        <p className="mt-auto ml-4 mr-2 text-3xl text-stone-400 font-garamond line-through">
          ₹{Math.round(Number(productItem.mrp_price))}
        </p>
        <p className="mt-auto text-2xl font-garamond text-green-600">
          {Math.round(
            (1 - Number(productItem.price) / Number(productItem.mrp_price)) *
              100,
          )}
          % off
        </p>
      </div>

    </div>
  );
};

export default ProductDescriptionn;
