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
        bg: "var(--bg)",
        "bg-elevated": "var(--bg-elevated)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        // Compatibility aliases mapped to monochrome tokens
        "bg-primary": "var(--bg)",
        "bg-secondary": "var(--bg-elevated)",
        "bg-glow": "#000000",
        "accent-primary": "#ffffff",
        "accent-secondary": "#ffffff",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "Open Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        glass: "20px",
        sharp: "0px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        "glass-glow": "0 0 25px rgba(255, 255, 255, 0.15)",
        "sharp-focus": "0 0 0 2px #000000, 0 0 0 4px #ffffff",
      },
      keyframes: {
        floatA: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatB: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatC: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "float-a": "floatA 5s ease-in-out infinite",
        "float-b": "floatB 6s ease-in-out infinite 1s",
        "float-c": "floatC 5.5s ease-in-out infinite 2s",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
