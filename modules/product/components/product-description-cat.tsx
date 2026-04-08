import RatingDisplay from "@/modules/shared/rating/ratingDisplay";
import { individualProduct, productDataType } from "@/types/product";
import React from "react";

type productDescriptioncatProp = {
  productItem: productDataType;
  productFilterData: {[x: string]: string}[];
};

const ProductDescriptionCat = ({productItem, productFilterData }:productDescriptioncatProp) => {
  return (
    <>
      <h2 className="mt-4 ml-2 text-stone-700 font-garamond line-clamp-1">
        {productItem.tagName}
      </h2>

      <div className="flex w-full line-clamp-1 gap-x-6 ml-2 text-sm font-garamond text-gray-500 mt-2">
        {productFilterData.length > 0 &&
          productFilterData.map((data, i) => (
            <p key={i}>
              <span className="font-semibold capitalize  text-gray-600">
                {Object.keys(data)}:{" "}
              </span>
              {Object.values(data)}
              {}
            </p>
          ))}
      </div>

      <div className="flex ml-2 text-sm mt-2 items-center text-gray-500 gap-x-1 ">
        <RatingDisplay size={12} avgRating={productItem.averageRating} />
        <span className="ml-2 text-sm text-gray-700">
          {productItem.averageRating} /{productItem.reviewCount}
        </span>
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
    </>
  );
};

export default ProductDescriptionCat;
