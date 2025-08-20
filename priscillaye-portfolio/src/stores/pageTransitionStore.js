import { create } from "zustand";

export const usePageTransitionStore = create((set) => ({
  isEntering: false,
  isExiting: false,
  
  setIsEntering: (boolean) =>
    set({
      isEntering: boolean,
    }),

  setIsExiting: (boolean) =>
    set({
      isExiting: boolean,
    }),
}));