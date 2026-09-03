import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // Height-based breakpoints. The scroll story pins panes to the viewport,
      // so short laptops (1366x768, 1280x720) need the same care as narrow
      // phones — width alone doesn't tell you whether the content fits.
      screens: {
        short: { raw: "(max-height: 800px)" },
        shorter: { raw: "(max-height: 680px)" },
      },
      colors: {
        void: {
          DEFAULT: "#050505",
          50: "#0a0a0c",
          100: "#0f0f13",
          200: "#16161c",
          300: "#1e1e26",
          400: "#2a2a34",
        },
        cyber: {
          DEFAULT: "#4cc9ff",
          dim: "#2a86b8",
          glow: "#8ee4ff",
        },
        violet: {
          DEFAULT: "#a06bff",
          dim: "#6d43b8",
          glow: "#c9a6ff",
        },
        silver: {
          DEFAULT: "#e8eaf0",
          dim: "#9aa0ae",
          faint: "#5d6472",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.055em",
sub:        "-0.03em",
      },
      fontSize: {
        "10xl": ["9rem", { lineHeight: "0.86", letterSpacing: "-0.05em" }],
        "11xl": ["12rem", { lineHeight: "0.84", letterSpacing: "-0.055em" }],
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.8)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 3.5s linear infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        scan: "scan 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
