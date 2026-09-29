import { Search } from "lucide-react";

import type { RequestHistoryItem } from "../../../types/trackRequest.type";

import RequestHistoryCard from "../../card/RequestHistoryCard";

type Props = {
  history: RequestHistoryItem[];

  onNewSearch: () => void;
};

export default function RequestHistory({ history, onNewSearch }: Props) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold">سوابق درخواست‌ها</h2>

          <p className="mt-1 text-xs text-text/50">
            {history.length} درخواست ثبت شده
          </p>
        </div>

        <button
          type="button"
          onClick={onNewSearch}
          className="

            flex items-center gap-1.5

            text-xs

            font-medium

            text-primary

            transition

            hover:text-primary-dark

          "
        >
          <Search size={14} />
          جستجوی دوباره
        </button>
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl bg-bg px-4 py-6 text-center text-sm text-text/60">
          درخواستی برای این اطلاعات پیدا نشد.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <RequestHistoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
