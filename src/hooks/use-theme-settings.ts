"use client";

import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

// Setup recoil-persist
const { persistAtom } = recoilPersist({
  key: "theme-settings",
  storage: typeof window === "undefined" ? undefined : window.localStorage,
});

// Theme settings interface
export interface ThemeSettings {
  theme: string;
  font: string;
  fontSize: number;
}

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

export function useThemeSettings() {
  const [themeSettings, setThemeSettings] = useRecoilState(themeSettingsState);

  const setTheme = (theme: string) => {
    setThemeSettings((prev) => ({ ...prev, theme }));
  };

  const setFont = (font: string) => {
    setThemeSettings((prev) => ({ ...prev, font }));
  };

  const setFontSize = (fontSize: number) => {
    setThemeSettings((prev) => ({ ...prev, fontSize }));
  };

  // Apply theme to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Remove all theme classes
      document.documentElement.classList.forEach((className) => {
        if (className.startsWith("theme-")) {
          document.documentElement.classList.remove(className);
        }
      });

      // Add current theme class
      document.documentElement.classList.add(`theme-${themeSettings.theme}`);

      // Set font size on root element
      document.documentElement.style.fontSize = `${themeSettings.fontSize}px`;
    }
  }, [themeSettings.theme, themeSettings.fontSize]);

  return {
    theme: themeSettings.theme,
    font: themeSettings.font,
    fontSize: themeSettings.fontSize,
    setTheme,
    setFont,
    setFontSize,
  };
}
