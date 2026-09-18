import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e01f27",
          dark: "#b81920",
          light: "#f04047",
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#e01f27",
          600: "#b81920",
          700: "#991b1b",
          800: "#7f1d1d",
          900: "#651a1a",
        },
        secondary: {
          DEFAULT: "#3a3a3a",
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#3a3a3a",
          800: "#262626",
          900: "#171717",
        },
        accent: "#e01f27",
        cta: {
          DEFAULT: "#e01f27",
          hover: "#b81920",
          light: "#fef2f2",
          dark: "#991b1b",
        },
        surface: {
          DEFAULT: "#f5f5f5",
          white: "#FFFFFF",
          muted: "#f5f5f5",
          border: "#e2e8f0",
        },
        text: {
          DEFAULT: "#1a1a1a",
          secondary: "#525252",
          muted: "#a3a3a3",
          inverse: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
