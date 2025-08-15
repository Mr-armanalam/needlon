import Image from "next/image";
import React from "react";

const Product = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <div className="relative w-full h-80 bg-gray-100">
            <Image
              src={"/images/image3.png"}
              alt={"abc"}
              fill
              className="object-contain"
            />
          </div>
          <p className="mt-4 text-sm">{"Hydrabadi shirts for men"}</p>
          <p className="font-semibold">${300}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
