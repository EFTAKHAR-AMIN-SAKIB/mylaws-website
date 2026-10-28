import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          light: "#F4EFE6",
          dark: "#0A1122",
        },
        surface: {
          light: "#FAF7F0",
          cardLight: "#FDFBFA",
          dark: "#101B33",
          cardDark: "#142240",
        },
        primary: {
          light: "#111625",
          dark: "#F7F2E8",
        },
        secondary: {
          light: "#485061",
          dark: "#8E9DB0",
        },
        accent: {
          light: "#9A6F32",
          dark: "#D8B17A",
          gold: "#DFBB84",
          bronze: "#C49856",
        },
        border: {
          light: "#DDD3C1",
          dark: "#213050",
          accentLight: "#CBBFA8",
          accentDark: "#33466D",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Merriweather", "Georgia", "serif"],
        cinzel: ["'Cinzel'", "serif"],
        serif: ["'Playfair Display'", "Merriweather", "Georgia", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        bangla: ["'Noto Sans Bengali'", "'Hind Siliguri'", "'SolaimanLipi'", "'Kalpurush'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
