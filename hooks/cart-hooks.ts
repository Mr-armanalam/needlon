"use client";
import { useEffect, useState } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
  modalImage?: string[] | null;
  quantity: number;
}

export function useCart(userId?: string) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart
  useEffect(() => {
    if (userId) {
      // fetch from DB
      fetch(`/api/cart?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setCart(data));
    } else {
      // load from localStorage
      const local = localStorage.getItem("cart");
      if (local) setCart(JSON.parse(local));
    }
  }, [userId]);

  // Sync changes
  useEffect(() => {
    if (userId) {
      fetch(`/api/cart?userId=${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, userId]);

  return { cart, setCart };
}
