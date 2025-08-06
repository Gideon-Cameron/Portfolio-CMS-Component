/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ✔ keep enabled for dark/light toggle
  theme: {
    extend: {
      screens: {
        nav: "738px", // 👈 Custom breakpoint for navbar collapse
      },
      colors: {
        // 🔁 Flattened Light Mode
        'light-background': "#ffffff",
        'light-textPrimary': "#0f172a",
        'light-textSecondary': "#475569",
        'light-accent': "#6366f1",
        'light-border': "#e2e8f0",

        // 🔁 Flattened Dark Mode
        'dark-background': "#020617",
        'dark-textPrimary': "#f1f5f9",
        'dark-textSecondary': "#94a3b8",
        'dark-accent': "#a5b4fc",
        'dark-border': "#1e293b",

        // 🎨 Custom Brand Colors (no naming conflict)
        background: "#F9F1EF",
        surface: "#F7E7EC",
        soft: "#F7E7EC",
        chocolate: "#5B2C27",
        button: "#753D2D",
        richblack: "#2E2E2E",
        primary: "#1E1E1E",
        secondary: "#C4C4C4",
        accent: "#D7355D",
        cream: "#F9F3F1",
        creamHighlight: "#EFE7E3",

        // 🌊 Experience Section Colors
        experienceBg: "#9FB4B7",
        experienceText: "#2E3E3E",
        experienceCard: "#C7D3D4",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Fira Code", "monospace"],
        playpen: ["'Playpen Sans'", "cursive"],
        allura: ["'Allura'", "cursive"],
        tangerine: ["'Tangerine'", "cursive"],
        italianno: ["'Italianno'", "cursive"],
      },
    },
  },
  plugins: [],
};
