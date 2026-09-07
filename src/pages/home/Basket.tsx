import { ArrowLeft, CalendarDays, Scale, Trash2, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { loads, money } from "../../data/mock";
import { Button } from "../../components/buttons/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { useBasket } from "../../contexts/BasketContext";
import GoToLoads from "../../components/buttons/GoToLoads";

export function Basket() {
  const { basket, setBasket } = useBasket();
  const items = loads.filter((load) => basket.includes(load.id));
  const navigate = useNavigate();

  const removeItem = (id: string) => {
    setBasket(basket.filter((item) => item !== id));
  };

  if (!items.length) {
    return (
      <section className="min-h-[calc(100vh-4rem)] bg-bg p-6">
        <div className="mx-auto">
          {/* Page header */}
          <header className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              سبد بار
            </h1>

            <p className="mt-2 text-sm leading-6 text-text-2">
              بارهای موردنظر خود را برای ثبت درخواست انتخاب کنید.
            </p>
          </header>

          {/* Empty state */}
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow)">
            <EmptyState
              title="هنوز باری انتخاب نکرده‌اید."
              text="بارهای موردنظر را بررسی کنید و گزینه‌های مناسب را به سبد اضافه کنید."
              action={
                <Link
                  to="/loads"
                  className="
                    inline-flex
                    h-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-primary
                    px-5
                    text-sm
                    font-semibold
                    text-surface
                    transition-all
                    duration-150
                    hover:bg-primary-dark
                    active:scale-[0.98]
                  "
                >
                  مشاهده بارها
                </Link>
              }
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      dir="rtl"
      className="
        min-h-[calc(100vh-4rem)]
        bg-bg
        
        px-6
        
        py-20
      "
    >
      <div className="mx-auto ">
        {/* Header */}
        <header className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-text
                sm:text-3xl
              "
            >
              سبد بار
            </h1>

            <p className="mt-2 text-sm text-text-2">
              {items.length} بار برای ثبت درخواست انتخاب شده است.
            </p>
          </div>

          <div className="sm:block hidden">
            <GoToLoads />
          </div>
        </header>

        {/* Basket items */}
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-surface
            shadow-(--shadow)
          "
        >
          {items.map((load, index) => (
            <article
              key={load.id}
              className={`
                relative
                px-4
                py-5
 sm:px-6
                sm:py-6
                lg:px-7
                ${index !== items.length - 1 ? "border-b border-border/70" : ""}
              `}
            >
              <div
                className="
                  flex
                  flex-col
                  gap-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:gap-8
                "
              >
                {/* Load information */}
                <div className="min-w-0 flex-1">
                  {/* Route */}
                  <Link
                    to={`/loads/${load.id}`}
                    className="
                      inline-flex
                      max-w-full
                      items-center
                      gap-2
                      text-[17px]
                      font-semibold
                      tracking-tight
                      text-text
                      transition-colors
                      hover:text-primary
                    "
                  >
                    <span className="truncate">{load.origin}</span>

                    <ArrowLeft
                      size={17}
                      strokeWidth={1.8}
                      className="shrink-0 text-primary"
                    />

                    <span className="truncate">{load.destination}</span>
                  </Link>

                  {/* Meta */}
                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      items-center
                      gap-x-5
                      gap-y-2
                      text-sm
                      text-text-2
                    "
                  >
                    <span className="font-medium text-text">{load.cargo}</span>

                    <span className="flex items-center gap-1.5">
                      <Scale size={14} strokeWidth={1.8} />
                      {load.weight} تن
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Truck size={14} strokeWidth={1.8} />
                      {load.vehicle}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={14} strokeWidth={1.8} />
                      {load.date}
                    </span>
                  </div>
                </div>

                {/* Price + remove */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    border-t
                    border-border/60
                    pt-4
                    sm:min-w-45
                    sm:justify-end
                    sm:border-0
                    sm:pt-0
                  "
                >
                  <div className="text-right">
                    <strong
                      className="
                        block
                        text-base
                        font-bold
                        tracking-tight
                        text-text
                        sm:text-lg
                      "
                    >
                      {money(load.price)}
                    </strong>

                    <span className="text-xs text-text-2">تومان</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(load.id)}
                    aria-label={`حذف بار ${load.origin} به ${load.destination}`}
                    className="
                      inline-flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-border
                      text-text-2
                      transition-all
                      duration-150
                      hover:border-danger/30
                      hover:bg-danger/5
                      hover:text-danger
                      active:scale-95
                    "
                  >
                    <Trash2 size={17} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div
          className="
            mt-5
            overflow-hidden
            rounded-2xl
            border
            border-border
            bg-surface
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-6
              lg:p-7
            "
          >
            <div className="min-w-0">
              <h2 className="text-base font-semibold text-text">
                آماده ثبت درخواست هستید؟
              </h2>

              <p className="mt-1.5 max-w-xl text-sm leading-6 text-text-2">
                ادمین پس از بررسی، یکی از بارهای موجود را برای شما اختصاص
                می‌دهد.
              </p>
            </div>

            <Button
              className="text-sm  max-w-48  flex justify-center items-center gap-1.5 cursor-pointer rounded-md font-medium hover:opacity-90 transition-opacity   text-surface p-2.5 bg-primary-radial "
              onClick={() => navigate("/request")}
            >
              درخواست یکی از این بارها
            </Button>
          </div>
        </div>

        {/* Mobile back link */}
        <div className="block sm:hidden">
          <GoToLoads />
        </div>
      </div>
    </section>
  );
}
