'use client'
import React from "react";
import PriceDetails from "../ui/price-details";
import CartProduct from "../ui/cart-product";
import Link from "next/link";
import { useCart } from "@/hooks/cart-context";

const CartView = () => {
  const {cart, removeFromCart} = useCart();
  return cart.length === 0 ? (
    <main className="bg-white flex justify-between items-center mt-4 rounded-xs p-6 max-w-[70vw]">
      <div>
        <h1 className="font-garamond font-semibold text-gray-800 text-2xl">
          Your Needlon Cart is Empty
        </h1>
        <p className="text-muted-foreground  ">Add Items to it now.</p>
      </div>
      <Link
        href={"/"}
        className="cursor-pointer border rounded-md px-3.5 py-2 text-sm text-gray-700 font-roboto-sans font-semibold shadow-xs hover:bg-stone-100 border-stone-300"
      >
        Shop now
      </Link>
    </main>
  ) : (
    <main className="grid gap-4 my-6 grid-cols-3">
      <div className="col-span-2 rounded shadow-sm">
        <CartProduct removeFromCart={removeFromCart} cart={cart} />
      </div>
      <div className="col-span-1 h-fit rounded shadow-sm bg-white">
        <PriceDetails cart={cart} />
      </div>
    </main>
  );
};

export default CartView;
