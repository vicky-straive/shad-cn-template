import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "theme-preferences",
  storage: typeof window === "undefined" ? undefined : window.localStorage,
});

export type ThemePreference = {
  theme: string;
  font: string;
  fontSize: number;
};

export const themePreferenceState = atom<ThemePreference>({
  key: "themePreferenceState",
  default: {
    theme: "system",
    font: "geist",
    fontSize: 16,
  },
  effects_UNSTABLE: [persistAtom],
});
