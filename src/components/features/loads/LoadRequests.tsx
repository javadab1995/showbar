import { toPersianDigits } from "../../../helpers/number";
import { useLoadRequests } from "../../../hooks/admin/useLoadRequests";

import { LoadRequestItem } from "../../items/LoadRequestItem";

type LoadRequestsProps = {
  loadId: string;
};

export function LoadRequests({ loadId }: LoadRequestsProps) {
  const { data: requests = [], isLoading, isError } = useLoadRequests(loadId);

  return (
    <section
      className="
        h-fit
        overflow-hidden
        rounded-xl
        border
        border-border
        bg-surface
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-border
          px-5
          py-4
        "
      >
        <div>
          <h2
            className="
              text-sm
              font-semibold
              text-text
            "
          >
            درخواست‌های بار
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-text-2
            "
          >
            درخواست‌های ارسال‌شده برای این بار
          </p>
        </div>

        {!isLoading && (
          <span
            className="
              flex
              size-7
              items-center
              justify-center
              rounded-full
              bg-primary-soft
              text-sm
              font-semibold
              text-primary
            "
          >
            {toPersianDigits(requests.length)}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-3 p-5">
          <div
            className="
              h-16
              animate-pulse
              rounded-lg
              bg-surface-2
            "
          />

          <div
            className="
              h-16
              animate-pulse
              rounded-lg
              bg-surface-2
            "
          />
        </div>
      )}

      {isError && (
        <div
          className="
            px-5
            py-10
            text-center
            text-sm
            text-danger
          "
        >
          خطا در دریافت درخواست‌ها
        </div>
      )}

      {!isLoading && !isError && requests.length === 0 && (
        <div
          className="
              px-5
              py-12
              text-center
            "
        >
          <p
            className="
                text-sm
                text-text-2
              "
          >
            هنوز درخواستی برای این بار ثبت نشده است.
          </p>
        </div>
      )}

      {!isLoading &&
        !isError &&
        requests.map((request) => (
          <LoadRequestItem key={request.id} request={request} />
        ))}
    </section>
  );
}
