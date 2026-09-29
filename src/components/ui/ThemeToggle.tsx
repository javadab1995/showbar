import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/other/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

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
      onClick={toggleTheme}
      className="inline-flex  items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:border-primary hover:text-primary p-1.5"
    >
      {theme === "system" && <Monitor size={19} />}
      {theme === "dark" && <Sun size={19} />}
      {theme === "light" && <Moon size={19} />}
    </button>
  );
}
