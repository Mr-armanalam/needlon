import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { addToCart, fetchCart } from "@/features/cart-slice";
import {
  fetchWishlist,
  initializeGuestWishlist,
  toggleGuestWishlist,
  toggleWishlist,
} from "@/features/wishlist-slice";
import RatingDisplay from "@/modules/shared/rating/ratingDisplay";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { individualProduct, ProductData } from "@/types/product";
import { Heart, Share2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProductDescriptionn = ({
  productData,
}: {
  productData: individualProduct;
}) => {
  const productItem = {
    ...productData.product_items,
    ...productData.product_category,
    filter: productData.productFilterData,
  };

  const { wishlist, guestWishlist, loading } = useAppSelector(
    (state) => state.wishlist,
  );

  const { cart } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_URL}${pathname}`;
  const { data: session } = useSession();
  const userId = session?.user.id;
  const wishlistItems = wishlist.length > 0 ? wishlist : guestWishlist;

  const handleToggleWishlist = (
    productId: string,
    image: string,
    price: number,
    name: string,
    size?: string,
  ) => {
    if (userId) {
      const exists = wishlist.some(
        (item) => item.productId === productId && item.size === size,
      );
      dispatch(toggleWishlist({ userId, productId, size, exists }));
    } else {
      dispatch(
        toggleGuestWishlist({
          productId: productId,
          name,
          price: Number(price),
          image: image,
          size: size,
        }),
      );
    }
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    } else {
      // Load from localStorage for guests
      const local = localStorage.getItem("wishlist");
      if (local) {
        dispatch(initializeGuestWishlist());
      }
    }
  }, [userId, dispatch]);

  const handleAddToCart = (product: ProductData, size: string) => {
    dispatch(
      addToCart({
        userId: session?.user.id,
        product: { ...product, size, quantity: 1 },
        size,
      }),
    );
    dispatch(fetchCart(session?.user.id ?? ""));
  };

  const handleShare = async () => {
    // 1. Check if the browser supports the API
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: productItem.name,
          text: productItem.contentTag!,
          url: url,
        });
        console.log("Content shared successfully");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      // 2. Fallback logic (e.g., copy to clipboard)
      alert("Web Share API not supported. Copying link instead.");
      navigator.clipboard.writeText(url);
    }
  };

  // 1. Define the selected size
  const selectedSize = productItem?.sizes?.at(0) ?? "S";

  // 2. Check if it exists in the cart
  const isAlreadyInCart = cart.some(
    (item) => item.productId === productData.product_items.id && item.size === selectedSize,
  );

  console.log(productItem);

  return (
    <div className="absolute p-6 top-16 border border-stone-100 bottom-16 rounded-sm right-10 left-123 bg-stone-50">
      <span className="font-garamond text-sm font-semibold bg-stone-200 px-4 rounded-md py-2">{`${(productItem.CatType ?? "").charAt(0).toUpperCase() + (productItem.CatType ?? "").slice(1)}'s ${(productItem.SubCatType ?? "").toLowerCase()}`}</span>
      <div className="flex gap-4 justify-between">
        <h1 className="font-garamond mt-6 text-5xl">{productItem.name}</h1>
        <div className="flex gap-4 mt-auto bg-stone-200 text-black py-2 px-4 rounded-full">
          <Share2Icon
            onClick={handleShare}
            className="cursor-pointer"
            size={20}
          />
          <div className="w-px bg-black" />
          <Heart
            onClick={() =>
              handleToggleWishlist(
                productItem.id,
                productItem.image,
                Number(productItem.price),
                productItem.name,
                productItem.sizes?.at(0),
              )
            }
            size={20}
            className={`cursor-pointer ${
              wishlistItems?.some((w) => w.productId === productItem.id)
                ? "fill-black"
                : ""
            }`}
          />
        </div>
      </div>
      <Separator className="mt-5 " />

      <h2 className="mt-4 ml-2 text-stone-700 font-garamond line-clamp-1">
        {productItem.tagName}
      </h2>

      <div className="flex w-full line-clamp-1 gap-x-6 ml-2 text-sm font-garamond text-gray-500 mt-2">
        {productItem.filter.length > 0 &&
          productItem.filter.map((data, i) => (
            <p key={i}>
              <span className="font-semibold capitalize  text-gray-600">
                {Object.keys(data)}:{" "}
              </span>
              {Object.values(data)}
              {}
            </p>
          ))}
      </div>

      <div className="flex ml-2 text-sm mt-2 items-center text-gray-500 gap-x-1 ">
        <RatingDisplay size={12} avgRating={productItem.averageRating} />
        <span className="ml-2 text-sm text-gray-700">
          {productItem.averageRating} /{productItem.reviewCount}
        </span>
      </div>

      <div className="flex">
        <p className="text-7xl mt-4 font-garamond">
          <span className="text-[65px]">₹</span>
          {Math.round(Number(productItem.price))}
        </p>
        <p className="mt-auto ml-4 mr-2 text-3xl text-stone-400 font-garamond line-through">
          ₹{Math.round(Number(productItem.mrp_price))}
        </p>
        <p className="mt-auto text-2xl font-garamond text-green-600">
          {Math.round(
            (1 - Number(productItem.price) / Number(productItem.mrp_price)) *
              100,
          )}
          % off
        </p>
      </div>

      <div className="mt-8 w-full flex gap-x-12 ">
        <Button
          type="button"
          className="h-12 w-60 cursor-pointer bg-stone-800 rounded-full"
        >
          Customize
        </Button>
        <Button
          onClick={() =>
            handleAddToCart(
              productData.product_items,
              productItem?.sizes?.at(0) ?? "S",
            )
          }
          disabled={isAlreadyInCart}
          type="button"
          className={`h-12 w-60 cursor-pointer ${isAlreadyInCart && "opacity-50"} bg-stone-700 rounded-full`}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDescriptionn;
