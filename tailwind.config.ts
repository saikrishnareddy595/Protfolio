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
        ink: "#eaf2ff",
        slate: "#95a6c8",
        card: "rgba(17, 25, 40, 0.58)",
        accent: "#7dd3fc",
        accent2: "#f0abfc"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(125, 211, 252, 0.18), 0 20px 45px rgba(4, 11, 25, 0.5)"
      },
      backgroundImage: {
        haze:
          "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(125, 211, 252, 0.14), transparent 65%), radial-gradient(ellipse 70% 50% at 80% 0%, rgba(240, 171, 252, 0.14), transparent 70%)"
      }
    }
  },
  plugins: []
};

export default config;
