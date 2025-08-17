"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Heading from "../section/heading";
import ItemControl from "../components/item-control";
import FilterDrawer from "../ui/filter-drawer";
import Products from "../ui/product";
import CheckoutPrompt, { CartItem } from "../ui/checkout-prompt";

const CategoryView = () => {
  const params = useParams<{ category: string }>();
  const searchParams = useSearchParams();

  const [filterOpen, setFilterOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (
    product: Omit<CartItem, "size" | "quantity">,
    size: string
  ) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id && p.size === size);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
    setOpen(true);
  };

  const sort = searchParams.get("sort") || "featured";

  // (your fetch stays the same)
  // const [products, setProducts] = useState<Product[]>([]);
  //   useEffect(() => {
  //     fetch(`/api/products?category=${params.category}&sort=${sort}`)
  //       .then((res) => res.json())
  //       .then(setProducts);
  //   }, [params.category, sort]);

  return (
    <div className="px-6 py-8">
      <Heading />
      <ItemControl
        sort={sort}
        category={params?.category}
        setFilterOpen={setFilterOpen}
      />

      <Products onAddToCart={handleAddToCart} />

      {open && (
        <CheckoutPrompt cart={cart} setCart={setCart} setOpen={setOpen} />
      )}

      <FilterDrawer
        filterOpen={filterOpen}
        category={params?.category}
        setFilterOpen={setFilterOpen}
      />
    </div>
  );
};

export default CategoryView;
