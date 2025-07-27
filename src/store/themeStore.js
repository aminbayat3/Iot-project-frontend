import { create } from "zustand";
import { THEME_KEYS } from "../constants/theme-keys.constant";

const useThemeStore = create((set) => ({
  themeKey: THEME_KEYS.PINKY_CAT,

  setTheme: (newThemeKey) => {
    set({ themeKey: newThemeKey });
  },
}));

export default useThemeStore;
