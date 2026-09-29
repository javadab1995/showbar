import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";

export default function UpdatePassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("رمز عبور باید حداقل ۸ کاراکتر باشد");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("رمزها یکسان نیستند");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("رمز عبور با موفقیت تغییر کرد");

      navigate("/admin/login");
    } catch (error) {
      console.error(error);
      toast.error("تغییر رمز عبور انجام نشد");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09543F]">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm
          rounded-2xl
          border border-[#E2E7E5]
          bg-[#FDFDFE]
          p-6
          space-y-5
        "
      >
        <div>
          <h1 className="text-xl font-bold text-text">تغییر رمز عبور</h1>

          <p className="mt-1 text-sm text-text-2">
            رمز جدید برای حساب مدیر وارد کنید.
          </p>
        </div>

        <input
          type="password"
          placeholder="رمز جدید"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full rounded-lg
            border border-[#E2E7E5]
            bg-[#FDFDFE]
            p-3
            text-gray-900
            focus:outline-0
            focus:ring-4
            focus:ring-green-100
            focus:border-green-800
          "
        />

        <input
          type="password"
          placeholder="تکرار رمز جدید"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="
            w-full rounded-lg
            border border-[#E2E7E5]
            bg-[#FDFDFE]
            p-3
            text-gray-900
            focus:outline-0
            focus:ring-4
            focus:ring-green-100
            focus:border-green-800
          "
        />

        <div className="space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="
      w-full rounded-lg
      border border-[#E2E7E5]
      p-3 text-green-50 bg-[#09543F]
      text-sm font-semibold
      transition
      hover:bg-[#12b788]
      disabled:pointer-events-none
      disabled:opacity-50
    "
          >
            {loading ? "در حال تغییر..." : "ذخیره رمز جدید"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/login")}
            disabled={loading}
            className="
      w-full rounded-lg
     underline cursor-pointer
      bg-surface
      p-3
      text-sm font-medium text-text-2
      transition
      hover:text-sky-500
      disabled:pointer-events-none
      disabled:opacity-50
    "
          >
            بازگشت به ورود
          </button>
        </div>
      </form>
    </div>
  );
}
