"use client";

import { useThemeSettings } from "@/hooks/use-theme-settings";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, Laptop, Type } from "lucide-react"; // Import icons

export function ThemePicker() {
  const { themeSettings, setThemeSettings } = useThemeSettings();
  const { setTheme } = useTheme(); // Use next-themes for theme switching

  // Update both our state and next-themes
  const handleThemeChange = (newTheme: string) => {
    setThemeSettings({ theme: newTheme });
    setTheme(newTheme); // This ensures next-themes also updates
  };

  const fontOptions = [
    { name: "Geist", value: "geist" },
    { name: "Inter", value: "inter" },
    { name: "Noto Mono", value: "noto-mono" },
  ];

  const fontSizeOptions = [14, 16, 18, 20];

  return (
    <div className="flex gap-2">
      {/* Theme Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {themeSettings.theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : themeSettings.theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Laptop className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleThemeChange("light")}>
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleThemeChange("system")}>
            <Laptop className="mr-2 h-4 w-4" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Font Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Type className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {fontOptions.map((font) => (
            <DropdownMenuItem
              key={font.value}
              onClick={() => setThemeSettings({ font: font.value })}
            >
              {font.name}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem>
            <div className="flex flex-col w-full">
              <span className="mb-2">Font Size</span>
              <div className="flex gap-2">
                {fontSizeOptions.map((size) => (
                  <Button
                    key={size}
                    variant={
                      themeSettings.fontSize === size ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setThemeSettings({ fontSize: size })}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
