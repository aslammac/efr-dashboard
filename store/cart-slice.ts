// slices/cartSlice.ts

import { StateCreator } from "zustand";
import { CartSlice, CartItem } from "../types";

export const createCartSlice: StateCreator<CartSlice> = (set) => ({
  cartItems: [],
  setCartItems: (cartItems: CartItem[]) => set({ cartItems }),
  addCartItem: (cartItem: CartItem) =>
    set((state) => ({ cartItems: [...state.cartItems, cartItem] })),
  removeCartItem: (productId: string) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    })),
});
