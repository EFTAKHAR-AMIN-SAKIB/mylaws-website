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
          light: "#F7F3EC",
          dark: "#10162B",
        },
        surface: {
          light: "#FFFCF7",
          dark: "#19213B",
        },
        primary: {
          light: "#24231F",
          dark: "#F7F0E4",
        },
        secondary: {
          light: "#625D53",
          dark: "#C4C7D4",
        },
        accent: {
          light: "#80551E",
          dark: "#F2B866",
        },
        border: {
          light: "#D8D0C3",
          dark: "#3E4865",
        },
      },
      fontFamily: {
        serif: ["Merriweather", "Georgia", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        bangla: ["'Noto Sans Bengali'", "'Hind Siliguri'", "'SolaimanLipi'", "'Kalpurush'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
