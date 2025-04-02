"use client";

import { useState, useEffect } from "react";
import { themePreferenceState, ThemePreference } from "./../../theme.store";

export function useThemeSettings() {
  // Default theme settings
  const defaultSettings: ThemePreference = {
    theme: "system",
    font: "geist",
    fontSize: 16,
  };

  // State for tracking if component is mounted
  const [mounted, setMounted] = useState(false);

  // Local state for theme settings
  const [themeSettings, setThemeSettings] =
    useState<ThemePreference>(defaultSettings);

  // Effect to handle Recoil state after mounting
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);

    try {
      // Try to get stored settings from localStorage
      const storedSettings = localStorage.getItem("theme-preferences");
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        if (parsedSettings.themePreferenceState) {
          setThemeSettings(parsedSettings.themePreferenceState);
        }
      }
    } catch (error) {
      console.error("Error reading theme settings from localStorage:", error);
    }
  }, []);

  // Function to update theme settings
  const updateThemeSettings = (newSettings: Partial<ThemePreference>) => {
    const updatedSettings = { ...themeSettings, ...newSettings };
    setThemeSettings(updatedSettings);

    // Save to localStorage if component is mounted
    if (mounted) {
      try {
        localStorage.setItem(
          "theme-preferences",
          JSON.stringify({ themePreferenceState: updatedSettings })
        );
      } catch (error) {
        console.error("Error saving theme settings to localStorage:", error);
      }
    }
  };

  return {
    themeSettings,
    setThemeSettings: updateThemeSettings,
  };
}
