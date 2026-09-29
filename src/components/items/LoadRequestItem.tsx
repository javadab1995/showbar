import { Link } from "react-router-dom";

import { StatusBadge } from "../ui/StatusBadge";

import type { DriverRequest } from "../../types/types";
import { toPersianDigits } from "../../helpers/number";

type LoadRequestItemProps = {
  request: DriverRequest;
};

export function LoadRequestItem({ request }: LoadRequestItemProps) {
 
  const driver = request.driver;
  const vehicle = request.vehicle;

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-b
        border-border
        px-5
        py-4
        last:border-b-0

        transition-colors
        hover:bg-primary-soft/30

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div
        className="
          min-w-0
          space-y-1
        "
      >
        <b
          className="
            block
            text-sm
            font-semibold
            text-text
          "
        >
          {driver.name}
        </b>

        <small
          className="
            block
            text-xs
            text-text-2
          "
        >
          {toPersianDigits(driver.phone)}
        </small>

        <small
          className="
            block
            text-xs
            text-text-2
          "
        >
          {vehicle.plate && (
            <>
              پلاک:{" "}
              <span className="font-medium text-text">{vehicle.plate}</span>
            </>
          )}

          {vehicle.plate && vehicle.transit_code && (
            <span className="mx-1.5 text-border">·</span>
          )}

          {vehicle.transit_code && (
            <span className="font-medium text-text">
              {vehicle.transit_code}
            </span>
          )}
        </small>
      </div>

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          gap-3

          sm:flex-col
          sm:items-end
        "
      >
        <StatusBadge status={request.status} />

        <Link
          to={`/admin/requests/${request.id}`}
          className="
            inline-flex
            h-8
            items-center
            justify-center
            rounded-md
            border
            border-border
            px-3
            text-xs
            font-medium
            text-text-2
            transition-colors
            hover:border-primary
            hover:text-primary
          "
        >
          مشاهده
        </Link>
      </div>
    </div>
  );
}
