import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export type WishlistItem = {
  id: string;
  productId: string;
  name: string;
  price: string;
  quantity: number;
  size: string;
  image: string;
  updatedAt: Date;
};

export type GuestWishlistItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
};

interface WishlistState {
  wishlist: WishlistItem[];
  guestWishlist: GuestWishlistItem[];
  loading: boolean;
  userId?: string;
}

const initialState: WishlistState = {
  wishlist: [],
  guestWishlist: [], // Initialize empty to prevent hydration mismatch
  loading: false,
};

// --- Async Thunks ---

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId: string) => {
    const res = await fetch(`/api/wishlist/${userId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch wishlist");
    return (await res.json()) as WishlistItem[];
  }
);


 // NEW: Syncs guest items to the database
 
export const syncWishlistWithDB = createAsyncThunk(
  "wishlist/syncWishlist",
  async ({ userId, guestItems }: { userId: string; guestItems: GuestWishlistItem[] }, { dispatch }) => {
    if (guestItems.length === 0) return;    

    const res = await fetch(`/api/wishlist/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items: guestItems }),
    });

    if (res.ok) {
      dispatch(clearGuestWishlist());
      dispatch(fetchWishlist(userId));
      toast.success("Wishlist synchronized!");
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (
    { userId, productId, size, exists }: { userId: string; productId: string; size?: string; exists: boolean },
    { dispatch }
  ) => {
    const action = exists ? "remove" : "add";
    const res = await fetch(`/api/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, size, action }),
    });

    if (!res.ok) throw new Error("Failed to toggle wishlist");
    
    toast.success(exists ? "Removed from wishlist" : "Added to wishlist");
    dispatch(fetchWishlist(userId));
    return { productId, size, exists };
  }
);


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // Initialize guest list from localStorage (Call this in a useEffect on mount)
    initializeGuestWishlist: (state) => {
      const saved = localStorage.getItem("wishlist");
      if (saved) state.guestWishlist = JSON.parse(saved);
    },
    toggleGuestWishlist: (state, action: PayloadAction<GuestWishlistItem>) => {
      const index = state.guestWishlist.findIndex(
        (w) => w.productId === action.payload.productId && w.size === action.payload.size
      );

      if (index !== -1) {
        state.guestWishlist.splice(index, 1);
      } else {
        state.guestWishlist.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.guestWishlist));
    },
    clearGuestWishlist: (state) => {
      state.guestWishlist = [];
      localStorage.removeItem("wishlist");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => { state.loading = true; })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state) => { state.loading = false; });
  },
});

export const { setUserId, initializeGuestWishlist, toggleGuestWishlist, clearGuestWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;


// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "sonner";

// export type WishlistItem = {
//   id: string;
//   productId: string;
//   name: string;
//   price: string;
//   quantity: number;
//   size: string;
//   image: string;
//   updatedAt: Date;
// };

// export type GuestWishlistItem = {
//   productId: string;
//   name: string;
//   price: number;
//   image: string;
//   size?: string;
// };

// interface WishlistState {
//   wishlist: WishlistItem[];
//   guestWishlist: GuestWishlistItem[];
//   loading: boolean;
//   userId?: string;
// }

// const initialState: WishlistState = {
//   wishlist: [],
//   guestWishlist:
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("wishlist") || "[]")
//       : [],
//   loading: false,
// };

// export const fetchWishlist = createAsyncThunk(
//   "wishlist/fetchWishlist",
//   async (userId: string) => {
//     const baseURL =
//       typeof window === "undefined" ? process.env.NEXT_PUBLIC_URL : "";

//     const res = await fetch(`${baseURL}/api/wishlist/${userId}`, {
//       cache: "no-store",
//     });
//     if (!res.ok) throw new Error("Failed to fetch wishlist");

//     const data = (await res.json()) as WishlistItem[];
//     return data;
//   }
// );

// export const toggleWishlist = createAsyncThunk(
//   "wishlist/toggleWishlist",
//   async (
//     {
//       userId,
//       productId,
//       size,
//       exists,
//     }: { userId: string; productId: string; size?: string; exists: boolean },
//     { dispatch }
//   ) => {
//     const action = exists ? "remove" : "add";

//     const res = await fetch(`/api/wishlist`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ userId, productId, size, action }),
//     });

//     if (!res.ok) throw new Error("Failed to toggle wishlist");

//     toast(exists ? "Item removed" : "Item added");
//     dispatch(fetchWishlist(userId));
//     return { productId, size, exists };
//   }
// );

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     setUserId: (state, action) => {
//       state.userId = action.payload;
//     },
//     toggleGuestWishlist: (state, action: PayloadAction<GuestWishlistItem>) => {
//       const exists = state.guestWishlist.find(
//         (w) =>
//           w.productId === action.payload.productId &&
//           w.size === action.payload.size
//       );

//       if (exists) {
//         state.guestWishlist = state.guestWishlist.filter(
//           (w) =>
//             !(
//               w.productId === action.payload.productId &&
//               w.size === action.payload.size
//             )
//         );
//       } else {
//         state.guestWishlist.push(action.payload);
//       }
//       localStorage.setItem("wishlist", JSON.stringify(state.guestWishlist));
//     },

//     setGuestWishlist: (state, action) => {
//       state.guestWishlist = action.payload;
//       localStorage.setItem("wishlist", JSON.stringify(action.payload));
//     },

//     clearGuestWishlist: (state) => {
//       state.guestWishlist = [];
//       localStorage.setItem("wishlist", "[]");
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWishlist.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchWishlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.wishlist = action.payload;
//       })
//       .addCase(fetchWishlist.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export const {
//   setUserId,
//   setGuestWishlist,
//   toggleGuestWishlist,
//   clearGuestWishlist,
// } = wishlistSlice.actions;

// export default wishlistSlice.reducer;
