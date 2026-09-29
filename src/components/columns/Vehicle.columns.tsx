import { TableColumn } from "../../types/table";
import { vehiclesItem } from "../../types/vehicles";

import VehicleLabel from "../labels/VehicleLabel";
import { StatusBadge } from "../ui/StatusBadge";

type Props = {
  onView: (id: string) => void;
};

export function createVehicleColumns({
  onView,
}: Props): TableColumn<vehiclesItem>[] {
  return [
    {
      key: "vehicle",
      title: "خودرو",

      render: (vehicle) => (
        <div>
          <div className="font-bold font-mono text-text">
            {vehicle.identifier_type === "PLATE"
              ? vehicle.plate
              : vehicle.transit_code}
          </div>

          <div className="mt-0.5 text-xs text-text-2">
            {vehicle.identifier_type === "PLATE"
              ? "پلاک خودرو"
              : "شناسه ترانزیت"}

            {" · "}

            <VehicleLabel value={vehicle.vehicle_type} />
          </div>
        </div>
      ),
    },

    {
      key: "identifier",
      title: "نوع شناسه",

      render: (vehicle) => (
        <span className="font-mono text-sm text-text-2">
          {vehicle.identifier_type === "PLATE"
            ? "پلاک شهربانی"
            : "پلاک ترانزیت بین‌المللی"}
        </span>
      ),
    },

    {
      key: "created_at",
      title: "تاریخ",

      render: (vehicle) => (
        <span className="text-sm font-mono text-text-2">
          {new Date(vehicle.created_at).toLocaleDateString("fa-IR")}
        </span>
      ),
    },

    {
      key: "status",
      title: "وضعیت",

      render: (vehicle) => <StatusBadge status={vehicle.status} />,
    },

    {
      key: "actions",
      title: "عملیات",

      render: (vehicle) => (
        <button
          type="button"
          onClick={() => onView(vehicle.id)}
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
