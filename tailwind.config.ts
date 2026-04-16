import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ace: {
          red: "#c0392b",
          orange: "#e67e22",
          gold: "#f1c40f",
          cyan: "#5dade2",
          cream: "#faf8f5",
          charcoal: "#2c2c2c",
          slate: "#4a4a4a",
          footer: "#333333",
        },
        felt: {
          green: "#1a6b3c",
          light: "#2d8a56",
          dark: "#0d4a26",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "tilt-in": "tilt-in 0.6s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "count-up": "count-up 2s ease-out",
        "pool-spin": "pool-spin 1s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "tilt-in": {
          "0%": { transform: "perspective(500px) rotateX(10deg)", opacity: "0" },
          "100%": { transform: "perspective(500px) rotateX(0deg)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pool-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
