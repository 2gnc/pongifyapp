import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/fsd_pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bg: 'var(--g-color-base-background)',
        text: 'var(--g-color-text-primary)',
        accent: 'var(--g-color-base-brand)',
        "pong-bg": 'var(--pong-bg-base)',
        "pong-bg-dark": 'var(--pong-bg-dark)',
        "pong-text": 'var(--pong-text)',
        "pong-accent": 'var(--pong-accent)',
        "pong-blue-light": 'var(--pong-blue-light)',
        "pong-blue-med": 'var(--pong-blue-med)',
      },
    },
  },
  plugins: [],
};
export default config;
