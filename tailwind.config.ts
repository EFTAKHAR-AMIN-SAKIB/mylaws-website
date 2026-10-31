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
          light: "#F1EDE1",
          dark: "#F1EDE1",
        },
        surface: {
          light: "#FAF7F0",
          cardLight: "#FDFBFA",
          dark: "#FAF7F0",
          cardDark: "#FDFBFA",
        },
        primary: {
          light: "#231F1C",
          dark: "#231F1C",
        },
        secondary: {
          light: "#5A534A",
          dark: "#5A534A",
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
