import { CurrencyRate } from "../../types/currency";


interface CurrencyRateItemProps {
  rate: CurrencyRate;
}

export default function CurrencyRateItem({ rate }: CurrencyRateItemProps) {
  const isPositive = rate.change24h > 0;
  const isNegative = rate.change24h < 0;

  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            flex size-9 shrink-0 items-center justify-center
            rounded-lg
            bg-primary/10
            text-sm font-semibold
            text-primary
          "
        >
          {rate.symbol}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-text">{rate.name}</p>

          <p className="mt-0.5 text-xs text-text/55">{rate.code}</p>
        </div>
      </div>

      <div className="text-left">
        <p className="text-sm font-semibold tabular-nums text-text">
          {rate.price.toLocaleString("fa-IR")}
        </p>

        <div className="mt-0.5 flex items-center justify-end gap-1">
          {isPositive && (
            <span className="text-xs font-medium text-accent">
              ↑ {Math.abs(rate.change24h)}٪
            </span>
          )}

          {isNegative && (
            <span className="text-xs font-medium text-primary-dark">
              ↓ {Math.abs(rate.change24h)}٪
            </span>
          )}

          {!isPositive && !isNegative && (
            <span className="text-xs text-text/45">بدون تغییر</span>
          )}
        </div>
      </div>
    </div>
  );
}
