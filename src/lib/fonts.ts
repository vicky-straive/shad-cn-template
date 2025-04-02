export const FONT_OPTIONS = [
  {
    name: "Sans",
    value: "sans",
    className: "font-sans",
  },
  {
    name: "Mono",
    value: "mono",
    className: "font-mono",
  },
  {
    name: "Instrument",
    value: "instrument",
    className: "font-instrument",
  },
  {
    name: "Noto Mono",
    value: "noto-mono",
    className: "font-noto-mono",
  },
  {
    name: "Mulish",
    value: "mullish",
    className: "font-mullish",
  },
  {
    name: "Inter",
    value: "inter",
    className: "font-inter",
  },
];

export type FontOption = (typeof FONT_OPTIONS)[number];

export const FONT_SIZE_OPTIONS = [
  { name: "Small", value: 14 },
  { name: "Default", value: 16 },
  { name: "Medium", value: 18 },
  { name: "Large", value: 20 },
  { name: "X-Large", value: 24 },
];
