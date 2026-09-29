import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signIn } from "../../services/auth";
import supabase from "../../services/supabase";
import BackButton from "../../components/buttons/BackButton";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      toast.error("ایمیل و رمز عبور را وارد کنید");
      return;
    }

    try {
      setLoading(true);

      const data = await signIn(email, password);

      const { data: profile, error } = await supabase
        .from("users")
        .select("id, email, role")
        .eq("id", data.user.id)
        .single();
      if (error || !profile) {
        toast.error("حساب کاربری معتبر نیست");
        await supabase.auth.signOut();
        return;
      }

      if (!["admin", "super_admin"].includes(profile.role)) {
        toast.error("دسترسی پنل مدیریت ندارید");
        await supabase.auth.signOut();
        return;
      }

      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error("ایمیل یا رمز عبور اشتباه است");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email) {
      toast.error("ابتدا ایمیل خود را وارد کنید");
      return;
    }

    try {
      setResetLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/update-password`,
      });

      if (error) {
        console.error("PASSWORD RESET ERROR:", error);
        toast.error("ارسال ایمیل بازیابی انجام نشد");
        return;
      }

      toast.success("لینک بازیابی رمز عبور به ایمیل شما ارسال شد");
    } catch (error) {
      console.error("PASSWORD RESET ERROR:", error);
      toast.error("خطایی در ارسال ایمیل بازیابی رخ داد");
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#09543F] text-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-[#FDFDFE] border border-[#E2E7E5] rounded-2xl shadow-sm p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#09543F] text-white font-bold text-lg">
              S
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              ورود به پنل مدیریت
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              برای ورود، اطلاعات حساب کاربری خود را وارد کنید
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                ایمیل
              </label>

              <input
                id="email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="example@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl  
            border border-[#E2E7E5]
            bg-[#FDFDFE]
            p-3
            text-gray-900
            focus:outline-0
            focus:ring-4
            focus:ring-green-100
            focus:border-green-800 disabled:cursor-not-allowed
                disabled:opacity-60"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  رمز عبور
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={resetLoading}
                  className="text-sm font-medium text-[#16916e] transition hover:text-[#09543F] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {resetLoading
                    ? "در حال ارسال..."
                    : "رمز عبور را فراموش کرده‌اید؟"}
                </button>
              </div>

              <input
                id="password"
                type="password"
                dir="ltr"
                autoComplete="current-password"
                placeholder="رمز عبور"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-full rounded-xl  
            border border-[#E2E7E5]
            bg-[#FDFDFE]
            p-3
            text-gray-900
            focus:outline-0
            focus:ring-4
            focus:ring-green-100
            focus:border-green-800 disabled:cursor-not-allowed
                disabled:opacity-60"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-xl 
            border border-[#E2E7E5]
            bg-[#09543F]
            p-3
            hover:bg-[#179571]
            text-gray-100
             disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "در حال ورود..." : "ورود به پنل"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-[#E2E7E5] pt-5 text-center">
            <BackButton to="/" title="برگشت به سایت" />
          </div>
        </div>
      </div>
    </main>
  );
}
