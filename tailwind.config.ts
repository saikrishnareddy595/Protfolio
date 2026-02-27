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
