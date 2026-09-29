import { TableColumn } from "../../types/table";
import type { AdminDriverListItem } from "../../types/drivers";

import VehicleLabel from "../labels/VehicleLabel";
import { StatusBadge } from "../ui/StatusBadge";
import { toPersianDigits } from "../../helpers/number";

type Props = {
  onView: (id: string) => void;
  onRequestView: (id: string) => void;
};

export function createDriverColumns({
  onView,
  onRequestView,
}: Props): TableColumn<AdminDriverListItem>[] {
  return [
    {
      key: "name",
      title: "راننده",
      render: (driver) => (
        <div>
          <div className="font-bold text-text">{driver.name}</div>

          <div className="mt-0.5 text-xs text-text-2">{driver.national_id}</div>
        </div>
      ),
    },

    {
      key: "phone",
      title: "موبایل",
      render: (driver) => (
        <a
          href={`tel:${driver.phone}`}
          dir="ltr"
          className="
            text-sm
            font-mono
            text-text-2
            transition-colors
            hover:text-primary
          "
        >
          {toPersianDigits(driver.phone)}
        </a>
      ),
    },

    {
      key: "vehicles",
      title: "خودروهای مرتبط",
      render: (driver) => {
        if (!driver.vehicles.length) {
          return <span className="text-sm text-text-2">بدون خودرو</span>;
        }

        return (
          <div className="flex flex-wrap gap-1.5">
            {driver.vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="
                  rounded-md
                  border border-border
                  bg-surface-2
                  px-2 py-1
                "
              >
                <div className="font-mono text-xs font-semibold text-text">
                  {vehicle.plate ?? vehicle.transit_code ?? "بدون شناسه"}
                </div>

                <div className="mt-0.5 text-[11px] text-text-2">
                  <VehicleLabel value={vehicle.vehicle_type} />
                </div>
              </div>
            ))}
          </div>
        );
      },
    },

    {
      key: "last_request",
      title: "آخرین درخواست",
      render: (driver) => {
        const request = driver.last_request;

        if (!request) {
          return <span className="text-sm text-text-2">بدون درخواست</span>;
        }

        return (
          <div>
            <button
              type="button"
              onClick={() => onRequestView(request.id)}
              className="
                font-mono
                text-sm
                font-bold
                text-primary
                transition-colors
                hover:text-primary-dark
                hover:underline
              "
            >
              {request.tracking_code}
            </button>

            <div className="mt-1 flex items-center gap-2 text-xs text-text-2">
              <span>
                {new Date(request.created_at).toLocaleDateString("fa-IR")}
              </span>

              <span className="text-border">·</span>

              <span>
                {request.vehicle?.plate ??
                  request.vehicle?.transit_code ??
                  "بدون خودرو"}
              </span>
            </div>
          </div>
        );
      },
    },

    {
      key: "status",
      title: "وضعیت",
      render: (driver) =>
        driver.last_request ? (
          <StatusBadge status={driver.last_request.status} />
        ) : (
          <span className="text-sm text-text-2">-</span>
        ),
    },

    {
      key: "actions",
      title: "عملیات",
      render: (driver) => (
        <button
          type="button"
          onClick={() => onView(driver.id)}
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
