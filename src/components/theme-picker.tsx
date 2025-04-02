"use client";

import { useState } from "react";
import { THEMES } from "@/lib/themes";
import { FONT_OPTIONS, FONT_SIZE_OPTIONS } from "@/lib/fonts";
import { useThemeSettings } from "@/hooks/use-theme-settings";
import { useIsMobile as useMobile } from "@/hooks/use-mobile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Paintbrush, Type, TextCursorInput } from "lucide-react";

export function ThemePicker() {
  const { themeSettings, setThemeSettings } = useThemeSettings();
  const { theme, font, fontSize } = themeSettings;

  const setTheme = (newTheme: string) =>
    setThemeSettings((prev) => ({ ...prev, theme: newTheme }));
  const setFont = (newFont: string) =>
    setThemeSettings((prev) => ({ ...prev, font: newFont }));
  const setFontSize = (newFontSize: number) =>
    setThemeSettings((prev) => ({ ...prev, fontSize: newFontSize }));
  const isMobile = useMobile();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Paintbrush className="h-4 w-4" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={isMobile ? "w-screen" : "w-80"} align="end">
        <Tabs defaultValue="theme">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="theme">
              <Paintbrush className="h-4 w-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="font">
              <Type className="h-4 w-4 mr-2" />
              Font
            </TabsTrigger>
            <TabsTrigger value="size">
              <TextCursorInput className="h-4 w-4 mr-2" />
              Size
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-4 py-2">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Select Theme</h4>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {THEMES.map((themeOption) => (
                    <SelectItem
                      key={themeOption.value}
                      value={themeOption.value}
                    >
                      {themeOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {THEMES.map((themeOption) => (
                <Button
                  key={themeOption.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(themeOption.value)}
                  className={`justify-start ${
                    themeOption.value === theme ? "border-2 border-primary" : ""
                  }`}
                >
                  <div
                    className={`mr-1 h-4 w-4 rounded-full bg-${themeOption.value}`}
                  />
                  <span className="text-xs">{themeOption.name}</span>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="font" className="space-y-4 py-2">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Select Font</h4>
              <Select value={font} onValueChange={setFont}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map((fontOption) => (
                    <SelectItem
                      key={fontOption.value}
                      value={fontOption.value}
                      className={fontOption.className}
                    >
                      {fontOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {FONT_OPTIONS.map((fontOption) => (
                <Button
                  key={fontOption.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setFont(fontOption.value)}
                  className={`justify-start ${fontOption.className} ${
                    fontOption.value === font ? "border-2 border-primary" : ""
                  }`}
                >
                  {fontOption.name}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="size" className="space-y-4 py-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <h4 className="font-medium text-sm">Font Size</h4>
                <span className="text-sm">{fontSize}px</span>
              </div>
              <Slider
                value={[fontSize]}
                min={12}
                max={28}
                step={1}
                onValueChange={(value) => setFontSize(value[0])}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {FONT_SIZE_OPTIONS.map((sizeOption) => (
                <Button
                  key={sizeOption.value}
                  variant="outline"
                  size="sm"
                  onClick={() => setFontSize(sizeOption.value)}
                  className={`${
                    sizeOption.value === fontSize
                      ? "border-2 border-primary"
                      : ""
                  }`}
                >
                  {sizeOption.name}
                </Button>
              ))}
            </div>

            <div
              className="rounded border p-3 text-sm"
              style={{ fontSize: `${fontSize}px` }}
            >
              Sample text with the current font size.
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
