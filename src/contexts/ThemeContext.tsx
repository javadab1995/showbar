import { createContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  themeRoot: HTMLDivElement | null;
};

type ThemeProviderProps = {
  children: ReactNode;
  storageKey: string;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children, storageKey }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);
  const [themeRoot, setThemeRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      setTheme(savedTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const dark =
        theme === "dark" || (theme === "system" && mediaQuery.matches);

      setIsDark(dark);
    };

    applyTheme();

    if (theme !== "system") return;

    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [theme]);

  const changeTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    localStorage.setItem(storageKey, nextTheme);
  };

  const toggleTheme = () => {
    setTheme((current) => {
      const next =
        current === "system" ? "dark" : current === "dark" ? "light" : "system";

      localStorage.setItem(storageKey, next);

      return next;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        toggleTheme,
        themeRoot,
      }}
    >
      <div
        ref={setThemeRoot}
        data-theme={isDark ? "dark" : "light"}
        className="min-h-screen bg-background text-text"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
