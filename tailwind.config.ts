import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette derived from the Samel logo
        gold: {
          50: "#fbf7f0",
          100: "#f5ecd9",
          200: "#ead6ad",
          300: "#dcba7c",
          400: "#cf9e54",
          500: "#b8854a", // primary gold
          600: "#9a6d3c",
          700: "#7c5631",
          800: "#5e422a",
          900: "#3e2c1c",
        },
        navy: {
          50: "#f1f5fa",
          100: "#dee8f3",
          200: "#b8cde2",
          300: "#84a8ca",
          400: "#4f7eac",
          500: "#2d5e90",
          600: "#214875",
          700: "#1b3a5e",
          800: "#162e4a",
          900: "#10223a", // primary deep blue
        },
        ink: "#0f172a",
        muted: "#6b7280",
        cream: "#fbfaf7",
      },
      fontFamily: {
        sans: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 6px 24px -8px rgba(15, 23, 42, 0.10)",
        glow: "0 10px 40px -10px rgba(184, 133, 74, 0.35)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 80% -10%, rgba(184,133,74,0.10), transparent 60%), radial-gradient(900px 500px at -10% 10%, rgba(16,34,58,0.06), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
