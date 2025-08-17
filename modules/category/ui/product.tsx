"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/product-card";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  modalImage?: string[] | null;
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

const Products = ({ onAddToCart }: ProductGridProps) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

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
      {products.map((product, i) => (
        <ProductCard
          toggleWishlist={toggleWishlist}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          key={i}
          {...product}
        />
      ))}
    </div>
  );
};

export default Products;
