"use client";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/wishlist-context";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

type cartItemProps = {
  productId?: string;
  image: string;
  name: string;
  size: string;
  price: number;
  updatedAt?: Date;
  removeFromCart: (id: string, size: string) => Promise<void>;
};

const CartItems = ({
  productId = "",
  image,
  name = "Beautiful Luxury Pants",
  size = "s",
  price = 400,
  updatedAt = new Date(),
  removeFromCart,
}: cartItemProps) => {
  const { toggleWishlist, wishlist } = useWishlist();

  return (
    <div
      className={`border-y no-scrollbar gap-x-8 border-stone-200 mb-1.5 flex`}
    >
      <div className="relative w-[180px] h-[180px]">
        <Image src={image ?? ""} fill alt="wishlist " />
      </div>
      <div className="my-4 relative flex-1 text-stone-800">
        <h1 className="font-semibold">{name}</h1>
        <p className="text-sm pl-0.5 lowercase text-stone-600">Size: {size}</p>
        <h2 className="text-2xl font-semibold my-2">₹{price}</h2>
        <p className="absolute bottom-0 right-4 text-stone-500 text-xs ">
          Item added {format(updatedAt, "dd MMMM yyyy")}
        </p>
        <div className="flex gap-x-3">
          <Button
            disabled={!!wishlist.find((item) => item.productId === productId)}
            onClick={() =>
              toggleWishlist({
                productId,
                size: size ?? "",
              })
            }
            className="text-xs cursor-pointer rounded-full mt-3"
          >
            Save for later
          </Button>
          <Button
            onClick={() => removeFromCart(productId, size)}
            variant={"outline"}
            className="text-xs cursor-pointer rounded-full mt-3"
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
