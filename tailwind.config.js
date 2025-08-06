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
  'light-background': "#ffffff",            // white
  'light-textPrimary': "#0f172a",           // slate-900
  'light-textSecondary': "#475569",         // slate-600
  'light-accent': "#6366f1",                // indigo-500
  'light-border': "#e2e8f0",                // slate-200

  // 🔁 Flattened Dark Mode
  'dark-background': "#020617",             // slate-950
  'dark-textPrimary': "#f1f5f9",            // slate-100
  'dark-textSecondary': "#94a3b8",          // slate-400
  'dark-accent': "#a5b4fc",                 // indigo-300
  'dark-border': "#1e293b",                 // slate-800
},
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
