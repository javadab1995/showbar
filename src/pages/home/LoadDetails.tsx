 import {
   ArrowDownToLine,
   ArrowLeft,

  ArrowLeftRight,

  ArrowUpFromLine,

  CalendarDays,

  CircleDollarSign,
  Layers,
  MapPin,
  Plus,
  Scale,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";


import { useBasket } from "../../contexts/BasketContext";

import { StatusBadge } from "../../components/ui/StatusBadge";
import { Button } from "../../components/buttons/Button";
import GoToLoads from "../../components/buttons/GoToLoads";
import { useLoad } from "../../hooks/other/useLoad";

import { toPersianDate } from "../../helpers/date";
import { formatMoney } from "../../helpers/format";
import CurrencyFlag from "../../components/widgets/CurrencyFlag";
import { BORDER_OPTIONS, VEHICLE_OPTIONS } from "../../data/options";
import { toPersianDigits } from "../../helpers/number";
import { getExitBorderLabels } from "../../helpers/exitBorders";




const TRADE_ICONS = {
  export: ArrowUpFromLine,
  import: ArrowDownToLine,
  domestic: ArrowLeftRight,
} as const;


export function LoadDetails() {
  const { id } = useParams();
  const { basket, setBasket } = useBasket();



  const { data: load, isLoading, isError } = useLoad(id);
  



 



  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-24 animate-pulse rounded-2xl bg-border"
          />
        ))}
      </div>
    );
  }

  if (isError || !load) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-sm text-danger">دریافت اعلان‌ها با خطا مواجه شد.</p>
      </div>
    );
  }

   


  const vehicleLabel =
    VEHICLE_OPTIONS.find((option) => option.value === load.vehicle_type)
      ?.label ?? "سایر";



  const IconComponent =
    TRADE_ICONS[load.trade_type as keyof typeof TRADE_ICONS] ?? ArrowLeftRight;

    const selected = basket.includes(load.id);
    const active = load.status === "active";

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
      <GoToLoads to="/loads" />
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
            منتشر شده: {toPersianDate(load.created_at)}
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
                value={`${toPersianDigits(load.weight)} تن`}
              />

              <InfoItem icon={Truck} label="نوع ناوگان" value={vehicleLabel} />
              

           
              {load.exit_borders && (
                <InfoItem icon={Layers} label="مرز خروج" value={getExitBorderLabels(load.exit_borders)} />
              )}

              <InfoItem
                icon={CalendarDays}
                label="تاریخ بارگیری"
                value={toPersianDate(load.loading_date)}
              />

              <InfoItem
                icon={CircleDollarSign}
                label="کرایه حمل"
                value={formatMoney(load.price)}
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
              <span className="text-xs text-text-2 flex gap-6">
                <span>کرایه</span>
                <CurrencyFlag currency={load.currency} />
              </span>

              <div className=" flex  items-baseline gap-1.5 mt-2">
                <strong className="text-xl font-bold text-primary">
                  {formatMoney(load.price)}
                </strong>
                <span>{load.currency === "IRR" ? "تومان" : "دلار"}</span>
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
  value: string | null | undefined | string[];
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