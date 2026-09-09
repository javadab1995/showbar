import {
  ChevronDown,
  DollarSign,
  PackageOpen,
  PanelTopOpen,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import CurrencyRateItem from "./CurrencyRateItem";
import type { CurrencyRate } from "../../types/currency";
import CurrencyRatesSkeleton from "../skeleton/CurrencyRatesSkeleton";
import { useState } from "react";

const mockRates: CurrencyRate[] = [
  {
    code: "USD",
    symbol: "$",
    name: "دلار آمریکا",
    price: 226700,
    change24h: 0.35,
  },
  {
    code: "EUR",
    symbol: "€",
    name: "یورو",
    price: 263400,
    change24h: 0.18,
  },
  {
    code: "AED",
    symbol: "د.إ",
    name: "درهم امارات",
    price: 61700,
    change24h: -0.12,
  },
  {
    code: "GBP",
    symbol: "£",
    name: "پوند انگلیس",
    price: 305800,
    change24h: 0.27,
  },
];

interface CurrencyRatesProps {
  rates?: CurrencyRate[];
  isLoading?: boolean;
  isRefreshing?: boolean;
  lastUpdated?: Date | null;
  onRefresh?: () => void;
}

export default function CurrencyRates({
  rates = [],
  isLoading = false,
  isRefreshing = false,
  lastUpdated = null,
  onRefresh,
}: CurrencyRatesProps) {
  const [openmodal, setOpenModal] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal((prev) => !prev)}
        className=" group
    absolute -top-8 left-0
    flex items-center gap-1.5
    rounded-b-md
    border border-t-0 border-border
    bg-background/80
    px-2.5 py-1
    text-xs font-medium text-text
    backdrop-blur-md
    transition-colors
    hover:text-primary
  "
      >
        <DollarSign size={14} className="text-primary group-hover:scale-105 transition-transform ease-in-out duration-200" />
        <span>نرخ ارز</span>

        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${
            openmodal ? "rotate-180" : ""
          }`}
        />
      </button>

      {openmodal && (
        <section
          className="
        w-full
    overflow-hidden
    rounded-md
    border border-border
    bg-primary-soft/50
    backdrop-blur-md
    shadow-sm
    
      

      "
        >
          {/* Header */}
          <header
            className="
          flex items-center justify-between
          border-b border-border
          px-4 py-3.5
        "
          >
            <div className="flex items-center gap-2.5 min-w-36">
              <div
                className="
              flex size-9 items-center justify-center
              rounded-lg
              bg-primary/10
              text-primary
            "
              >
                <TrendingUp size={18} strokeWidth={1.8} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-text">نرخ ارز</h3>

                <p className="mt-0.5 text-xs text-text/50">نرخ لحظه‌ای بازار</p>
              </div>
            </div>

            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={isRefreshing}
                aria-label="بروزرسانی نرخ ارز"
                className="
              flex size-8 items-center justify-center
              rounded-lg
              text-text/50
              transition
              hover:bg-bg
              hover:text-primary
              disabled:pointer-events-none
              disabled:opacity-40
            "
              >
                <RefreshCw
                  size={16}
                  className={isRefreshing ? "animate-spin" : ""}
                />
              </button>
            )}
          </header>

          {/* Content */}

          <div className="px-4">
            {isLoading ? (
              <CurrencyRatesSkeleton />
            ) : mockRates.length > 0 ? (
              mockRates.map((rate) => (
                <CurrencyRateItem key={rate.code} rate={rate} />
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-text/50">
                  اطلاعات نرخ ارز در دسترس نیست
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer
            className="
          border-t border-border
          bg-bg/50
          px-4 py-2.5
        "
          >
            <p className="text-[11px] text-text/45">
              {lastUpdated
                ? `آخرین بروزرسانی: ${formatRelativeTime(lastUpdated)}`
                : "در انتظار دریافت نرخ‌ها"}
            </p>
          </footer>
        </section>
      )}
    </>
  );
}
