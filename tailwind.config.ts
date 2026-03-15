import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ["Clash Display", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        "bg-dark": "var(--color-bg-dark)",
        "bg-card-dark": "var(--color-bg-card-dark)",
        "bg-light": "var(--color-bg-light)",
        "bg-card-light": "var(--color-bg-card-light)",
        "text-dark": "var(--color-text-dark)",
        "text-light": "var(--color-text-light)",
        muted: "var(--color-muted)",
      },
      keyframes: {
        scrollDot: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0" },
          "50%": { transform: "translateY(16px)", opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        calloutPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        gradientBorder: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        waterWave: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        footerRipple: {
          "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: "0.5" },
          "100%": { transform: "translate(-50%, -50%) scale(4)", opacity: "0" },
        },
      },
      animation: {
        scrollDot: "scrollDot 2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        calloutPulse: "calloutPulse 2s ease-in-out infinite",
        gradientBorder: "gradientBorder 4s ease infinite",
        waterWave: "waterWave 3s linear infinite",
        footerRipple: "footerRipple 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
