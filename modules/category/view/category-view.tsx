"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Heading from "../section/heading";
import ItemControl from "../components/item-control";
import FilterDrawer from "../ui/filter-drawer";
import Products from "../ui/product";
import CheckoutPrompt from "../ui/checkout-prompt";
import type { CartItem as HookCartItem } from "@/hooks/cart-hooks";
import { useCart } from "@/hooks/cart-hooks";
import { useSession } from "next-auth/react";

const CategoryView = () => {
  const { data: session } = useSession();
  const params = useParams<{ category: string }>();
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

// pseudo-code inside your login success handler
// const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

// await fetch("/api/cart/merge", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ userId, localCart }),
// });

// // clear local cart
// localStorage.removeItem("cart");
