"use client";
import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/features/cart-slice";
import { toggleWishlist } from "@/features/wishlist-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type cartItemProps = {
  productId?: string;
  image: string;
  name: string;
  size: string;
  price: number;
  updatedAt?: Date;
};

const CartItems = ({
  productId = "",
  image,
  name = "Beautiful Luxury Pants",
  size = "s",
  price = 400,
  updatedAt = new Date(),
}: cartItemProps) => {
  
  const {wishlist, } = useAppSelector(state => state.wishlist);
  const {data: session} = useSession();
  const userId = session?.user.id;

  const dispatch = useAppDispatch();

  return (
    <div
      className={`border-y overflow-y-scroll no-scrollbar gap-x-8 border-stone-200 mb-1.5 flex`}
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
              dispatch(toggleWishlist({
                userId: userId ?? '',
                productId,
                size: size,
                exists: !!wishlist.find((item) => item.productId === productId),
              }))
            }
            className="text-xs cursor-pointer rounded-full mt-3"
          >
            Save for later
          </Button>
          <Button
            onClick={() => dispatch(removeFromCart({userId, productId ,size}))}
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
