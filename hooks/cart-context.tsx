"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  userId?: string;
  productId?: string;
  quantity: number;
  size: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  category?: string;
  CatType?: string;
  price: number;
  image: string;
  modalImage?: string[] | null;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: Omit<CartItem, "quantity" | "size">,
    size: string
  ) => Promise<void>;
  removeFromCart: (id: string, size: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId?: string;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart initially
  useEffect(() => {
    const init = async () => {
      if (userId) {
        await refreshCart();
      } else {
        const local = localStorage.getItem("cart");
        if (local) setCart(JSON.parse(local));
      }
    };
    init();
  }, [userId]);

  // Keep localStorage in sync when guest
  useEffect(() => {
    if (!userId) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, userId]);

  const refreshCart = async () => {
    if (!userId) return;
    const res = await fetch(`/api/cart/${userId}`);
    const data: CartItem[] = await res.json();
    setCart(data);
  };

  const addToCart = async (
    product: Omit<CartItem, "quantity" | "size">,
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

    if (userId) {
      await fetch(`/api/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cartItem: { productId: product.id, size, quantity: 1 },
          addQuantity: 1,
        }),
      });
      await refreshCart();
    }
  };

  const removeFromCart = async (productId: string, size: string) => {
  setCart((prev) =>
    prev
      .map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );

  if (userId) {
    await fetch(`/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        cartItem: { productId, size }, // ✅ not id
        removeQuantity: 1,
      }),
    });
    await refreshCart();
  }
};


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
