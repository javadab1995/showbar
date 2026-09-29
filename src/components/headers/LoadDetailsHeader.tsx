import { ArrowRight, Pencil } from "lucide-react";

import { Link } from "react-router-dom";

import { StatusBadge } from "../ui/StatusBadge";

import type { Load } from "../../types/load";
import { toPersianDigits } from "../../helpers/number";
import CargoTypeLabel from "../labels/CargoTypeLabel";
import VehicleLabel from "../labels/VehicleLabel";
import BorderLabel from "../labels/BorderLabel";
import GoToLoads from "../buttons/GoToLoads";
import { getExitBorderLabels } from "../../helpers/exitBorders";

type LoadDetailsHeaderProps = {
  load: Load;
};

export function LoadDetailsHeader({ load }: LoadDetailsHeaderProps) {
  return (
    <>
     <GoToLoads to="/admin/loads" />

      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="min-w-0">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            <h1
              className="
                text-xl
                font-bold
                text-text
                sm:text-2xl
              "
            >
              {load.origin}

              <span className="mx-2 text-text-2">←</span>

              {load.destination}
            </h1>

            <StatusBadge status={load.status} />
          </div>

          <p
            className="
              mt-2
              text-sm
              text-text-2 flex items-center 
            "
          >
            <CargoTypeLabel value={load.cargo_type} name={load.cargo} />
            <span className="mx-2 ">·</span>
            {toPersianDigits(load.weight)} تن
            <span className="mx-2 ">·</span>
            <VehicleLabel value={load.vehicle_type} />
            <span className="mx-2 ">·</span>
            {load.exit_borders && <BorderLabel value={getExitBorderLabels(load.exit_borders)} />}
          </p>
        </div>

        <Link
          to={`/admin/loads/${load.id}/edit`}
          className="
            inline-flex
            h-10
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-border
            bg-surface
            px-4
            text-sm
            font-medium
            text-text
            transition-colors
            hover:border-primary
            hover:text-primary
          "
        >
          <Pencil size={16} />
          ویرایش
        </Link>
      </div>
    </>
  );
}
