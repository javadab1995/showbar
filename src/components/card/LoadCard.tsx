import {
  ArrowLeft,
  CalendarDays,
  Eye,
  Plus,
  Scale,
  Trash2,
  Truck,
  ArrowUpFromLine,
  ArrowDownToLine,
  ArrowLeftRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { StatusBadge } from "../ui/StatusBadge";
import DropdownMenu from "../dropdown/DropdownMenu";
import { Button } from "../buttons/Button";

import { Load } from "../../types/load";
import { BORDER_OPTIONS, VEHICLE_OPTIONS } from "../../data/options";
import { toPersianDate } from "../../helpers/date";

import { toPersianDigits } from "../../helpers/number";
import { formatMoney } from "../../helpers/format";
import { getExitBorderLabel, getExitBorderLabels } from "../../helpers/exitBorders";

type LoadCardProps = {
  load: Load;
  selected: boolean;
  onToggle: () => void;
};

const TRADE_ICONS = {
  export: ArrowUpFromLine,
  import: ArrowDownToLine,
  domestic: ArrowLeftRight,
} as const;

export function LoadCard({ load, selected, onToggle }: LoadCardProps) {
  const navigate = useNavigate();

  const unavailable = load.status !== "active";

  const vehicleLabel =
    VEHICLE_OPTIONS.find((option) => option.value === load.vehicle_type)
      ?.label ?? "سایر";
  
 const borderLabel = getExitBorderLabel(load.exit_borders);
  const IconComponent =
    TRADE_ICONS[load.trade_type as keyof typeof TRADE_ICONS] ?? ArrowLeftRight;

  return (
    <article className="group relative py-2">
      <div className="absolute -left-6 -right-6 bottom-0 h-px bg-border" />

      <div className="flex items-center justify-between gap-6">
        {/* Route + information */}
        <div className="min-w-0 md:min-w-1/3">
          {/* Route */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="min-w-0">
              <strong className="block truncate text-sm font-semibold text-primary-dark md:text-base">
                {load.origin}
              </strong>
            </div>

            <ArrowLeft size={14} className="mt-1 shrink-0 text-primary/50" />

            <div className="min-w-0">
              <strong className="block truncate text-sm font-semibold text-primary-dark md:text-base">
                {load.destination}
              </strong>
            </div>
          </div>

          {/* Desktop information */}
          <div className="mt-2 shrink-0 flex-wrap items-center gap-5 text-sm text-text-2 md:flex">
            <span className="font-medium text-text">{load.cargo ?? "-"}</span>

            <span className="flex items-center  gap-1.5">
              <Scale size={14} />
              {toPersianDigits(load.weight)} تن
            </span>

            <span className="flex items-center gap-1.5">
              <Truck size={14} />
              {vehicleLabel}
            </span>

            <span className="flex items-center gap-1">
              <IconComponent size={16} />
              {borderLabel}
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              <span className=" ">
                {toPersianDate(load.loading_date)}
                ----
                {load.loading_date}
              </span>
            </span>
          </div>
        </div>

        {/* Price + Status */}
        <div className="flex shrink-0 flex-col gap-1 md:min-w-42">
          <strong className="text-xs font-bold md:text-sm">
            {formatMoney(load.price)}
          </strong>

          <StatusBadge status={load.status} />
        </div>

        {/* Mobile actions */}
        <div className="flex shrink-0 items-center gap-3 md:hidden">
          <DropdownMenu
            items={[
              {
                label: "مشاهده جزئیات",
                icon: Eye,
                onClick: () => navigate(`/loads/${load.id}`),
              },

              ...(!unavailable
                ? [
                    {
                      label: selected ? "حذف از سبد" : "افزودن به سبد",
                      icon: selected ? Trash2 : Plus,
                      onClick: onToggle,
                      danger: selected,
                    },
                  ]
                : []),
            ]}
          />
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex md:min-w-52">
          <Link
            to={`/loads/${load.id}`}
            className="
              rounded-md
              border
              border-border/60
              p-1
              text-xs
              font-medium
              text-text-2
              transition-colors
              hover:border-border
              hover:text-text
            "
          >
            جزئیات
          </Link>

          {!unavailable && (
            <Button
              variant={selected ? "secondary" : "primary"}
              onClick={onToggle}
            >
              {selected ? (
                "✓ افزوده شد"
              ) : (
                <span className="flex items-center gap-1 text-sm font-bold">
                  <Plus size={16} />
                  افزودن به سبد
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
