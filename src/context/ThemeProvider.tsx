import { ReactNode, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const theme = "light"; // ✅ Always light mode

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light"); // ✅ Force light mode
    localStorage.setItem("theme", "light");
  }, []);

  const toggleTheme = () => {
    // ❌ Do nothing — dark mode is disabled
    console.warn("Dark mode is disabled for this version.");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
