import { ModalSlice } from "@/types";
import { StateCreator } from "zustand";

export const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  type: "",
  isOpen: false,
  data: null,
  onOpen: (arg, data = null) => set({ isOpen: true, type: arg, data: data }),
  onClose: () => set({ isOpen: false, type: "", data: null }),
});
