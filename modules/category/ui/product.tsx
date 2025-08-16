import { StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: ProductType[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: "Hydrabadi shirts for men",
  price: 300,
  image: "/images/image3.png",
}));

const Product = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const toggleWishlist = (id: number) => {
    let updatedWishlist;
    if (wishlist.includes(id)) {
      updatedWishlist = wishlist.filter((item) => item !== id);
    } else {
      updatedWishlist = [...wishlist, id];
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // If user logged in → call API to update server
    // fetch("/api/wishlist", { method: "POST", body: JSON.stringify({ id }) });
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-0.5">
      {products?.map((product, i) => (
        <div key={i}>
          <div className="bg-stone-100 group relative py-16">
            <div className="relative w-full h-80 ">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div
              onClick={() => toggleWishlist(product.id)}
              className={`hidden group-hover:flex absolute right-6 top-6 text-white rounded-full hover:bg-black p-2 ${
                wishlist.includes(product.id) ? "bg-black" : "bg-zinc-400"
              }`}
            >
              <StarIcon
                size={16}
                className={`${
                  wishlist.includes(product.id) &&
                  "fill-orange-400 text-orange-400"
                }`}
              />
            </div>
          </div>
          <p className="mt-4 px-4 text-xl text-zinc-600 font-garamond font-semibold">
            {product.name}
          </p>
          <p className="font-semibold text-gray-500 px-4">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;
