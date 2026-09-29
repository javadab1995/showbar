import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { createAdmin } from "../../services/apiAdmin";




export default function AddAdmin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error("ایمیل را وارد کنید.");
      return;
    }

    try {
      setLoading(true);

      await createAdmin(normalizedEmail);

      toast.success("دعوت‌نامه ادمین ارسال شد.");
      setEmail("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">افزودن ادمین</h1>

        <p className="mt-2 text-sm text-text-2">
          با ارسال دعوت‌نامه، ادمین می‌تواند حساب خود را فعال و رمز عبور خود را
          تعیین کند.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border rounded-2xl p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-text"
          >
            ایمیل ادمین
          </label>

          <div className="relative">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-2" />

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              dir="ltr"
              className="w-full h-11 pr-11 pl-4 rounded-xl border border-border bg-bg text-text outline-none transition focus:border-primary"
              disabled={loading}
            />
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-surface-2 border border-border p-4">
          <p className="text-sm text-text-2">
            نقش این حساب به صورت خودکار روی
            <span className="font-semibold text-text mx-1">admin</span>
            قرار می‌گیرد.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-11 rounded-xl bg-primary text-white font-medium flex items-center justify-center gap-2 transition hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <UserPlus className="w-5 h-5" />

          {loading ? "در حال ارسال..." : "ارسال دعوت‌نامه"}
        </button>
      </form>
    </div>
  );
}
