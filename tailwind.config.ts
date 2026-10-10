import type { Config } from "tailwindcss";

/**
 * BRAND COLOURS live here (and as CSS variables in globals.css, which Tailwind reads).
 * Change a value in :root in globals.css and the whole site follows.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "rgb(var(--c-espresso) / <alpha-value>)",
        chocolate: "rgb(var(--c-chocolate) / <alpha-value>)",
        ivory: "rgb(var(--c-ivory) / <alpha-value>)",
        champagne: "rgb(var(--c-champagne) / <alpha-value>)",
        botanical: "rgb(var(--c-botanical) / <alpha-value>)",
        beige: "rgb(var(--c-beige) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        // The site's single "calm" easing curve — also exported in lib/motion.ts
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
