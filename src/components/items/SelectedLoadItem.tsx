import { ArrowLeft, CalendarDays, Scale, Truck } from "lucide-react";

import { Link } from "react-router-dom";

import type { Load } from "../../types/load";
import { toPersianDate } from "../../helpers/date";
import { VEHICLE_OPTIONS } from "../../data/options";
import { toPersianDigits } from "../../helpers/number";

type SelectedLoadItemProps = {
  load: Load;
  isLast: boolean;
};

export default function SelectedLoadItem({
  load,
  isLast,
}: SelectedLoadItemProps) {

     const vehicleLabel =
        VEHICLE_OPTIONS.find((option) => option.value === load.vehicle_type)
          ?.label ?? "سایر";
    
  return (
    <div
      className={`
        relative
        px-5
        py-4
        sm:px-6
        ${!isLast ? "border-b border-border" : ""}
      `}
    >
      <Link
        to={`/loads/${load.id}`}
        className="
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-primary-dark
        "
      >
        <span>{load.origin}</span>

        <ArrowLeft size={14} className="text-primary/50" />

        <span>{load.destination}</span>
      </Link>

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
        <span className="font-medium text-text">{load.cargo || "_"}</span>

        <span className="flex items-center gap-1.5">
          <Scale size={14} strokeWidth={1.8} />
          {toPersianDigits(load.weight)} تن
        </span>

        <span className="flex items-center gap-1.5">
          <Truck size={14} />
          {vehicleLabel}
        </span>

      

        <span className="flex items-center gap-1.5">
          <CalendarDays size={14} strokeWidth={1.8} />
          <span className="text-primary-dark">
           
            {toPersianDate(load.loading_date)}
          </span>
          |<span className="text-warning">{load.loading_date}</span>
        </span>
      </div>
    </div>
  );
}
