import { LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/buttons/Button";


export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-login-pattern p-4">
      <div className="flex items-center justify-center gap-2 my-8 text-surface font-bold text-2xl">
        <span className="w-10 h-10 flex items-center justify-center bg-primary-soft rounded-lg text-primary">
          S
        </span>
        <span className="">ShowBar</span>
      </div>

      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-xl">
        {/* Brand Section */}

        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text mb-2">
              ورود به پنل مدیریت
            </h1>
            <p className="text-text-2 text-sm">
              برای ادامه وارد حساب مدیر شوید.
            </p>
          </div>

          {/* Input Fields */}
          <label className="block space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium text-text-2">
              <Mail size={16} /> ایمیل
            </span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@showbar.ir"
              className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </label>

          <label className="block space-y-2">
            <span className="flex items-center gap-2 text-sm font-medium text-text-2">
              <LockKeyhole size={16} /> رمز عبور
            </span>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-surface-2 border border-border text-text focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </label>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-text-2 cursor-pointer">
              <input type="checkbox" className="accent-primary" /> مرا به خاطر
              بسپار
            </label>
            <button className="text-primary hover:underline">
              فراموشی رمز عبور
            </button>
          </div>

          <Button
            onClick={() => nav("/admin")}
          >
            ورود
          </Button>

          <small className="block text-center text-muted text-xs">
            نسخه نمایشی: ورود بدون اعتبارسنجی واقعی
          </small>
        </div>
      </div>
    </main>
  );
}
