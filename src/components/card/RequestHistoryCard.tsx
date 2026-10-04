
import { CalendarDays, MapPin } from "lucide-react";

import { STATUS_LABELS } from "../../types/trackRequest.type";
import type { RequestHistoryItem } from "../../types/trackRequest.type";
import { StatusBadge } from "../ui/StatusBadge";

type Props = {
  item: RequestHistoryItem;
};

const STATUS_STYLES = {
  confirmed:
    "border-green-500/30 bg-green-500/10 text-green-700",
  pending:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-700",
  rejected:
    "border-orange-500/30 bg-orange-500/10 text-orange-700",
} as const;

export default function RequestHistoryCard({ item }: Props) {
  const statusStyle =
    STATUS_STYLES[
      item.status as keyof typeof STATUS_STYLES
    ] ?? "border-border bg-surface text-text/60";

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-text/50">
            کد پیگیری
          </p>

          <p
            dir="ltr"
            className="mt-1 text-sm font-bold"
          >
            {item.tracking_code}
          </p>
        </div>

        <StatusBadge status={item.status} />
      </div>

      {/* Date */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-text/50">
        <CalendarDays size={14} />

        <span>
          {new Date(item.created_at).toLocaleDateString(
            "fa-IR",
          )}
        </span>
      </div>

      {/* Approved load */}
      {item.approved_load && (
        <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/5 p-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-green-700">
            <MapPin size={14} />
            بار تأییدشده
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>{item.approved_load.origin}</span>

            <span className="text-text/30">←</span>

            <span>{item.approved_load.destination}</span>
          </div>

          {item.approved_load.cargo && (
            <p className="mt-2 text-xs text-text/50">
              {item.approved_load.cargo}
            </p>
          )}

          {item.approved_load.loading_date && (
            <p className="mt-2 text-xs text-text/50">
              تاریخ بارگیری:{" "}
              {new Date(
                item.approved_load.loading_date,
              ).toLocaleDateString("fa-IR")}
            </p>
          )}
        </div>
      )}

      {/* Pending message */}
      {item.status === "pending" && (
        <p className="mt-4 rounded-xl bg-yellow-500/5 px-3 py-2.5 text-xs text-yellow-700">
          درخواست شما در حال بررسی است.
        </p>
      )}

      {/* Rejected message */}
      {item.status === "rejected" && (
        <p className="mt-4 rounded-xl bg-orange-500/5 px-3 py-2.5 text-xs text-orange-700">
          این درخواست تأیید نشده است.
        </p>
      )}
    </div>
  );
}

