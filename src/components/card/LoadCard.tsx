import {
  ArrowLeft,
  CalendarDays,
  Eye,
  MoreVertical,
  Plus,
  Scale,
  Trash2,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Load } from "../../types";
import { money } from "../../data/mock";
import { StatusBadge } from "../ui/StatusBadge";
import DropdownMenu from "../dropdown/DropdownMenu";
import { Button } from "../buttons/Button";


type LoadCardProps = {
  load: Load;
  selected: boolean;
  onToggle: () => void;
};

export function LoadCard({
  load,
  selected,
  onToggle,
}: LoadCardProps) {
  const unavailable = load.status !== "فعال";

  return (
    <article className="group relative py-2 ">
      <div className="absolute -left-6 -right-6 bottom-0 h-px bg-border" />
      <div className="flex justify-between items-center gap-6 ">
        <div className="md:min-w-1/3 ">
          {/* Route */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="min-w-0">
              <strong className="block truncate  md:text-base text-sm font-semibold text-primary-dark">
                {load.origin}
              </strong>
            </div>

            <ArrowLeft size={14} className="shrink-0 text-primary/50 mt-1" />

            <div className="min-w-0">
              <strong className="block truncate md:text-base text-sm font-semibold text-primary-dark">
                {load.destination}
              </strong>
            </div>
          </div>

          {/* Load mobile information */}
          <div className="hidden shrink-0 items-center gap-5 text-sm text-text-2 md:flex flex-wrap mt-2">
            <span className="font-medium text-text ">{load.cargo}</span>

            <span className="flex items-center gap-1.5">
              <Scale size={14} />
              {load.weight} تن
            </span>

            <span className="flex items-center gap-1.5">
              <Truck size={14} />
              {load.vehicle}
            </span>

            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {load.date}
            </span>
          </div>

          <div className=" shrink-0 items-center gap-2 text-sm text-text-2 flex flex-wrap md:hidden mt-2">
            <span className="font-medium text-text ">{load.cargo}</span>
            <span className="flex items-center ">{load.weight} تن</span>
            <span className="flex items-center ">{load.vehicle}</span>
            <span className="flex items-center ">{load.date}</span>
          </div>
        </div>
        {/* Price + Status */}
        <div className=" shrink-0 flex-col gap-1 flex md:min-w-42">
          <strong className="md:text-sm text-xs font-bold ">
            {money(load.price)}
          </strong>

          <StatusBadge status={load.status} />
        </div>

        {/* Actions */}

        <div className="flex md:hidden items-center gap-3">
          <DropdownMenu
             items={[
    {
      label: "مشاهده جزئیات",
      icon: Eye,
      onClick: () => {
        window.location.href = `/loads/${load.id}`;
      },
    },

    ...(unavailable
      ? []
      : [
          {
            label: selected ? "حذف از سبد" : "افزودن به سبد",
            icon: selected ? Trash2 : Plus,
            onClick: onToggle,
            danger: selected,
          },
        ]),
  ]}
          />
        </div>

        <div className="hidden md:flex shrink-0 items-center gap-3 md:min-w-52">
          <Link
            to={`/loads/${load.id}`}
            className="
              text-xs
              font-medium
              border
              border-border/60
              rounded-md p-1
              text-text-2
              transition-colors
              hover:text-text
              hover:border-border
              
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
                <span className="flex gap-1 text-sm items-center font-bold">
                  <Plus className="font-bold" size={16} /> افزودن به سبد{" "}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}