// "use client";
// import { getWishlistData } from "@/modules/category/server/get-wishlist-data";
// import React, { createContext, useContext, useEffect, useState } from "react";

// // export interface WishlistItem {
// //   id?: string;
// //   userId?: string;
// //   productId: string;
// //   size?: string;
// //   quantity?: number;
// //   createdAt?: Date;
// //   updatedAt?: Date;
// // }

// type WishlistItem = {
//   id: string;
//   productId: string;
//   name: string;
//   price: string;
//   quantity: number;
//   size: string | null;
//   image: string | null;
//   updatedAt: Date;
// };


// interface WishlistContextType {
//   wishlist: WishlistItem[];
//   toggleWishlist: (item: { productId: string; size?: string }) => Promise<void>;
//   refreshWishlist: () => Promise<void>;
// }

// const WishlistContext = createContext<WishlistContextType | null>(null);

// export const WishlistProvider = ({
//   children,
//   userId,
// }: {
//   children: React.ReactNode;
//   userId?: string;
// }) => {
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

//   // Load initial wishlist
//   useEffect(() => {
//     const init = async () => {
//       if (userId) {
//         await refreshWishlist();
//       } else {
//         const local = localStorage.getItem("wishlist");
//         if (local) setWishlist(JSON.parse(local));
//       }
//     };
//     init();
//   }, [userId]);

//   // Sync guest wishlist to localStorage
//   useEffect(() => {
//     if (!userId) {
//       localStorage.setItem("wishlist", JSON.stringify(wishlist));
//     }
//   }, [wishlist, userId]);

//   // Refresh wishlist from DB
//   const refreshWishlist = async () => {
//     if (!userId) return;
//     const res = await fetch(`/api/wishlist/${userId}`);
//     const data = await res.json();
//     if (res?.status === 200 ) {
//     setWishlist(data);
//     }
//   };

//   // Toggle wishlist item
//   const toggleWishlist = async (item: { productId: string; size?: string }) => {
//     const exists = wishlist.find(
//       (w) => w.productId === item.productId && w.size === item.size
//     );

//     if (exists) {
//       // Remove from wishlist
//       setWishlist((prev) =>
//         prev.filter((w) => !(w.productId === item.productId && w.size === item.size))
//       );

//       if (userId) {
//         await fetch(`/api/wishlist`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId,
//             productId: item.productId,
//             size: item.size,
//             action: "remove",
//           }),
//         });
//         await refreshWishlist();
//       }
//     } else {
//       // Add to wishlist
//       setWishlist((prev) => [...prev, { ...item }]);

//       if (userId) {
//         await fetch(`/api/wishlist`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId,
//             productId: item.productId,
//             size: item.size,
//             action: "add",
//           }),
//         });
//         await refreshWishlist();
//       }
//     }
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, toggleWishlist, refreshWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => {
//   const ctx = useContext(WishlistContext);
//   if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
//   return ctx;
// };


"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Type returned by server (logged-in user wishlist)
 */
type WishlistItem = {
  id: string;
  productId: string;
  name: string;
  price: string;
  quantity: number;
  size: string | null;
  image: string | null;
  updatedAt: Date;
};

/**
 * Type stored in localStorage for guest users
 */
type LocalWishlistItem = {
  productId: string;
  size?: string;
};

interface WishlistContextType {
  wishlist: WishlistItem[];
  guestWishlist: LocalWishlistItem[];
  toggleWishlist: (item: { productId: string; size?: string }) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export const WishlistProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId?: string;
}) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [guestWishlist, setGuestWishlist] = useState<LocalWishlistItem[]>([]);

  // Load initial wishlist
  useEffect(() => {
    const init = async () => {
      if (userId) {
        await refreshWishlist();
      } else {
        const local = localStorage.getItem("wishlist");
        if (local) setGuestWishlist(JSON.parse(local));
      }
    };
    init();
  }, [userId]);

  // Sync guest wishlist to localStorage
  useEffect(() => {
    if (!userId) {
      localStorage.setItem("wishlist", JSON.stringify(guestWishlist));
    }
  }, [guestWishlist, userId]);

  // Refresh wishlist from DB
  const refreshWishlist = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`/api/wishlist/${userId}`);
      if (res.ok) {
        const data: WishlistItem[] = await res.json();
        setWishlist(data);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  // Toggle wishlist item
  const toggleWishlist = async (item: { productId: string; size?: string }) => {
    if (userId) {
      // Logged-in user logic
      const exists = wishlist.find(
        (w) => w.productId === item.productId && w.size === item.size
      );

      if (exists) {
        // Remove
        await fetch(`/api/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, ...item, action: "remove" }),
        });
      } else {
        // Add
        await fetch(`/api/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, ...item, action: "add" }),
        });
      }
      await refreshWishlist();
    } else {
      // Guest user logic
      const exists = guestWishlist.find(
        (w) => w.productId === item.productId && w.size === item.size
      );

      if (exists) {
        setGuestWishlist((prev) =>
          prev.filter((w) => !(w.productId === item.productId && w.size === item.size))
        );
      } else {
        setGuestWishlist((prev) => [...prev, item]);
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, guestWishlist, toggleWishlist, refreshWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
