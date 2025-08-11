/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // keeps dark/light toggle
  theme: {
    extend: {
      screens: {
        nav: "738px", // custom breakpoint for navbar collapse
      },
      colors: {
        /* Light Mode Tokens */
        'light-background': "#ffffff",
        'light-text-primary': "#0f172a",
        'light-text-secondary': "#475569",
        'light-accent': "#6366f1",
        'light-border': "#e2e8f0",

        /* Dark Mode Tokens */
        'dark-background': "#020617",
        'dark-text-primary': "#f1f5f9",
        'dark-text-secondary': "#94a3b8",
        'dark-accent': "#a5b4fc",
        'dark-border': "#1e293b",

        /* Brand Colors (shared across Hero, About, etc.) */
        background: "#F9F1EF",        // Hero background
        soft: "#F7E7EC",              // About background
        surface: "#F7E7EC",
        chocolate: "#5B2C27",         // About headings, borders
        button: "#753D2D",
        richblack: "#2E2E2E",         // About paragraph text
        primary: "#1E1E1E",
        secondary: "#C4C4C4",
        accent: "#D7355D",            // Hero name / subtitle
        cream: "#F9F3F1",
        'cream-highlight': "#EFE7E3",

        /* Experience Section Colors */
        'experience-bg': "#9FB4B7",
        'experience-text': "#2E3E3E",
        'experience-card': "#C7D3D4",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],   // default sans
        opensans: ['"Open Sans"', "sans-serif"],      // for body text in Hero/About
        mono: ["Fira Code", "monospace"],             // for code / small accents
        playpen: ["'Playpen Sans'", "cursive"],       // About headings
        allura: ["Allura", "cursive"],                // Hero big name
        tangerine: ["Tangerine", "cursive"],          // Hero subtitle
        italianno: ["Italianno", "cursive"],          // optional for other sections
      },
    },
  },
  plugins: [],
};
