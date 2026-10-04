import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: "#0a0d14",
          dim: "#10131a",
        },
        surface: {
          lowest: "#0b0e15",
          low: "#191b23",
          DEFAULT: "#1d1f27",
          high: "#272a32",
          highest: "#32353d",
          bright: "#363941",
        },
        primary: {
          DEFAULT: "#8b5cf6",
          light: "#a078ff",
          dim: "#d0bcff",
          dark: "#6d3bd7",
        },
        secondary: {
          DEFAULT: "#06b6d4",
          light: "#22d3ee",
          dim: "#4cd7f6",
          dark: "#0891b2",
        },
        cyber: {
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
        text: {
          primary: "#e1e2ec",
          secondary: "#cbc3d7",
          muted: "#958ea0",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          focus: "rgba(6, 182, 212, 0.4)",
          violet: "rgba(139, 92, 246, 0.25)",
        }
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "glow-violet": "0 0 20px -2px rgba(139, 92, 246, 0.35)",
        "glow-cyan": "0 0 20px -2px rgba(6, 182, 212, 0.35)",
        "glow-emerald": "0 0 12px rgba(16, 185, 129, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      }
    },
  },
  plugins: [],
};

export default config;
