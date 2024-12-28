import type { Config } from "tailwindcss";
import { wedgesPalette, wedgesTW } from "@lemonsqueezy/wedges";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/@lemonsqueezy/wedges/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    wedgesTW({
      defaultTheme: "dark", // default theme
      defaultExtendTheme: "dark", // default theme to extend when creating custom themes
      fontSmooth: "antialiased", // specify font smoothing for Wedges components
    }),
  ],
} satisfies Config;
