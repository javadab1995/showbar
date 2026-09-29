
import { Search } from "lucide-react";

import { Button } from "../../../components/buttons/Button";
import { STATUS_LABELS } from "../../../types/trackRequest.type";
import type { RequestDetails as RequestDetailsType } from "../../../types/trackRequest.type";

type Props = {
  request: RequestDetailsType;
  onNewSearch: () => void;
};

const STATUS_STYLES = {
  confirmed: "border-green-500/30 bg-green-500/10 text-green-700",
  pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-700",
  rejected: "border-orange-500/30 bg-orange-500/10 text-orange-700",
} as const;

const REQUEST_LOAD_STATUS_STYLES = {
  approved: "border-green-500/30 bg-green-500/10 text-green-700",
  pending: "border-yellow-500/30 bg-yellow-500/10 text-yellow-700",
  rejected: "border-orange-500/30 bg-orange-500/10 text-orange-700",
} as const;


export default function RequestDetails({
  request,
  onNewSearch,
}: Props) {
  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-text/50">کد پیگیری</p>

          <p dir="ltr" className="mt-1 text-base font-bold">
            {request.tracking_code}
          </p>
        </div>

        <span
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
            STATUS_STYLES[request.status as keyof typeof STATUS_STYLES] ??
            "border-border bg-surface text-text/60"
          }`}
        >
          {STATUS_LABELS[request.status] ?? request.status}
        </span>
      </div>

      {/* Created at */}
      <div className="mb-5 rounded-xl bg-bg px-4 py-3">
        <p className="text-xs text-text/50">تاریخ ثبت درخواست</p>

        <p className="mt-1 text-sm font-medium">
          {new Date(request.created_at).toLocaleDateString("fa-IR")}
        </p>
      </div>

      {/* Loads */}
      {request.loads && request.loads.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-bold">بارهای درخواست</h3>

          <div className="space-y-3">
            {request.loads.map((load) => (
              <div
                key={load.id}
                className={`rounded-xl border  bg-bg p-4  ${REQUEST_LOAD_STATUS_STYLES[
                        load.status as keyof typeof REQUEST_LOAD_STATUS_STYLES
                      ] ??
                      "border-border bg-surface text-text/60"
                    }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {load.origin}

                      <span className="mx-2 text-text/30">←</span>

                      {load.destination}
                    </p>

                    {load.cargo && (
                      <p className="mt-1 text-xs text-text/50">{load.cargo}</p>
                    )}
                  </div>

                  <span
                    className={`shrink-0 rounded-lg border px-2.5 py-1 text-xs font-medium ${
                      REQUEST_LOAD_STATUS_STYLES[
                        load.status as keyof typeof REQUEST_LOAD_STATUS_STYLES
                      ] ?? "border-border bg-surface text-text/60"
                    }`}
                  >
                    {STATUS_LABELS[load.status] ?? load.status}
                  </span>
                </div>

                {load.loading_date && (
                  <p className="mt-3 text-xs text-text/50">
                    تاریخ بارگیری:{" "}
                    {new Date(load.loading_date).toLocaleDateString("fa-IR")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New search */}
      <div className="mt-6 border-t border-border pt-5">
        <Button
          type="button"
          onClick={onNewSearch}
          className="
            flex h-11 w-full
            items-center justify-center gap-2
            rounded-xl
            border border-border
            bg-surface
            px-4
            text-sm
            font-medium
            text-text
            transition
            hover:border-primary
            hover:text-primary
          "
        >
          <Search size={16} />
          پیگیری درخواست دیگر
        </Button>
      </div>
    </div>
  );
}

