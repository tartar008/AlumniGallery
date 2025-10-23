import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        border: "hsl(var(--border))",
      },
      backgroundColor: {
        background: "hsl(var(--background))",
      },
      textColor: {
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
