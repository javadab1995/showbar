import { getExitBorderLabels } from "../../helpers/exitBorders";
import { formatMoney } from "../../helpers/formater";
import { REQUEST_LOAD_STATUS_LABELS, RequestHistoryLoad } from "../../types/trackRequest.type";
import BorderLabel from "../labels/BorderLabel";

type Props = {
  load: RequestHistoryLoad;
};

export default function RequestLoadCard({ load }: Props) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      {/* Route */}
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span>{load.origin}</span>

        <span className="text-text/30">←</span>

        <span>{load.destination}</span>
      </div>

      {/* Details */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-xs sm:grid-cols-4">
        <div>
          <span className="text-text/50">نوع بار</span>

          <p className="mt-1 font-medium">{load.cargo || "-"}</p>
        </div>

        <div>
          <span className="text-text/50">وزن</span>

          <p className="mt-1 font-medium">
            {load.weight ? `${load.weight} تن` : "-"}
          </p>
        </div>

        <div>
          <span className="text-text/50">تاریخ بارگیری</span>

          <p className="mt-1 font-medium">
            {load.loading_date
              ? new Date(load.loading_date).toLocaleDateString("fa-IR")
              : "-"}
          </p>
        </div>

        <div>
          <span className="text-text/50">وضعیت درخواست</span>

          <p className="mt-1 font-medium text-primary">
            {REQUEST_LOAD_STATUS_LABELS[load.request_status] ??
              load.request_status}
          </p>
        </div>
      </div>

      {/* Border / Price */}
      {(load.exit_borders || load.price) && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-3 text-xs">
          {load.exit_borders && (
            <div>
              <span className="text-text/50">مرز خروج:</span>{" "}
              <BorderLabel value={getExitBorderLabels(load.exit_borders)} />
            </div>
          )}

          {load.price && (
            <div>
              <span className="text-text/50">کرایه:</span>{" "}
              <span className="font-medium">
                {formatMoney(load.price, load.currency)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
