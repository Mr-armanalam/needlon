"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Heading from "../section/heading";
import ItemControl from "../components/item-control";
import FilterDrawer from "../ui/filter-drawer";
import Products from "../ui/product";
import CheckoutPrompt from "../ui/checkout-prompt";
import type { CartItem as HookCartItem } from "@/hooks/cart-hooks";
import { useCart } from "@/hooks/cart-hooks";
import { useSession } from "next-auth/react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  modalImage?: string[] | null;
  sizes: string[];
  category: string;
  catType: string;
};

const CategoryView = () => {
  const { data: session } = useSession();
  const { categories, category } = useParams<{
    category: string;
    categories: string;
  }>();
  const [products, setProducts] = useState<Product[]>([]);

  const searchParams = useSearchParams();

  const [filterOpen, setFilterOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart, setCart } = useCart(session?.user.id);

  const handleAddToCart = (
    product: Omit<HookCartItem, "size" | "quantity">,
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
  const material = searchParams.get("material");

  const productData = useCallback(async () => {
    await fetch(
      `/api/products?category=${categories}&subcategory=${category}&sort=${sort}${
        material ? `&material=${material}` : ""
      }`,
      { cache: "no-store" } // always fresh
    )
      .then(async (res) => await res.json())
      .then(setProducts);
  }, [categories, category, material, sort]);

  // (your fetch stays the same)
  useEffect(() => {
    productData();
  }, [category, sort, productData]);

  console.log(products);
  

  return (
    <div className="px-6 py-8">
      <Heading />
      <ItemControl
        sort={sort}
        category={category}
        setFilterOpen={setFilterOpen}
      />

      <Products onAddToCart={handleAddToCart} productData={products} />

      {open && (
        <CheckoutPrompt cart={cart} setCart={setCart} setOpen={setOpen} />
      )}

      <FilterDrawer
        filterOpen={filterOpen}
        category={category}
        setFilterOpen={setFilterOpen}
      />
    </div>
  );
};

export default CategoryView;

// pseudo-code inside your login success handler
// const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

// await fetch("/api/cart/merge", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ userId, localCart }),
// });

// // clear local cart
// localStorage.removeItem("cart");
