import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: "#818cf8",
        "accent-violet": "#a78bfa",
        "accent-cyan": "#22d3ee",
        gold: "#fbbf24",
      },
      maxWidth: {
        container: "1200px",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-reverse": "float-reverse 8s ease-in-out infinite",
        "float-slow": "float 12s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease-in-out infinite",
        "spin-slow": "spin-slow 25s linear infinite",
        "spin-reverse": "spin-reverse 20s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        /* tech-themed animation utilities */
        "terminal-blink": "terminal-cursor-blink 1s step-end infinite",
        "hex-glitch": "hex-glitch 9s ease-in-out infinite",
        "binary-rain": "binary-col 4s linear infinite",
        "packet": "packet-pulse 1.6s ease-in-out infinite",
        "scan": "scan-sweep 9s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-22px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(-12px)" },
          "50%": { transform: "translateY(12px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /* tech-themed keyframes */
        "terminal-cursor-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "hex-glitch": {
          "0%, 91%, 100%": { opacity: "1", transform: "none" },
          "92%": { opacity: "0.4", transform: "translateX(-2px) skewX(-1deg)" },
          "94%": { opacity: "0.8", transform: "translateX(2px)" },
          "96%": { opacity: "0.5", transform: "translateX(-1px)" },
        },
        "binary-col": {
          "0%":   { transform: "translateY(-110%)", opacity: "0" },
          "6%":   { opacity: "0.45" },
          "94%":  { opacity: "0.45" },
          "100%": { transform: "translateY(110vh)", opacity: "0" },
        },
        "packet-pulse": {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%":      { opacity: "1",   transform: "scale(1.2)" },
        },
        "scan-sweep": {
          "0%":   { top: "-2px", opacity: "0" },
          "4%":   { opacity: "0.6" },
          "96%":  { opacity: "0.6" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 12px rgba(129,140,248,0.25)",
        "glow": "0 0 25px rgba(129,140,248,0.35)",
        "glow-lg": "0 0 50px rgba(129,140,248,0.4)",
        "glow-xl": "0 0 80px rgba(129,140,248,0.35)",
        "glow-gold": "0 0 25px rgba(251,191,36,0.4)",
        "glow-cyan": "0 0 25px rgba(34,211,238,0.35)",
        "premium": "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        "premium-hover": "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(129,140,248,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card": "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 20px 50px rgba(0,0,0,0.55), 0 0 30px rgba(129,140,248,0.08), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
