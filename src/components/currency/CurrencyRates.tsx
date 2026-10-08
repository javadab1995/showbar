import { ChevronDown, DollarSign, RefreshCw, TrendingUp } from "lucide-react";

import { useState } from "react";

import CurrencyRateItem from "./CurrencyRateItem";
import CurrencyRatesSkeleton from "../skeleton/CurrencyRatesSkeleton";

import { useCurrencyRates } from "../../hooks/other/useCurrencyRates";



export default function CurrencyRates() {
  const [openModal, setOpenModal] = useState(false);

  const { rates, isLoading, isRefreshing, refresh, lastUpdated } =
    useCurrencyRates();


  return (
    <>
      <button
        type="button"
        onClick={() => setOpenModal((prev) => !prev)}
        className="
          group absolute -top-8 left-0
          flex items-center gap-1.5
          rounded-b-md
          border border-t-0 border-transparent
          bg-warning/80
          px-2.5 py-1
          text-xs font-medium text-orange-50
          backdrop-blur-md
          transition-colors
          hover:text-orange-100
        "
      >
        <DollarSign
          size={14}
          className="
            text-orange-50
            transition-transform
            duration-500
            group-hover:animate-ping
          "
        />

        <span>نرخ ارز</span>

        <ChevronDown
          size={13}
          className={`
            transition-transform duration-200
            ${openModal ? "rotate-180" : ""}
          `}
        />
      </button>

      {openModal && (
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
          <header
            className="
              flex items-center justify-between
              border-b border-border
              px-4 py-3.5
            "
          >
            <div className="flex items-center gap-2.5">
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

            <button
              type="button"
              onClick={() => refresh()}
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
          </header>

          <div className="px-4">
            {isLoading ? (
              <CurrencyRatesSkeleton />
            ) : rates.length > 0 ? (
              rates.map((rate) => (
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

          <footer
            className="
              border-t border-border
              bg-bg/50
              px-4 py-2.5
            "
          >
            <p className="text-[11px] text-text/45">
              {lastUpdated
                ? `آخرین بروزرسانی: ${lastUpdated.toLocaleTimeString("fa-IR")}`
                : "در انتظار دریافت نرخ‌ها"}
            </p>
          </footer>
        </section>
      )}
    </>
  );
}
