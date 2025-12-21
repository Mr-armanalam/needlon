import {
  fetchWishlist,
  setGuestWishlist,
  toggleGuestWishlist,
  toggleWishlist,
} from "@/features/wishlist-slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { StarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  modalImage?: string[] | null;
  sizes?: string[];
  category?: string;
  catType?: string;
};

interface ProductCardProps extends Product {
  onAddToCart: (product: Product, size: string) => void;
}

const ProductCard = ({
  id,
  name,
  image,
  modalImage,
  price,
  sizes,
  onAddToCart,
}: ProductCardProps) => {
  const [selectedSizeById, setSelectedSizeById] = useState<
    Record<string, string | null>
  >({});
  //  const { wishlist,guestWishlist, toggleWishlist } = useWishlist();
  const { wishlist, guestWishlist, loading } = useAppSelector(
    (state) => state.wishlist
  );

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user.id;

  const wishlistItems = wishlist.length > 0 ? wishlist : guestWishlist;

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;

    if (x < width / 2) {
      setHoverSide("left");
    } else {
      setHoverSide("right");
    }
  };

  const handleToggleWishlist = (productId: string, image: string, price: number, name: string, size?: string ) => {
    if (userId) {
      const exists = wishlist.some(
        (item) => item.productId === productId && item.size === size
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
        })
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
        dispatch(setGuestWishlist(JSON.parse(local)));
      }
    }
  }, [userId, dispatch]);

  return (
    <div key={id}>
      <div
        onMouseEnter={() => setHoveredId(id)}
        onMouseLeave={() => {
          setHoveredId(null);
          setHoverSide(null);
        }}
        onMouseMove={handleMouseMove}
        className="bg-[#EAEAEA] group relative "
      >
        <div onClick={() => router.push(`/product/${id}`)} className="relative w-full h-[400px]">
          <Image
            src={
              hoveredId
                ? hoverSide === "left"
                  ? modalImage?.[0] ?? image
                  : modalImage?.[1] ?? image
                : image
            }
            alt={name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-fill"
          />
        </div>

        {hoveredId === id && Array.isArray(sizes) && sizes.length > 0 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 bg-white/80 py-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSizeById((s) => ({ ...s, [id]: size }));
                  onAddToCart({ id, name, price, image }, size);
                }}
                className={`px-2 py-1 text-sm border rounded ${
                  selectedSizeById[id] === size
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => handleToggleWishlist(id, image, price, name, sizes?.at(0) )}
          aria-label="Toggle wishlist"
          className={`hidden group-hover:flex absolute right-6 top-6 text-white rounded-full hover:bg-black p-2 ${
            wishlistItems?.some((w) => w.productId === id)
              ? "bg-black"
              : "bg-zinc-400"
          }`}
        >
          <StarIcon
            size={16}
            className={
              wishlistItems.some((w) => w.productId === id)
                ? "fill-orange-400 text-orange-400"
                : ""
            }
          />
        </button>
      </div>

      <p className="mt-4 px-4 text-xl text-zinc-600 font-garamond font-semibold">
        {name}
      </p>
      <p className="font-semibold text-gray-500 px-4">${price}</p>
    </div>
  );
};

export default ProductCard;
