import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// ✅ Types
export type WishlistItem = {
  id: string;
  productId: string;
  name: string;
  price: string;
  quantity: number;
  size: string ;
  image: string ;
  updatedAt: Date;
};

export type LocalWishlistItem = {
  productId: string;
  size?: string;
};

interface WishlistState {
  wishlist: WishlistItem[];
  guestWishlist: LocalWishlistItem[];
  loading: boolean;
  userId?: string;
}

const initialState: WishlistState = {
  wishlist: [],
  guestWishlist: [],
  loading: false,
};

// ✅ Async Thunks
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId: string) => {
    const res = await fetch(`/api/wishlist/${userId}`, { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to fetch wishlist");
    const data = (await res.json()) as WishlistItem[];
    return data;
  }
);

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (
    {
      userId,
      productId,
      size,
      exists,
    }: { userId: string; productId: string; size?: string; exists: boolean },
    { dispatch }
  ) => {
    const action = exists ? "remove" : "add";

    const res = await fetch(`/api/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, size, action }),
    });

    if (!res.ok) throw new Error("Failed to toggle wishlist item");
    toast(exists ? "Item removed from wishlist" : "Item added to wishlist");

    // Refresh after update
    dispatch(fetchWishlist(userId));
    return { productId, size, exists };
  }
);

// ✅ Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | undefined>) => {
      state.userId = action.payload;
    },
    setGuestWishlist: (state, action: PayloadAction<LocalWishlistItem[]>) => {
      state.guestWishlist = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state.guestWishlist));
      }
    },
    toggleGuestWishlist: (
      state,
      action: PayloadAction<{ productId: string; size?: string }>
    ) => {
      const exists = state.guestWishlist.find(
        (w) =>
          w.productId === action.payload.productId && w.size === action.payload.size
      );
      if (exists) {
        state.guestWishlist = state.guestWishlist.filter(
          (w) =>
            !(
              w.productId === action.payload.productId &&
              w.size === action.payload.size
            )
        );
      } else {
        state.guestWishlist.push(action.payload);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state.guestWishlist));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUserId, setGuestWishlist, toggleGuestWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
