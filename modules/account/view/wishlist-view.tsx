/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { HeartOff, Trash2Icon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart } from "@/features/cart-slice";
import {
  fetchWishlist,
  setGuestWishlist,
  toggleGuestWishlist,
  toggleWishlist,
  WishlistItem,
} from "@/features/wishlist-slice";
import NoUserAddress from "../shared/no-user-address";
import { WishlistItemSkeleton } from "@/app/(root)/(account)/account/wishlist/wishlist_skeleton";

interface Props {
  serverWishlist?: WishlistItem[];
  userId?: string;
}

const WishlistView = ({ serverWishlist = [], userId }: Props) => {
  const dispatch = useAppDispatch();

  const { wishlist, guestWishlist, loading } = useAppSelector(
    (state) => state.wishlist
  );

  const [localList, setLocalList] = useState<WishlistItem[]>(
    serverWishlist.map(normalizeItem)
  );

  function normalizeItem(item: any): WishlistItem {
    return {
      id: item.id ?? "",
      productId: item.productId ?? item.product_id ?? "",
      name: item.name ?? "Unknown Product",
      price: String(item.price ?? "0"),
      quantity:
        typeof item.quantity === "number"
          ? item.quantity
          : Number(item.quantity) || 0,
      size: item.size ?? "s",
      image: item.image ?? null,
      updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date(),
    };
  }

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId) {
      if (Array.isArray(wishlist) && wishlist.length >= 0) {
        const normalized = wishlist.map(normalizeItem);
        setLocalList(normalized);
      }
    }
  }, [wishlist, userId]);

  useEffect(() => {
    if (!userId) {
      try {
        const raw = localStorage.getItem("wishlist");
        if (raw) {
          const parsed = JSON.parse(raw) as Array<any>;
          dispatch(setGuestWishlist(parsed));
          setLocalList(parsed.map(normalizeItem));
        } else {
          setLocalList([]);
        }
      } catch (e) {
        console.error("Failed to parse guest wishlist localStorage:", e);
      }
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (!userId) {
      try {
        localStorage.setItem("wishlist", JSON.stringify(guestWishlist || []));
        if (Array.isArray(guestWishlist)) {
          setLocalList(guestWishlist.map(normalizeItem));
        }
      } catch (e) {
        console.error("Failed to persist guest wishlist:", e);
      }
    }
  }, [guestWishlist, userId]);

  const listCount = localList.length;

  const handleToggleWishlist = (
    productId: string,
    size?: string,
    price?: string,
    image?: string,
    name?: string
  ) => {
    setLocalList((prev) =>
      prev.filter(
        (it) => !(it.productId === productId && it.size === (size ?? it.size))
      )
    );

    if (userId) {
      const exists = true;
      dispatch(toggleWishlist({ userId, productId, size, exists }));
    } else {
      dispatch(
        toggleGuestWishlist({
          productId: productId,
          name: name ?? "",
          price: Number(price),
          image: image ?? "",
          size: size,
        })
      );
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    dispatch(
      addToCart({
        userId,
        product: {
          ...item,
          id: item.productId,
          price: Number(item.price) || 0,
          size: item.size ?? "s",
          image: item.image ?? "",
        },
        size: item.size ?? "s",
      })
    );
  };

  const makeKey = (it: WishlistItem, idx: number) =>
    it.id || `${it.productId}-${it.size ?? "s"}-${idx}`;

  return (
    <div className="px-3">
      <h1 className="font-semibold text-2xl font-garamond pb-7">
        Wishlist Items ({listCount})
      </h1>

      {loading && userId && listCount === 0 && <WishlistItemSkeleton />}

      {!listCount && (
        <div className="text-center text-stone-500 mt-10">
          <NoUserAddress Icon={HeartOff} description="No any wishlist items" />
        </div>
      )}

      {localList.map((item, index) => (
        <div
          key={makeKey(item, index)}
          className="border-y gap-x-8 border-stone-200 mb-1.5 flex overflow-hidden"
        >
          <div className="relative w-[180px] h-[180px]">
            {item.image ? (
              <Image src={item.image} fill alt={item.name || "wishlist-item"} />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center text-stone-400">
                No Image
              </div>
            )}
          </div>

          <div className="my-4 flex-1 text-stone-800 relative">
            <h1 className="font-semibold">{item.name}</h1>
            <p className="text-sm lowercase text-stone-600 mt-1">
              Size: {item.size}
            </p>
            <h2 className="text-2xl font-semibold my-2">₹{item.price}</h2>
            <p className="absolute bottom-0 right-4 text-xs text-stone-500">
              Added {format(new Date(item.updatedAt), "dd MMM yyyy")}
            </p>

            <div className="flex gap-x-3 mt-3">
              <Button
                onClick={() => handleAddToCart(item)}
                className="text-xs cursor-pointer rounded-full"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() =>
                  handleToggleWishlist(
                    item.productId,
                    item.size,
                    item.price,
                    item.image,
                    item.price
                  )
                }
                variant="outline"
                className="text-xs rounded-full"
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
