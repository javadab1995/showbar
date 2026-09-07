import { BellRing, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loads } from "../../data/mock";
import { Button } from "../../components/buttons/Button";

export function NotifyMe() {
  const { id } = useParams();
  const load = loads.find((x) => x.id === id);
  const nav = useNavigate();
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 max-w-md mx-auto space-y-6">
        {/* Success Icon Wrapper */}
        <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-text">
            درخواست اطلاع‌رسانی شما ثبت شد.
          </h1>
          <p className="text-text-2 text-sm max-w-sm">
            در صورت موجود شدن مجدد این بار ({load?.origin} به{" "}
            {load?.destination})، بلافاصله از طریق پیامک یا تماس با شما ارتباط
            برقرار خواهیم کرد.
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => nav("/loads")}
          className="w-full"
        >
          بازگشت به لیست بارها
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 mb-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-2 mt-20">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <BellRing className="w-6 h-6 animate-pulse" />
        </div>
        <h1 className="text-xl font-bold text-text">
          اطلاع‌رسانی در صورت موجود شدن
        </h1>
        <p className="text-text-2 text-sm">
          برای اطلاع از فعال‌سازی مجدد این بار، فرم زیر را پر کنید.
        </p>
      </div>

      {/* Main Panel */}
      <div className="bg-surface border border-border p-6 rounded-xl shadow-sm space-y-6">
        {/* Selected Load Card Info */}
        <div className="bg-surface-2 border border-border/60 p-4 rounded-lg space-y-1">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
            مشخصات بار انتخابی
          </span>
          <div className="text-base font-bold text-text">
            {load?.origin} ← {load?.destination}
          </div>
          <div className="text-xs text-text-2 flex items-center gap-1.5 font-mono">
            <span>{load?.cargo}</span>
            <span>•</span>
            <span>{load?.weight} تن</span>
            <span>•</span>
            <span>{load?.date}</span>
          </div>
        </div>

        {/* Form Fields */}
        <form
          className="space-y-4 "
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text">
              نام و نام خانوادگی
            </span>
            <input
              required
              type="text"
              placeholder="مثال: علی علوی"
              className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-text focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-text-2/50"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-text">شماره موبایل</span>
            <input
              required
              type="tel"
              inputMode="tel"
              pattern="^09[0-9]{9}$"
              placeholder="۰۹۱۲۱۲۳۴۵۶۷"
              className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-text text-left font-mono focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-text-2/50 direction-ltr"
            />
          </label>

          <Button
            className="text-sm  w-full  flex justify-center items-center p-2.5 cursor-pointer rounded-md font-medium hover:opacity-90 transition-opacity   text-surface bg-primary-radial"
            type="submit"
          >
            اطلاع بده
          </Button>
        </form>
      </div>
    </div>
  );
}
