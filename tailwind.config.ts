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
          light: "#FBF9F5",
          dark: "#FBF9F5",
        },
        surface: {
          light: "#FAF8F5",
          cardLight: "#FFFFFF",
          dark: "#FAF8F5",
          cardDark: "#FFFFFF",
        },
        primary: {
          light: "#161412",
          dark: "#161412",
        },
        secondary: {
          light: "#4A453E",
          dark: "#4A453E",
        },
        accent: {
          light: "#8F6428",
          dark: "#8F6428",
          gold: "#B8860B",
          bronze: "#734F1D",
        },
        border: {
          light: "#E7E2D6",
          dark: "#E7E2D6",
          accentLight: "#D3C7B5",
          accentDark: "#D3C7B5",
        },
      },
      fontFamily: {
        display: ["'Anek Bangla'", "'Playfair Display'", "'Cinzel'", "serif"],
        cinzel: ["'Cinzel'", "'Anek Bangla'", "serif"],
        serif: ["'Playfair Display'", "'Merriweather'", "Georgia", "serif"],
        sans: ["'Inter'", "'Hind Siliguri'", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        bangla: ["'Anek Bangla'", "'Hind Siliguri'", "'SolaimanLipi'", "'Kalpurush'", "sans-serif"],
        anek: ["'Anek Bangla'", "sans-serif"],
        hind: ["'Hind Siliguri'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
