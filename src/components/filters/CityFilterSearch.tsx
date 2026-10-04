import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { City } from "../../types/load";
import { searchCities } from "../../services/cityService";

type FilterCitySearchProps = {
  countryCode: string;
  value: string;
  onChange: (value: string) => void;
  onCitySelect?: (city: City | null) => void;
  placeholder?: string;
};

export function FilterCitySearch({
  countryCode,
  value,
  onChange,
  onCitySelect,
  placeholder = "شهر",
}: FilterCitySearchProps) {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  useEffect(() => {
    setQuery(value);
  }, [value]);

  /**
   * محاسبه موقعیت dropdown
   * چون dropdown fixed است، موقعیت input را نسبت به viewport می‌گیریم.
   */
  const updateDropdownPosition = () => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();

    setDropdownPosition({
      top: rect.bottom + 4,
      right: window.innerWidth - rect.right,
    });
  };

  /**
   * بستن dropdown با کلیک بیرون
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * وقتی dropdown باز است، با اسکرول یا resize
   * موقعیت آن را نسبت به input به‌روزرسانی می‌کنیم.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handlePositionUpdate = () => {
      updateDropdownPosition();
    };

    window.addEventListener("resize", handlePositionUpdate);

    // true باعث می‌شود اسکرول parentهای مختلف هم گرفته شود.
    window.addEventListener("scroll", handlePositionUpdate, true);

    return () => {
      window.removeEventListener("resize", handlePositionUpdate);
      window.removeEventListener("scroll", handlePositionUpdate, true);
    };
  }, [isOpen]);

  /**
   * جستجوی شهر با debounce
   */
  useEffect(() => {
    if (!countryCode || query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setIsLoading(true);

        const cities = await searchCities({
          countryCode,
          query,
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setResults(cities);
        setIsOpen(true);

        // بعد از دریافت نتایج، دوباره موقعیت را تنظیم می‌کنیم.
        updateDropdownPosition();
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("City search error:", error);

        setResults([]);
        setIsOpen(true);

        updateDropdownPosition();
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }, 400);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [countryCode, query]);

  const handleChange = (newValue: string) => {
    setQuery(newValue);
    onChange(newValue);

    // متن شهر تغییر کرده، پس انتخاب قبلی دیگر معتبر نیست.
    onCitySelect?.(null);

    if (countryCode && newValue.trim().length >= 2) {
      updateDropdownPosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = (city: City) => {
    setQuery(city.name);
    onChange(city.name);
    onCitySelect?.(city);

    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onChange("");
    onCitySelect?.(null);

    setResults([]);
    setIsOpen(false);
  };

  const handleFocus = () => {
    if (!countryCode || query.trim().length < 2) {
      return;
    }

    updateDropdownPosition();
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className="shrink-0">
      {/* Filter */}
      <div
        className={`
          relative
          z-10
          flex
          h-7
          shrink-0
          items-center
          justify-center
          rounded-full
          px-4
          text-xs
          font-medium
          transition-colors
          duration-300
          ${value ? "bg-primary-radial text-surface" : "bg-surface text-text-2"}
        `}
      >
        <Search className="ml-1.5 h-3.5 w-3.5 shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={!countryCode}
          placeholder={countryCode ? placeholder : "ابتدا کشور"}
          autoComplete="off"
          onChange={(event) => handleChange(event.target.value)}
          onFocus={handleFocus}
          className="
            min-w-17.5
            max-w-32.5
            bg-transparent
            text-xs
            font-medium
            text-inherit
            outline-none
            placeholder:text-text-2
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        />

        {isLoading && (
          <div
            className="
              mr-1
              h-3
              w-3
              animate-spin
              rounded-full
              border
              border-current/20
              border-t-current
            "
          />
        )}

        {!isLoading && query && (
          <button
            type="button"
            onClick={handleClear}
            className="
              mr-1
              rounded-full
              p-0.5
              transition
              hover:bg-black/5
            "
            aria-label="پاک کردن شهر"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: dropdownPosition.top,
            right: dropdownPosition.right,
          }}
          className="
            z-40
            w-40
            overflow-hidden
            rounded-xl
            border
            border-border
            bg-surface
            text-text
            shadow-xl
          "
        >
          {/* Loading */}
          {isLoading && (
            <div className="px-3 py-2.5 text-xs text-text/50">
              در حال جستجو...
            </div>
          )}

          {/* Results */}
          {!isLoading && results.length > 0 && (
            <div className="max-h-60 overflow-y-auto">
              {results.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleSelect(city)}
                  className="
                    flex
                    w-full
                    items-center
                    px-3
                    py-2.5
                    text-right
                    transition
                    hover:bg-surface-2
                  "
                >
                  <div className="min-w-0">
                    <div className="truncate text-xs font-medium">
                      {city.name}
                    </div>

                    {city.adminName && (
                      <div className="mt-0.5 truncate text-[10px] text-text/40">
                        {city.adminName}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Empty */}
          {!isLoading && results.length === 0 && query.trim().length >= 2 && (
            <div className="px-3 py-2.5 text-xs text-text/50">
              شهری پیدا نشد
            </div>
          )}
        </div>
      )}
    </div>
  );
}
