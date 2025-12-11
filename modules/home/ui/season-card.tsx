import RatingDisplay from "@/modules/shared/rating/ratingDisplay";
import { ClientProductItem } from "@/types/product";
import Image from "next/image";
import React from "react";

const SeasonCard = ({ productData }: { productData: ClientProductItem }) => {
  return (
    <div className=" flex-1 min-w-[340px] flex flex-col py-10 bg-gradient-to-tl rounded-lg from-gray-950 to-gray-900">
      <div className="relative mx-8 rounded-2xl box-border min-h-[300px] flex-1">
        <Image
          src={productData.image ?? "/images/image2.png"}
          fill
          className="object-fill rounded-2xl h-[300px]"
          alt="season image"
        />
      </div>
      <div className="text-white mt-6">
        <div className="h-2 -skew-8 bg-white" />
        <div className="relative px-6 pt-8 text-white">
          {/* Rating and Reviews */}
          <div className="flex text-[8px] items-center mb-3 gap-x-2">
            <span className="mb-[1px]">{productData.averageRating}</span>
            <RatingDisplay
              color="#fff "
              size={9}
              avgRating={productData.averageRating}
            />
            / 5
          </div>

          <h2 className="text-2xl font-extrabold leading-snug mb-2">
            {productData.name}
          </h2>

          <p className="text-lg font-semibold">
            {Math.ceil(Number(productData.price))} ₹
          </p>

          {/* Category / Tagline */}
          <p className="text-sm text-gray-400 font-light">
            {productData.tagName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;
