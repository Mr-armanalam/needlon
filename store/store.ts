// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import counterReducer from "../features/counterSlice"; // example slice
import cartReducer from '../features/cart-slice'
import wishlistReducer from '../features/wishlist-slice'
import addressReducer from '../features/address-slice'
import ratingReducer from '../features/rating-slice'
import notificationReducer from "@/features/notification-slice";

export const store = configureStore({
  reducer: {
    addresses: addressReducer,
    wishlist: wishlistReducer,
    counter: counterReducer,
    cart: cartReducer,
    rating: ratingReducer,
    notification: notificationReducer,
  },
});

// ✅ TypeScript helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Custom hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
