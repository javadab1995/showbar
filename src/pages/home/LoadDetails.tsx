 import {
   ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  MapPin,
  Plus,
  PlusSquare,
  Scale,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { loads, money } from "../../data/mock";
import { useBasket } from "../../contexts/BasketContext";

import { StatusBadge } from "../../components/ui/StatusBadge";
import { Button } from "../../components/buttons/Button";
import GoToLoads from "../../components/buttons/GoToLoads";

export function LoadDetails() {
  const { id } = useParams();
  const { basket, setBasket } = useBasket();

  const load = loads.find((item) => item.id === id);

  if (!load) {
    return (
      <section className="mx-auto w-full px-6 py-20 ">
        <div
          className="
            flex min-h-60
            items-center justify-center
            rounded-xl
            border border-borde
            text-sm text-text-2
          "
        >
          بار موردنظر پیدا نشد.
        </div>
      </section>
    );
  }

  const selected = basket.includes(load.id);
  const active = load.status === "فعال";

  const toggleBasket = () => {
    setBasket(
      selected
        ? basket.filter((item) => item !== load.id)
        : [...basket, load.id],
    );
  };

  return (
    <section className="mx-auto w-full px-6 py-20">
      {/* Back */}
     <GoToLoads />
      {/* Hero */}
      <section
        className="
          overflow-hidden
          rounded-2xl
          border border-border
          
        "
      >
        <div className="p-5 sm:p-6 lg:p-7">
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Route */}
            <div className="min-w-0">
              <span className="mb-2 block text-xs font-medium text-text-2">
                مسیر حمل
              </span>

              <div className="flex items-center gap-2.5">
                <MapPin size={18} className="shrink-0 text-primary" />

                <h1
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-primary
                    sm:text-2xl
                  "
                >
                  {load.origin}
                </h1>

                <ArrowLeft size={18} className="shrink-0 text-primary/50" />

                <h1
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-primary
                    sm:text-2xl
                  "
                >
                  {load.destination}
                </h1>
              </div>
            </div>

            {/* Status */}
            <div className="shrink-0">
              <StatusBadge status={load.status} />
            </div>
          </div>

          {/* Published */}
          <div
            className="
              mt-5
              flex
              items-center
              gap-2
              border-t border-border
              pt-4
              text-xs
              text-text-2
            "
          >
            <CalendarDays size={14} />
            منتشر شده: {load.createdAt}
          </div>
        </div>
      </section>
      {/* Main content */}
      <div
        className="
          mt-5
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-[minmax(0,1fr)_300px]
          lg:items-start
          lg:gap-6
        "
      >
        {/* Left */}
        <div className="space-y-5">
          {/* Load Information */}
          <section
            className="
              overflow-hidden
              rounded-2xl
              border border-border
            "
          >
            <div className="border-b border-border px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold text-text">اطلاعات بار</h2>

              <p className="mt-1 text-xs text-text-2">
                جزئیات کامل بار و شرایط حمل
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <InfoItem icon={Truck} label="نوع بار" value={load.cargo} />

              <InfoItem
                icon={Scale}
                label="وزن بار"
                value={`${load.weight} تن`}
              />

              <InfoItem icon={Truck} label="نوع ناوگان" value={load.vehicle} />

              <InfoItem
                icon={CalendarDays}
                label="تاریخ بارگیری"
                value={load.date}
              />

              <InfoItem
                icon={CircleDollarSign}
                label="کرایه حمل"
                value={money(load.price)}
                highlighted
              />

              <InfoItem
                icon={MapPin}
                label="مسیر"
                value={`${load.origin} ← ${load.destination}`}
              />
            </div>
          </section>

          {/* Description */}
          <section
            className="
              rounded-2xl
              border border-border
              p-5
              sm:p-6
            "
          >
            <h2 className="text-base font-semibold text-text">توضیحات بار</h2>

            <p
              className="
                mt-3
                text-sm
                leading-7
                text-text-2
              "
            >
              {load.description}
            </p>
          </section>

          {/* Requirements */}
          <section
            className="
              rounded-2xl
              border border-border
              p-5
              sm:p-6
            "
          >
            <h2 className="text-base font-semibold text-text">
              شرایط و الزامات
            </h2>

            {load.requirements.length > 0 ? (
              <div className="mt-4 space-y-2.5">
                {load.requirements.map((requirement) => (
                  <div
                    key={requirement}
                    className="
                      flex
                      items-center
                      gap-2.5
                      rounded-lg
                      px-3.5
                      py-3
                      text-sm
                      text-text
                    "
                  >
                    <span
                      className="
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-primary-soft
                        text-primary
                      "
                    >
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    {requirement}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-text-2">
                برای این بار الزام خاصی ثبت نشده است.
              </p>
            )}
          </section>
        </div>

        {/* Action */}
        <aside className="lg:sticky lg:top-6 pb-20 lg:pb-0">
          <section
            className="
              rounded-2xl
              border border-border
              p-5
              shadow-sm
              sm:p-6
            "
          >
            <div className="border-b border-border pb-4">
              <span className="text-xs text-text-2">کرایه </span>

              <div className="mt-1 flex items-baseline gap-1.5">
                <strong className="text-xl font-bold text-primary">
                  {money(load.price)}
                </strong>

                <span className="text-xs text-text-2">تومان</span>
              </div>
            </div>

            {active ? (
              <div className="pt-4 flex flex-col w-full justify-center">
                <Button
                  variant={selected ? "secondary" : "primary"}
                  onClick={toggleBasket}
                >
                  {selected ? (
                    "✓ در سبد بار"
                  ) : (
                    <span className="flex justify-center items-center gap-2.5">
                      {" "}
                      <Plus /> افزودن به سبد
                    </span>
                  )}
                </Button>

                <p
                  className="
                    mt-3
                    text-center
                    text-xs
                    leading-6
                    text-text-2
                  "
                >
                  می‌توانید چند بار را به سبد اضافه کنید و سپس برای بار موردنظر
                  درخواست ارسال کنید.
                </p>
              </div>
            ) : (
              <div className="pt-4">
                <div
                  className="
                    rounded-lg
                    p-3
                    text-center
                  "
                >
                  <p className="text-sm font-medium text-text">
                    این بار دیگر موجود نیست
                  </p>

                  <p className="mt-1 text-xs text-text-2">
                    در صورت موجود شدن مجدد به شما اطلاع می‌دهیم.
                  </p>
                </div>

                <Link
                  to={`/notify/${load.id}`}
                  className="
                    mt-3
                    flex
                    h-10
                    w-full
                    items-center
                    justify-center
                    rounded-lg
                    border border-border
    
                    text-sm
                    font-medium
                    text-text
                    transition-colors
                  "
                >
                  اطلاع‌رسانی موجود شدن
                </Link>
              </div>
            )}
          </section>
        </aside>
      </div>
    </section>
  );
}

type InfoItemProps = {
  icon: React.ComponentType<{
    size?: number;
    className?: string;
  }>;
  label: string;
  value: string;
  highlighted?: boolean;
};

function InfoItem({
  icon: Icon,
  label,
  value,
  highlighted = false,
}: InfoItemProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        border-b
        border-border
        px-5
        py-4
        last:border-b-0
        sm:px-6
        sm:nth-[2n]:border-r
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-primary-soft
          text-primary
        "
      >
        <Icon size={18}  />
      </div>

      <div className="min-w-0">
        <span className="block text-xs text-text-2">
          {label}
        </span>
 <strong
          className={` 
            mt-0.5
            block
            truncate
            text-sm
            font-medium
            ${highlighted ? "text-primary" : "text-text"}
          `}
        >
          {value}
        </strong>
      </div>
    </div>
  );
}