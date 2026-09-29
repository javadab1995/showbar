
;
import { toPersianDigits } from "../../helpers/number";
import {  AdminRequestListItem } from "../../types/request";
import { TableColumn } from "../../types/table";
import VehicleLabel from "../labels/VehicleLabel";

import { StatusBadge } from "../ui/StatusBadge";

type Props = {
  onView: (id: string) => void;
};

export function createRequestColumns({
  onView,
}: Props): TableColumn<AdminRequestListItem>[] {
  return [
    {
      key: "vehicle",
      title: "خودرو",
      render: (request) => (
        <div>
          <div className="font-bold font-mono text-text">
            {request.vehicle.plate || null}
          </div>

          <div className="mt-0.5 text-xs font-mono text-text-2">
            {request.vehicle.transit_code|| null} ·  <VehicleLabel   value= {request.vehicle.vehicle_type} />
          </div>
        </div>
      ),
    },

    {
      key: "driver",
      title: "راننده",
      render: (request) => (
        <div>
          <div className="font-medium text-text">{request.driver.name}</div>

          <div className="mt-0.5 text-xs font-mono text-text-2">
            {toPersianDigits(request.driver.phone)}
          </div>
        </div>
      ),
    },

    

    {
      key: "created_at",
      title: "تاریخ",
      render: (request) => (
        <span className="text-sm font-mono text-text-2">
          {new Date(request.created_at).toLocaleDateString("fa-IR")}
        </span>
      ),
    },

    {
      key: "status",
      title: "وضعیت",
      render: (request) => <StatusBadge status={request.status} />,
    },

    {
      key: "actions",
      title: "عملیات",
      render: (request) => (
        <button
          type="button"
          onClick={() => onView(request.id)}
          className="
            inline-flex items-center justify-center
            rounded-md
            border border-border
            bg-surface-2
            px-3 py-1.5
            text-xs font-semibold
            text-text
            transition-colors
            hover:bg-border
          "
        >
          بررسی
        </button>
      ),
    },
  ];
}
