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
        "primary": "#f7d101"
      },
    fontFamily: {
      'mono': ["League Gothic"],
      'display': ["League Gothic"]
    }
    }
  },
  plugins: [require("tailgrids/plugin")],
};
export default config;
