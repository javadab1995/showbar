import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpFromLine,
  CalendarDays,
  Scale,
  Trash2,
  Truck,
} from "lucide-react";

import { toPersianDigits } from "../../helpers/number";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import type { Load } from "../../types/load";
import { toPersianDate } from "../../helpers/date";
import { BORDER_OPTIONS, VEHICLE_OPTIONS } from "../../data/options";
import { formatMoney } from "../../helpers/formater";
import BorderLabel from "../labels/BorderLabel";
type BasketItemProps = {
  load: Load;
};

export default function BasketList({ load }: BasketItemProps) {
  const { basket, setBasket } = useBasket();

  const vehicleLabel =
    VEHICLE_OPTIONS.find((option) => option.value === load.vehicle_type)
      ?.label ?? "سایر";


  const removeItem = (id: string) => {
    setBasket(basket.filter((item) => item !== id));
  };

  return (
    <article
      className="
                relative
                px-4
                py-5
                sm:px-6
                sm:py-6
                lg:px-7"
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
            <span className="font-medium text-text">{load.cargo || "_"}</span>

            <span className="flex items-center gap-1.5">
              <Scale size={14} strokeWidth={1.8} />
              {toPersianDigits(load.weight)} تن
            </span>

            <span className="flex items-center gap-1.5">
              <Truck size={14} />
              {vehicleLabel}
            </span>

           
              <span className="flex items-center gap-1 ">
              {load.trade_type === "export" ? <ArrowUpFromLine size={16} /> : <ArrowDownToLine />}
                <BorderLabel value={load.exit_borders} />
              </span>
           

           

            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} strokeWidth={1.8} />
              <span className="text-primary-dark">
                {" "}
                {toPersianDate(load.loading_date)}
              </span>{" "}
              |<span className="text-warning">{load.loading_date}</span>
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
          <div className="text-right flex gap-1 items-center">
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
              {formatMoney(load.price, load.currency)}
            </strong>

            <span className="text-xs text-text-2">
              {load.currency === "USD" ? "دلار" : "تومان"}
            </span>
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
  );
}
