// store.ts
import { create } from "zustand";
import { createProductsSlice } from "../store/products-slice";
import { createCartSlice } from "../store/cart-slice";
import { userSlice } from "../store/user-slice";
import { createOrdersSlice } from "../store/orders-slice";
import { createNavSlice } from "../store/navigation-slice";
import { StoreState } from "@/types";
import { createModalSlice } from "@/store/modal-slice";

export const useStore = create<StoreState>()((...a) => ({
  ...createProductsSlice(...a),
  ...createCartSlice(...a),
  ...userSlice(...a),
  ...createOrdersSlice(...a),
  ...createNavSlice(...a),
  ...createModalSlice(...a),
}));

export default useStore;
