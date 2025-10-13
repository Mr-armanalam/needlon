'use client'
import { fetchCart } from "@/features/cart-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Bell, Heart, ShoppingBagIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";

const CartAndWishList = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const {data: session} = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCart(session?.user.id ?? ''));
  }, [dispatch, session]);
  return (
    <div>
      <div className="flex items-center space-x-6">
        <Link
          href={`/account/wishlist`}
          className="flex cursor-pointer items-center space-x-2"
        >
          <Heart className="w-4 h-4" />
        </Link>
        <Link href={"/cart"} className="relative cursor-pointer">
          {cart?.length !== 0 && (
            <span className="absolute -top-2.5 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              {cart.length}
            </span>
          )}
          <ShoppingBagIcon className="w-4 h-4" />
        </Link>
        <Link
          href={"/account/notification"}
          className="flex cursor-pointer relative items-center space-x-2"
        >
          <span className="absolute -top-2.5 -right-4 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>

          <Bell className="w-4 h-4 " />
        </Link>
      </div>
    </div>
  );
};

export default CartAndWishList;
