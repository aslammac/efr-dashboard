import { StateCreator } from "zustand";
import { NavSlice } from "../types";

export const createNavSlice: StateCreator<NavSlice> = (set) => ({
  expand: true,
  setExpand: (arg: boolean) => set({ expand: arg }),
  menuNav: "stacks",
  setMenuNav: (arg: string) => set({ menuNav: arg }),
  isLoadingPage: false,
  setIsLoadingPage: (arg: boolean) => set({ isLoadingPage: arg }),
  mobileNav: false,
  setMobileNav: (arg: boolean) => set({ mobileNav: arg }),
});
