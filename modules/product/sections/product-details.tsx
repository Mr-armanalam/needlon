import { individualProduct } from "@/types/product";
import React from "react";

const ProductDetails = ({
  productData,
}: {
  productData: individualProduct;
}) => {
  const mergedProductFilterData = productData.productFilterData.reduce(
    (acc: Array<Record<string, unknown[]>>, obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];

      // Find if an object with this specific key already exists in our array
      const existingObj = acc.find((item) => Object.hasOwn(item, key));

      if (existingObj) {
        (existingObj[key] as unknown[]).push(value);
      } else {
        acc.push({ [key]: [value] });
      }

      return acc;
    },
    [],
  );

  return (
    <section className="h-130 grid grid-cols-2 gap-0 items-center rounded p-8">
      <div className="">
        <h1 className="text-3xl font-garamond font-semibold mb-8 dark:text-white text-gray-900">
          About this {productData.product_category?.SubCatType}
        </h1>
        <p className="font-roboto-sans text-sm dark:text-white/80 text-stone-500">
          {productData.product_category?.descriptiveContent}
        </p>
      </div>
      <div className="flex flex-col gap-y-8 items-center">
        <p className="font-semibold  ml-auto border-b">Available</p>
        <div className="text-xs">
          {mergedProductFilterData.length > 0 &&
            mergedProductFilterData.map((data, i) => (
              <p key={i}>
                <span className="font-semibold capitalize ">
                  {Object.keys(data)}:{" "}
                </span>
                {Object.values(data).join(", ")}
                {}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
