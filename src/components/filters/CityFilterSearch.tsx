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

  useEffect(() => {
    setQuery(value);
  }, [value]);

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

        if (!controller.signal.aborted) {
          setResults(cities);
          setIsOpen(true);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("City search error:", error);
          setResults([]);
          setIsOpen(true);
        }
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

    // متن شهر عوض شده، پس ID قبلی دیگر معتبر نیست.
    onCitySelect?.(null);
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

  return (
    <div ref={containerRef} className="relative shrink-0">
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
          type="text"
          value={query}
          disabled={!countryCode}
          placeholder={countryCode ? placeholder : "ابتدا کشور"}
          autoComplete="off"
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => {
            if (countryCode && query.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
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
          <div className="mr-1 h-3 w-3 animate-spin rounded-full border border-current/20 border-t-current" />
        )}

        {!isLoading && query && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-1 rounded-full p-0.5 transition hover:bg-black/5"
            aria-label="پاک کردن شهر"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+6px)]
            z-100
            w-52
            overflow-hidden
            rounded-xl
            border
            border-border
            bg-surface
            text-text
            shadow-xl
          "
        >
          {isLoading && (
            <div className="px-3 py-2.5 text-xs text-text/50">
              در حال جستجو...
            </div>
          )}

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
