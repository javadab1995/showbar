import { Truck } from "lucide-react";

type LoadResultSummaryProps = {
  count: number;
};

export function LoadResultSummary({ count }: LoadResultSummaryProps) {
  return (
    <div
      className="
        my-4 flex items-center gap-3
        rounded-xl border border-border
        bg-surface p-1.5
        transition-all
        hover:border-primary/30
      "
    >
      <div
        className="
          flex size-10 shrink-0
          items-center justify-center
          rounded-lg
          bg-primary-soft
          text-primary
        "
      >
        <Truck size={20} strokeWidth={2} />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-bold text-text">{count} بار یافت شد</span>

        <span className="text-xs text-text-2">براساس فیلترهای اعمال شده</span>
      </div>
    </div>
  );
}
