"use client";

import { useState, useEffect } from "react";
import { ThemePreference } from "./../../theme.store";

export function useThemeSettings() {
  // Default settings
  const defaultSettings: ThemePreference = {
    theme: "system",
    font: "geist",
    fontSize: 16,
  };

  // State for theme settings
  const [themeSettings, setThemeSettingsState] =
    useState<ThemePreference>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const storedSettings = localStorage.getItem("theme-settings");
      if (storedSettings) {
        setThemeSettingsState(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Failed to load theme settings:", error);
    }
  }, []);

  // Function to update settings
  const setThemeSettings = (newSettings: Partial<ThemePreference>) => {
    setThemeSettingsState((prev) => {
      const updated = { ...prev, ...newSettings };
      // Save to localStorage
      if (mounted) {
        try {
          localStorage.setItem("theme-settings", JSON.stringify(updated));
        } catch (error) {
          console.error("Failed to save theme settings:", error);
        }
      }
      return updated;
    });
  };

  return {
    themeSettings,
    setThemeSettings,
  };
}
