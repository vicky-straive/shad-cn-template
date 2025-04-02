"use client";

import { useThemeSettings } from "@/hooks/use-theme-settings";
import { useEffect } from "react";

export function ThemeApplier({ children }: { children: React.ReactNode }) {
  const { themeSettings } = useThemeSettings();

  useEffect(() => {
    // Apply font family
    document.documentElement.style.setProperty(
      "--font-family",
      themeSettings.font === "inter"
        ? "Inter, sans-serif"
        : themeSettings.font === "noto-mono"
        ? "Noto Mono, monospace"
        : "Geist, sans-serif"
    );

    // Apply font size
    document.documentElement.style.setProperty(
      "--font-size-base",
      `${themeSettings.fontSize}px`
    );

    // Apply theme (if not using next-themes)
    if (themeSettings.theme !== "system") {
      document.documentElement.dataset.theme = themeSettings.theme;
    }
  }, [themeSettings]);

  return <>{children}</>;
}
