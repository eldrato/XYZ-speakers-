import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#050505",
        "bg-secondary": "#0A0A0C",
        "bg-glow": "#050815",
        "accent-primary": "#0050FF",
        "accent-secondary": "#00D6FF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(ellipse at 50% 40%, #050815 0%, #050505 65%)",
        "cta-gradient": "linear-gradient(90deg, #0050FF 0%, #00D6FF 100%)",
        "headline-gradient": "linear-gradient(180deg, #FFFFFF 0%, #00D6FF 140%)",
      },
      dropShadow: {
        glow: "0 0 24px rgba(0, 214, 255, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
