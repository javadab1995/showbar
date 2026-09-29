import { Monitor, Moon, Palette, Sun } from "lucide-react";

import { useTheme } from "../../hooks/other/useTheme";

export default function ThemeSettings() {
  const { theme, changeTheme } = useTheme();

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/50 p-5">
        <Palette className="h-5 w-5 text-primary" />

        <h3 className="font-bold text-text">ظاهر پنل</h3>
      </div>

      <div className="space-y-3 p-5">
        <button
          type="button"
          onClick={() => changeTheme("light")}
          className={`
            flex w-full items-center justify-between
            rounded-xl px-4 py-3
            transition-all
            ${
              theme === "light"
                ? "bg-primary text-white shadow-md"
                : "bg-surface-2 text-text hover:bg-border"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <Sun className="h-5 w-5" />
            روشن
          </div>

          {theme === "light" && (
            <div className="h-2 w-2 rounded-full bg-surface" />
          )}
        </button>

        <button
          type="button"
          onClick={() => changeTheme("dark")}
          className={`
            flex w-full items-center justify-between
            rounded-xl px-4 py-3
            transition-all
            ${
              theme === "dark"
                ? "bg-primary text-white shadow-md"
                : "bg-surface-2 text-text hover:bg-border"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <Moon className="h-5 w-5" />
            تاریک
          </div>

          {theme === "dark" && (
            <div className="h-2 w-2 rounded-full bg-surface" />
          )}
        </button>

        <button
          type="button"
          onClick={() => changeTheme("system")}
          className={`
            flex w-full items-center justify-between
            rounded-xl px-4 py-3
            transition-all
            ${
              theme === "system"
                ? "bg-primary text-white shadow-md"
                : "bg-surface-2 text-text hover:bg-border"
            }
          `}
        >
          <div className="flex items-center gap-3">
            <Monitor className="h-5 w-5" />
            سیستم
          </div>

          {theme === "system" && (
            <div className="h-2 w-2 rounded-full bg-surface" />
          )}
        </button>
      </div>
    </section>
  );
}
