/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ✔ keep enabled for future use
  theme: {
    extend: {
      screens: {
        nav: "738px", // 👈 Custom breakpoint for navbar collapse
      },
      colors: {
        // 🔁 Flattened Light Mode
        'light-background': "#fdfdfd",
        'light-textPrimary': "#111827",
        'light-textSecondary': "#4b5563",
        'light-accent': "#007acc",
        'light-border': "#e5e7eb",

        // 🔁 Flattened Dark Mode
        'dark-background': "#0a192f",
        'dark-textPrimary': "#ccd6f6",
        'dark-textSecondary': "#8892b0",
        'dark-accent': "#64ffda",
        'dark-border': "#233554",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
