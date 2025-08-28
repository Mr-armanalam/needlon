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

  useEffect(() => {
    const handleGetCart = async () => {
      if (userId) {
        const res = await fetch(`/api/cart?userId=${userId}`);
        const data = await res.json();
        setCart(data);
      } else {
        const local = localStorage.getItem("cart");
        if (local) setCart(JSON.parse(local));
      }
    };

    handleGetCart();
  }, [userId]);

 useEffect(() => {
  const handleStoreCart = async () => {
    if (userId) {
       await fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItem: cart.at(-1), userId }),
      });
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  if (cart.length > 0) handleStoreCart();
}, [cart, userId]);

  return { cart, setCart };
}
