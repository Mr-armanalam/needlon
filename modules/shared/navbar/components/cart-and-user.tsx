import { Bell, Heart, ShoppingBagIcon } from "lucide-react";
import React from "react";

const CartAndUser = () => {
  return (
    <div>
      <div className="flex items-center space-x-6">
        <button className="flex items-center space-x-2">
          <Heart className="w-4 h-4" />
        </button>
        <button className="relative">
          <span className="absolute -top-2.5 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
          <ShoppingBagIcon className="w-4 h-4" />
        </button>
        <button className="flex relative items-center space-x-2">
          <span className="absolute -top-2.5 -right-4 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>

          <Bell className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartAndUser;
