// import { StarIcon } from "lucide-react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";

// type ProductType = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   sizes: string[];
//   onAddToCart: (
//     product: { id: number; name: string; price: number; image: string },
//     size: string
//   ) => void;
// };

// const products: ProductType[] = Array.from({ length: 6 }).map((_, i) => ({
//   id: i + 1,
//   name: "Hydrabadi shirts for men",
//   price: 300,
//   image: "/images/image3.png",
//   sizes: ["S", "M", "L", "XL"], // example sizes
//   onAddToCart: ({id, name, price, image}, size) => {}, // dummy function, replace as needed
// }));

// const Product = ({ sizes, onAddToCart }: ProductType) => {
//   const [wishlist, setWishlist] = useState<number[]>([]);
//   const [hovered, setHovered] = useState(false);
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);

//   // Load wishlist from localStorage on mount
//   useEffect(() => {
//     const stored = localStorage.getItem("wishlist");
//     if (stored) {
//       setWishlist(JSON.parse(stored));
//     }
//   }, []);

//   const toggleWishlist = (id: number) => {
//     let updatedWishlist;
//     if (wishlist.includes(id)) {
//       updatedWishlist = wishlist.filter((item) => item !== id);
//     } else {
//       updatedWishlist = [...wishlist, id];
//     }
//     setWishlist(updatedWishlist);
//     localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
//   };
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-0.5">
//       {products?.map((product, i) => (
//         <div key={i}>
//           <div
//             onMouseEnter={() => setHovered(true)}
//             onMouseLeave={() => setHovered(false)}
//             className="bg-stone-100 group relative py-16"
//           >
//             <div className="relative w-full h-80 ">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 className="object-contain"
//               />
//             </div>

//             {hovered && sizes?.length > 0 && (
//               <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 bg-white/80 py-2">
//                 {sizes?.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() =>
//                       onAddToCart({ product.id, product.name, product.price, product.image }, size)
//                     }
//                     disabled={size === "XXL"} // example disabled
//                     className={`px-2 py-1 text-sm border rounded ${
//                       selectedSize === size
//                         ? "bg-black text-white"
//                         : "bg-white hover:bg-gray-200"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             )}
//             <div
//               onClick={() => toggleWishlist(product.id)}
//               className={`hidden group-hover:flex absolute right-6 top-6 text-white rounded-full hover:bg-black p-2 ${
//                 wishlist.includes(product.id) ? "bg-black" : "bg-zinc-400"
//               }`}
//             >
//               <StarIcon
//                 size={16}
//                 className={`${
//                   wishlist.includes(product.id) &&
//                   "fill-orange-400 text-orange-400"
//                 }`}
//               />
//             </div>
//           </div>
//           <p className="mt-4 px-4 text-xl text-zinc-600 font-garamond font-semibold">
//             {product.name}
//           </p>
//           <p className="font-semibold text-gray-500 px-4">${product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Product;



"use client";

import { StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
};

type ProductGridProps = {
  onAddToCart: (
    product: { id: number; name: string; price: number; image: string },
    size: string
  ) => void;
};

const products: Product[] = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: "Hyderabadi shirts for men",
  price: 300,
  image: "/images/image3.png",
  sizes: ["S", "M", "L", "XL"],
}));

const Products: React.FC<ProductGridProps> = ({ onAddToCart }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedSizeById, setSelectedSizeById] = useState<Record<number, string | null>>({});

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  const toggleWishlist = (id: number) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter((x) => x !== id)
      : [...wishlist, id];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-0.5">
      {products.map((product) => (
        <div key={product.id}>
          <div
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="bg-stone-100 group relative py-16"
          >
            <div className="relative w-full h-80">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-contain"
              />
            </div>

            {hoveredId === product.id && product.sizes.length > 0 && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 bg-white/80 py-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSizeById((s) => ({ ...s, [product.id]: size }));
                      onAddToCart(
                        {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        },
                        size
                      );
                    }}
                    className={`px-2 py-1 text-sm border rounded ${
                      selectedSizeById[product.id] === size
                        ? "bg-black text-white"
                        : "bg-white hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className={`hidden group-hover:flex absolute right-6 top-6 text-white rounded-full hover:bg-black p-2 ${
                wishlist.includes(product.id) ? "bg-black" : "bg-zinc-400"
              }`}
            >
              <StarIcon
                size={16}
                className={
                  wishlist.includes(product.id)
                    ? "fill-orange-400 text-orange-400"
                    : ""
                }
              />
            </button>
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

export default Products;

