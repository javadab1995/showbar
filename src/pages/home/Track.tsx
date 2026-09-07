import { ChangeEvent, SubmitEvent, useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import { Button } from "../../components/buttons/Button";
import BackButton from "../../components/buttons/BackButton";

export default function TrackRequest() {
  const [mode, setMode] = useState("all");

  const [form, setForm] = useState({
    driverId: "",
    nationalCode: "",
    phone: "",
    trackingCode: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "all") {
      console.log({
        driverId: form.driverId,
        nationalCode: form.nationalCode,
        phone: form.phone,
      });
    } else {
      console.log({
        trackingCode: form.trackingCode,
      });
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-bg px-4 py-20 text-text sm:px-6 "
    >
      <div className="mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <ClipboardList size={23} className="text-primary" />
          </div>

          <h1 className="text-2xl font-bold">پیگیری درخواست</h1>

          <p className="mt-2 text-sm text-text/60">
            وضعیت درخواست‌های حمل خود را مشاهده کنید
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7">
          {/* Tabs */}
          <div className="mb-7 grid grid-cols-2 rounded-2xl bg-bg p-1">
            <button
              type="button"
              onClick={() => setMode("all")}
              className={` 
                rounded-xl px-4 py-3 text-sm font-medium
                transition
                ${
                  mode === "all"
                    ? "bg-background text-text"
                    : "text-text/50 hover:text-text"
                }
              `}
            >
              درخواست‌های من
            </button>

            <button
              type="button"
              onClick={() => setMode("single")}
              className={` 
                rounded-xl px-4 py-3 text-sm font-medium
                transition
                ${
                  mode === "single"
                    ? "bg-background text-text "
                    : "text-text/50 hover:text-text"
                }
              `}
            >
              یک درخواست
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "all" ? (
              <>
                <div>
                  <label
                    htmlFor="driverId"
                    className="mb-2 block text-sm font-medium"
                  >
                    شناسه راننده
                  </label>

                  <input
                    id="driverId"
                    name="driverId"
                    value={form.driverId}
                    onChange={handleChange}
                    placeholder="شناسه راننده را وارد کنید"
                    className="
                      h-12 w-full rounded-xl
                      border border-border
                      bg-surface
                      px-4 text-sm
                      text-text
                      outline-none
                      placeholder:text-text/40
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-primary/10
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="nationalCode"
                    className="mb-2 block text-sm font-medium"
                  >
                    کد ملی
                  </label>
                  <input
                    id="nationalCode"
                    name="nationalCode"
                    inputMode="numeric"
                    maxLength={10}
                    value={form.nationalCode}
                    onChange={handleChange}
                    placeholder="کد ملی را وارد کنید"
                    className="
                      h-12 w-full rounded-xl
                      border border-border
                      bg-surface
                      px-4 text-sm
                      text-text
                      outline-none
                      placeholder:text-text/40
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-primary/10
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium"
                  >
                    شماره تلفن
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="مثلاً ۰۹۱۲۱۲۳۴۵۶۷"
                    className="
                      h-12 w-full rounded-xl
                      border border-border
                      bg-surface
                      px-4 text-sm
                      text-text
                      outline-none
                      placeholder:text-text/40
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-primary/10
                    "
                  />
                </div>

                <div className="rounded-xl bg-bg px-4 py-3 text-xs leading-6 text-text/60">
                  با وارد کردن اطلاعات بالا، درخواست‌های ثبت‌شده مربوط به شما
                  نمایش داده می‌شود.
                </div>
              </>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="trackingCode"
                    className="mb-2 block text-sm font-medium"
                  >
                    کد پیگیری
                  </label>

                  <input
                    id="trackingCode"
                    name="trackingCode"
                    value={form.trackingCode}
                    onChange={handleChange}
                    placeholder="مثلاً SHB-8F42K"
                    className="
                      h-14 w-full rounded-xl
                      border border-border
                      bg-surface
                      px-4
                      text-center text-base
                      font-medium uppercase tracking-wider
                      text-text
                      outline-none
                      placeholder:text-sm
                      placeholder:font-normal
                      placeholder:tracking-normal
                      placeholder:text-text/40
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-primary/10
                    "
                  />
                </div>

                <div className="rounded-xl bg-bg px-4 py-3 text-xs leading-6 text-text/60">
                  کد پیگیری را که پس از ثبت درخواست دریافت کرده‌اید وارد کنید.
                </div>
              </>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="
                flex h-12 w-full 
                items-center justify-center gap-2
                rounded-md
                bg-primary-radial 
                px-5
                font-semibold text-surface
                transition
                hover:bg-primary-dark
                active:scale-[0.99]
              "
            >
              <Search size={18} />
              پیگیری
            </Button>
          </form>
        </div>

       <BackButton/>
      </div>
    </main>
  );
}
