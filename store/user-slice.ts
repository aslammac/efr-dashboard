import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { UserSlice, StoreState } from "../types";

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
});

export const userSlice = persist(createUserSlice, {
  name: "user-storage", // name of the item in the storage (must be unique)
  getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
});
