// slices/productsSlice.ts

import { StateCreator } from "zustand";
import { ProductsSlice, Product } from "../types";

export const createProductsSlice: StateCreator<ProductsSlice> = (set) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  addProduct: (product: Product) =>
    set((state) => ({ products: [...state.products, product] })),
  removeProduct: (productId: string) => {},
});
