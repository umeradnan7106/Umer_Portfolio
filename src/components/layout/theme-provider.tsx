"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
  /** false until the client has read the stored preference */
  ready: boolean;
}>({ theme: "dark", toggle: () => {}, ready: false });

export const useTheme = () => useContext(ThemeContext);

export const STORAGE_KEY = "ua-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  // The inline script in layout.tsx already applied the class before paint;
  // here we only sync React state to whatever it decided.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setReady(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage can throw in private mode — the toggle still works for
        // this page view, it just will not be remembered.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, ready }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Runs before first paint to avoid a flash of the wrong theme.
 * Dark is the default for every first visit, whatever the OS is set to; only
 * a choice the visitor made with the toggle overrides it.
 */
export const themeScript = `
(function(){
  try {
    var stored = localStorage.getItem("${STORAGE_KEY}");
    var dark = stored ? stored === "dark" : true;
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;
