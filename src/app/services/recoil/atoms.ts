import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// Interface

// Theme settings interface
export interface ThemeSettings {
  theme: string;
  font: string;
  fontSize: number;
}

// User state
export const userState = atom({
  key: "userState",
  default: null,
});

// Theme state
export const themeState = atom({
  key: "themeState",
  default: "light",
});

// App loading state
export const loadingState = atom({
  key: "loadingState",
  default: false,
});

/**
 * Initializes the `persistAtom` function for Recoil state persistence.
 *
 * This code checks if the current environment is a browser, and if so, it imports the `recoil-persist` library and configures the `persistAtom` function to use the browser's session storage for state persistence.
 *
 * The `persistAtom` function is then assigned to the `persistAtom` variable, which can be used in the Recoil atom definitions to enable state persistence.
 */

// Setup recoil-persist
const { persistAtom } = recoilPersist({
  key: "theme-settings",
  storage: typeof window === "undefined" ? undefined : window.localStorage,
});

// Theme settings atom with persistence
export const themeSettingsState = atom<ThemeSettings>({
  key: "themeSettingsState",
  default: {
    theme: "default",
    font: "sans",
    fontSize: 16,
  },
  effects_UNSTABLE: [persistAtom],
});
