import { ArrowLeft, ArrowRight, CalendarDays, Scale, Truck } from "lucide-react";
import { SubmitEvent, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loads } from "../../data/mock";
import { Button } from "../../components/buttons/Button";
import { useBasket } from "../../contexts/BasketContext";
import BackButton from "../../components/buttons/BackButton";

export function DriverRequest() {
  const { basket, setBasket } = useBasket();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const selectedLoads = loads.filter((load) => basket.includes(load.id));

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setBasket([]);
      navigate("/request/success");
    }, 700);
  };

  return (
    <section
      dir="rtl"
      className="
        min-h-[calc(100vh-4rem)]
        px-6
        py-20


      "
    >
      <div className="mx-auto">
        {/* Page Header */}
        <header className="mb-7">
          <BackButton />

          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-text
              sm:text-3xl
            "
          >
            درخواست بار
          </h1>

          <p className="mt-2 text-sm leading-6 text-text-2">
            اطلاعات تماس و مشخصات خودرو را وارد کنید.
          </p>
        </header>

        <form onSubmit={submit}>
          <div
            className="
              grid
              gap-5
              lg:grid-cols-[280px_minmax(0,1fr)]
              lg:items-start
            "
          >
            {/* Selected Loads */}
            <aside
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-surface
              "
            >
              <div
                className="
                  border-b
                  border-border
                  px-5
                  py-4
                  sm:px-6
                "
              >
                <h2 className="text-sm font-semibold text-primary-dark">
                  بارهای موردنظر شما
                </h2>

                <p className="mt-1 text-xs text-primary">
                  {selectedLoads.length} بار انتخاب شده
                </p>
              </div>

              <div>
                {selectedLoads.map((load, index) => (
                  <div
                    key={load.id}
                    className="
                      relative
                      px-5
                      py-4
                      sm:px-6
                    "
                  >
                    {index !== selectedLoads.length - 1 && (
                      <div
                        className="
                          absolute
                          inset-x-0
                          bottom-0
                          h-px
                          bg-border
                        "
                      />
                    )}

                    {/* Route */}
                    <Link
                      to={`/loads/${load.id}`}
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-primary-dark
                        transition-colors
                        
                      "
                    >
                      <span className="truncate">{load.origin}</span>

                      <ArrowLeft
                        size={14}
                        className="shrink-0 text-primary/50 mt-1"
                      />

                      <span className="truncate">{load.destination}</span>
                    </Link>

                    {/* Meta */}
                    <div
                      className="
                        mt-2.5
                        flex
                        flex-col
                        gap-1.5
                        text-xs
                        text-text-2
                      "
                    >
                      <span className="font-medium text-text">
                        {load.cargo}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Scale size={13} />
                        {load.weight} تن
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Truck size={13} />
                        {load.vehicle}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        {load.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Driver Form */}
            <form
              className="
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-surface
                mb-10
              "
            >
              {/* Form header */}
              <div
                className="
                  border-b
                  border-border
                  px-5
                  py-5
                  sm:px-7
                "
              >
                <h2 className="text-base font-semibold text-text">
                  اطلاعات راننده و خودرو
                </h2>

                <p className="mt-1.5 text-sm text-text-2">
                  مشخصات خود را برای بررسی درخواست وارد کنید.
                </p>
              </div>

              {/* Fields */}
              <div className="px-5 py-6 sm:px-7 sm:py-7">
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                  "
                >
                  {/* Name */}
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-text">
                      نام و نام خانوادگی
                    </span>

                    <input
                      required
                      name="fullName"
                      placeholder="مثلاً علی رضایی"
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-bg
                        px-3.5
                        text-sm
                        text-text
                        outline-none
                        transition-all
                        placeholder:text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </label>

                  {/* Phone */}
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-text">
                      شماره موبایل
                    </span>
                    <input
                      required
                      name="phone"
                      inputMode="tel"
                      placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-bg
                        px-3.5
                        text-sm
                        text-text
                        outline-none
                        transition-all
                        placeholder:text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </label>

                  {/* Vehicle */}
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-text">
                      نوع خودرو
                    </span>

                    <select
                      required
                      name="vehicle"
                      defaultValue=""
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-bg
                        px-3.5
                        text-sm
                        text-text
                        outline-none
                        transition-all
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    >
                      <option value="" disabled>
                        انتخاب کنید
                      </option>

                      <option value="تریلی">تریلی</option>

                      <option value="کامیون">کامیون</option>

                      <option value="تانکر">تانکر</option>
                    </select>
                  </label>

                  {/* Plate */}
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-text">پلاک</span>

                    <input
                      required
                      name="plate"
                      placeholder="۱۲الف۳۴۵"
                      className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-border
                        bg-bg
                        px-3.5
                        text-sm
                        text-text
                        outline-none
                        transition-all
                        placeholder:text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </label>

                  {/* Transit ID */}
                  <label className="flex flex-col gap-2 sm:col-span-2">
                    <span className="text-sm font-medium text-text">
                      شناسه ترانزیتی
                      <span className="mr-1 text-xs font-normal text-muted">
                        اختیاری
                      </span>
                    </span>

                    <input
                      name="transitId"
                      placeholder="TR-84921"
                      className="
                        h-11
w-full
                        rounded-lg
                        border
                        border-border
                        bg-bg
                        px-3.5
                        text-sm
                        text-text
                        outline-none
                        transition-all
                        placeholder:text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </label>

                  {/* Description */}
                  <label className="flex flex-col gap-2 sm:col-span-2">
                    <span className="text-sm font-medium text-text">
                      توضیحات
                      <span className="mr-1 text-xs font-normal text-muted">
                        اختیاری
                      </span>
                    </span>

                    <textarea
                      name="description"
                      rows={4}
                      placeholder="اگر توضیح یا درخواست خاصی دارید اینجا بنویسید..."
                      className="
                        min-h-28
                        w-full
                        resize-y
                        rounded-lg
                        border
                        border-border
                        bg-bg
                        px-3.5
                        py-3
                        text-sm
                        leading-6
                        text-text
                        outline-none
                        transition-all
                        placeholder:text-muted
                        focus:border-primary
                        focus:ring-2
                        focus:ring-primary/10
                      "
                    />
                  </label>
                </div>

                {/* Privacy */}
                <div
                  className="
                    mt-6
                    rounded-lg
                    bg-primary-soft
                    px-4
                    py-3
                    text-xs
                    leading-5
                    text-text-2
                  "
                >
                  اطلاعات شما فقط برای بررسی درخواست و هماهنگی بار استفاده
                  می‌شود.
                </div>

                {/* Submit */}
                <div className="mt-5 flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="text-sm w-full sm:max-w-52 flex justify-center items-center gap-1.5 cursor-pointer rounded-md font-medium hover:opacity-90 transition-opacity   text-surface p-2.5 bg-primary-radial"
                  >
                    {loading ? "در حال ثبت..." : "ثبت درخواست"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </form>
      </div>
    </section>
  );
}
