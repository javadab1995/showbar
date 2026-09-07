import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "showbar-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark =
        theme === "dark" || (theme === "system" && mediaQuery.matches);

      if (isDark) {
        root.dataset.theme = "dark";
      } else {
        root.dataset.theme = "light";
      }
    };

    applyTheme();

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);

      return () => {
        mediaQuery.removeEventListener("change", applyTheme);
      };
    }
  }, [theme]);

  const changeTheme = () => {
    setTheme((current) => {
      const next =
        current === "system" ? "dark" : current === "dark" ? "light" : "system";

      localStorage.setItem(STORAGE_KEY, next);

      return next;
    });
  };

  return (
    <button
      type="button"
      aria-label="تغییر پوسته"
      title={
        theme === "system"
          ? "پوسته سیستم"
          : theme === "dark"
            ? "پوسته تاریک"
            : "پوسته روشن"
      }
      onClick={changeTheme}
      className="
        flex
        p-1.5
        items-center
        justify-center
        rounded-xl
        text-text-2
        transition
        hover:bg-surface/75
        hover:text-text
        border border-border
      "
    >
      {theme === "system" && <Monitor size={19} />}
      {theme === "dark" && <Sun size={19} />}
      {theme === "light" && <Moon size={19} />}
    </button>
  );
}
