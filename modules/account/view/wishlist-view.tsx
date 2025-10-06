"use client";
import React from "react";
import { useWishlist } from "@/hooks/wishlist-context";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useCart } from "@/hooks/cart-context";

const WishlistView = () => {
  const { wishlist, guestWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const wishlistItems =
    wishlist.length > 0
      ? wishlist
      : guestWishlist.map((item) => ({
          id: "",
          productId: item.productId,
          name: "",
          price: "",
          quantity: 0,
          size: item.size ?? null,
          image: null,
          updatedAt: new Date(),
        }));
        

  return (
    <div className="">
      <div className="px-3 font-semibold text-2xl font-garamond pb-7">
        Wishlist Items ({wishlistItems.length})
      </div>
      {/* <NoUserAddress Icon = {BaggageClaimIcon} description='No any wishlist items saved' /> */}

      {wishlistItems.length != 0 &&
        wishlistItems?.map((item, index) => (
          <div
            key={index}
            className={`border-y no-scrollbar gap-x-8  border-stone-200 mb-1.5 flex`}
          >
            <div className="relative w-[180px] h-[180px]">
              <Image src={item.image ?? ""} fill alt="wishlist items" />
            </div>
            <div className="my-4 relative flex-1 text-stone-800">
              <h1 className="font-semibold">{item.name}</h1>
              <p className="text-sm pl-0.5 lowercase text-stone-600">
                Size: {item.size}
              </p>
              <h2 className="text-2xl font-semibold my-2">₹{item.price}</h2>
              <p className="absolute bottom-0 right-4 text-stone-500 text-xs ">
                Item added {format(item.updatedAt, "dd MMMM yyyy")}
              </p>
              <div className="flex gap-x-3">
                <Button
                  onClick={() =>
                    addToCart(
                      {
                        id: item.productId,
                        name: item.name,
                        price: Number(item.price),
                        image: item.image ?? "",
                      },
                      item.size ?? "s"
                    )
                  }
                  className="text-xs cursor-pointer rounded-full mt-3"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() =>
                    toggleWishlist({
                      productId: item.productId,
                      size: item.size ?? "",
                    })
                  }
                  variant={"outline"}
                  className="text-xs cursor-pointer rounded-full mt-3"
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WishlistView;
