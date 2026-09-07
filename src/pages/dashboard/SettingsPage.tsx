import {
  Moon,
  Sun,
  Monitor,
  LogOut,
  Building2,
  Palette,
 
  UsersRound,
} from "lucide-react";

import { useState } from "react";
import { Button } from "../../components/buttons/Button";

export function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Section */}
      <div className="space-y-2 border-b border-border pb-6">
        <h2 className="text-3xl font-bold text-text">تنظیمات</h2>
        <p className="text-text-2">
          مدیریت اطلاعات شرکت، حساب کاربری و ظاهر پنل مدیریتی
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Company Info */}
          <section className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-border bg-surface-2/50 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text">اطلاعات شرکت</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-text-2 ml-1">
                    نام شرکت
                  </span>
                  <input
                    defaultValue="ShowBar"
                    className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-text focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-text-2 ml-1">
                    شماره تماس
                  </span>
                  <input
                    defaultValue="۰۲۱-۱۲۳۴۵۶۷۸"
                    className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-text font-mono focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-text-2 ml-1">
                    واتساپ
                  </span>
                  <input
                    defaultValue="۰۹۱۲۱۲۳۴۵۶۷"
                    className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-text font-mono focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-sm font-medium text-text-2 ml-1">
                    ایمیل رسمی
                  </span>
                  <input
                    defaultValue="info@showbar.ir"
                    className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-text font-mono focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </label>
                <label className="md:col-span-2 space-y-1.5">
                  <span className="text-sm font-medium text-text-2 ml-1">
                    آدرس دفتر مرکزی
                  </span>
                  <textarea
                    defaultValue="تهران، خیابان نمونه، ساختمان مدرن، واحد ۱۰"
                    rows={3}
                    className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-text focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* 2. Admin Account */}
          <section className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-border bg-surface-2/50 flex items-center gap-3">
              <UsersRound className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text">حساب مدیر</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-1.5">
                <span className="text-sm font-medium text-text-2 ml-1">
                  ایمیل مدیریت
                </span>
                <input
                  defaultValue="admin@showbar.ir"
                  className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-text focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-medium text-text-2 ml-1">
                  رمز عبور جدید
                </span>
                <input
                  type="password"
                  placeholder="برای تغییر وارد کنید"
                  className="w-full px-4 py-2.5 bg-surface-2 border border-border rounded-xl text-text focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </label>
            </div>
          </section>
        </div>

        {/* Sidebar: Theme & Logout */}
        <div className="space-y-6">
          {/* Theme Card */}
          <section className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-border bg-surface-2/50 flex items-center gap-3">
              <Palette className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text">ظاهر پنل</h3>
            </div>
            <div className="p-5 space-y-3">
              <button
                onClick={() => setTheme("light")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${theme === "light" ? "bg-primary text-white shadow-md" : "bg-surface-2 text-text hover:bg-border"}`}
              >
                <div className="flex items-center gap-3">
                  <Sun className="w-5 h-5" /> روشن
                </div>
                {theme === "light" && (
                  <div className="w-2 h-2 text-surface rounded-full" />
                )}
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${theme === "dark" ? "bg-primary text-white shadow-md" : "bg-surface-2 text-text hover:bg-border"}`}
              >
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5" /> تاریک
                </div>
                {theme === "dark" && (
                  <div className="w-2 h-2 text-surface rounded-full" />
                )}
              </button>

              <button
                onClick={() => setTheme("system")}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${theme === "system" ? "bg-primary text-white shadow-md" : "bg-surface-2 text-text hover:bg-border"}`}
              >
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5" /> سیستم
                </div>
                {theme === "system" && (
                  <div className="w-2 h-2 text-surface rounded-full" />
                )}
              </button>
            </div>
          </section>

          {/* Logout Section */}
          <section className="pt-4">
            <Button
              variant="danger"
              className="w-full bg-danger flex items-center justify-center py-3 text-lg shadow-lg shadow-red-500/10"
            >
              <LogOut className="ml-2 w-5 h-5" /> خروج از حساب
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
