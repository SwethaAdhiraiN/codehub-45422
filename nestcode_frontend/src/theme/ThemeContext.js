import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

/**
 * PUBLIC_INTERFACE
 * Provides the theme context for the app (light/dark, toggling).
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTheme() {
  return useContext(ThemeContext);
}
