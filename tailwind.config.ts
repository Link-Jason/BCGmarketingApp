import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        star: "#0ea5e9",
        cashcow: "#22c55e",
        question: "#f97316",
        dog: "#a1a1aa"
      }
    }
  },
  plugins: []
};

export default config;

