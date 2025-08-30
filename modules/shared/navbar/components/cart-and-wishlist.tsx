import { Bell, Heart, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartAndWishList = () => {
  return (
    <div>
      <div className="flex items-center space-x-6">
        <Link href={`/wishlist`}  className="flex cursor-pointer items-center space-x-2">
          <Heart className="w-4 h-4" />
        </Link>
        <Link href={'/your-cart'} className="relative cursor-pointer">
          <span className="absolute -top-2.5 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
          <ShoppingBagIcon className="w-4 h-4" />
        </Link>
        <Link href={'/notification'} className="flex cursor-pointer relative items-center space-x-2">
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
