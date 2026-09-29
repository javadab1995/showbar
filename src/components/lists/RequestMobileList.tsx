import { ChevronLeft } from "lucide-react";

import { StatusBadge } from "../ui/StatusBadge";

import type { AdminRequestListItem } from "../../types/request";
import VehicleLabel from "../labels/VehicleLabel";
import { toPersianDigits } from "../../helpers/number";

type Props = {
  requests: AdminRequestListItem[];
  onRequestClick: (id: string) => void;
  lastItemRef: (node: HTMLElement | null) => void;
};

export default function RequestMobileList({
  requests,
  onRequestClick,
  lastItemRef,
}: Props) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {requests.map((request, index) => (
        <button
          key={request.id}
          ref={index === requests.length - 1 ? lastItemRef : null}
          type="button"
          onClick={() => onRequestClick(request.id)}
          className="
            flex w-full items-center gap-3
            py-4 text-right
            transition-colors
            hover:bg-surface-2
          "
        >
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <span className="truncate text-sm font-semibold text-text">
                {request.driver.name}
              </span>

              <StatusBadge status={request.status} />
            </div>

            <div className="flex items-center gap-2 text-xs text-text-2">
              <VehicleLabel value={request.vehicle.vehicle_type}/>

              <span className="text-border">•</span>

              <span>{request.vehicle.plate ?? "بدون پلاک"}</span>
            </div>

            <div className="mt-2 flex items-center justify-between gap-3 text-xs">
              <span className="text-text-2">{toPersianDigits(request.load_count)} بار</span>

              <span className="truncate font-mono text-text-2">
                {request.tracking_code}
              </span>
            </div>
          </div>

          <ChevronLeft
            className="
              h-4 w-4
              shrink-0
              text-text-2
            "
          />
        </button>
      ))}
    </div>
  );
}
