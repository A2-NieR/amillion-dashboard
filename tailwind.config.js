/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    darkTheme: "dracula",
    themes: ["emerald", "dracula"],
  },
  darkMode: ["media", "[data-theme='dracula']"],
};
