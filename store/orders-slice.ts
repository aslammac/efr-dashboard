// slices/ordersSlice.ts

import { StateCreator } from "zustand";
import { OrdersSlice, Order } from "../types";

export const createOrdersSlice: StateCreator<OrdersSlice> = (set) => ({
  orders: [],
  setOrders: (orders: Order[]) => set({ orders }),
  addOrder: (order: Order) =>
    set((state) => ({ orders: [...state.orders, order] })),
  removeOrder: (orderId: string) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== orderId),
    })),
});
