import { StarIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  modalImage?: string[] | null;
  sizes: string[];
};

interface ProductCardProps extends Product {
  onAddToCart: (
    product: Pick<Product, "id" | "name" | "price" | "image">,
    size: string
  ) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

const ProductCard = ({
  id,
  name,
  image,
  modalImage,
  price,
  sizes,
  onAddToCart,
  toggleWishlist,
  wishlist,
}: ProductCardProps) => {
  const [selectedSizeById, setSelectedSizeById] = useState<
    Record<number, string | null>
  >({});
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;

    if (x < width / 2) {
      setHoverSide("left");
    } else {
      setHoverSide("right");
    }
  };

  return (
    <div key={id}>
      <div
        onMouseEnter={() => setHoveredId(id)}
        onMouseLeave={() => {
          setHoveredId(null);
          setHoverSide(null);
        }}
        onMouseMove={handleMouseMove}
        className="bg-stone-100 group relative py-16"
      >
        <div className="relative w-full h-80">
          <Image
            src={
              hoveredId
                ? hoverSide === "left"
                  ? modalImage?.[0] ?? image
                  : modalImage?.[1] ?? image
                : image
            }
            alt={name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-contain"
          />
        </div>

        {hoveredId === id && sizes.length > 0 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 bg-white/80 py-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSizeById((s) => ({ ...s, [id]: size }));
                  onAddToCart({ id, name, price, image }, size);
                }}
                className={`px-2 py-1 text-sm border rounded ${
                  selectedSizeById[id] === size
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
          onClick={() => toggleWishlist(id)}
          aria-label="Toggle wishlist"
          className={`hidden group-hover:flex absolute right-6 top-6 text-white rounded-full hover:bg-black p-2 ${
            wishlist.includes(id) ? "bg-black" : "bg-zinc-400"
          }`}
        >
          <StarIcon
            size={16}
            className={
              wishlist.includes(id) ? "fill-orange-400 text-orange-400" : ""
            }
          />
        </button>
      </div>

      <p className="mt-4 px-4 text-xl text-zinc-600 font-garamond font-semibold">
        {name}
      </p>
      <p className="font-semibold text-gray-500 px-4">${price}</p>
    </div>
  );
};

export default ProductCard;
