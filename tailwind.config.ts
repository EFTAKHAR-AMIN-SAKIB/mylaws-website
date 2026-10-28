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
          dark: "#F4EFE6",
        },
        surface: {
          light: "#FAF7F0",
          cardLight: "#FDFBFA",
          dark: "#FAF7F0",
          cardDark: "#FDFBFA",
        },
        primary: {
          light: "#111625",
          dark: "#111625",
        },
        secondary: {
          light: "#485061",
          dark: "#485061",
        },
        accent: {
          light: "#9A6F32",
          dark: "#9A6F32",
          gold: "#B68B4C",
          bronze: "#7E5723",
        },
        border: {
          light: "#DDD3C1",
          dark: "#DDD3C1",
          accentLight: "#CBBFA8",
          accentDark: "#CBBFA8",
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
