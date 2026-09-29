import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { City } from "../../types/load";
import { searchCities } from "../../services/cityService";

type CitySearchProps = {
  label: string;
  countryCode: string;
  value: string;
  onChange: (value: string) => void;
  onCitySelect?: (city: City | null) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

export const CitySearch = ({
  label,
  countryCode,
  value,
  onChange,
  onCitySelect,
  error,
  disabled = false,
  placeholder = "نام شهر را جستجو کنید",
}: CitySearchProps) => {
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
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <label className="text-xs font-medium text-text">{label}</label>

      <div className="relative">
        <Search
          className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40"
          aria-hidden="true"
        />

        <input
          type="text"
          value={query}
          disabled={disabled || !countryCode}
          placeholder={countryCode ? placeholder : "ابتدا کشور را انتخاب کنید"}
          autoComplete="off"
          onChange={(event) => handleChange(event.target.value)}
          onFocus={() => {
            if (countryCode && query.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          className={`
            h-12
            w-full
            rounded-xl
            border
            bg-bg
            pr-11
            pl-10
            text-sm
            text-text
            outline-none
            transition
            placeholder:text-text/40
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${
              error
                ? "border-danger ring-4 ring-danger/10"
                : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
            }
          `}
        />

        {isLoading && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
        )}

        {!isLoading && query && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-text/40 transition hover:bg-surface-2 hover:text-text"
            aria-label="پاک کردن"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {isOpen && (
          <div className="absolute right-0 left-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-lg">
            {isLoading && (
              <div className="px-4 py-3 text-xs text-text/50">
                در حال جستجوی شهرها...
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="max-h-64 overflow-y-auto">
                {results.map((city) => (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => handleSelect(city)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-right transition hover:bg-surface-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-text">
                        {city.name}
                      </div>

                      {city.adminName && (
                        <div className="mt-0.5 truncate text-[11px] text-text/40">
                          {city.adminName}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!isLoading && results.length === 0 && query.trim().length >= 2 && (
              <div className="px-4 py-3 text-xs text-text/50">
                شهری با این نام پیدا نشد
              </div>
            )}
          </div>
        )}
      </div>

      {error && <span className="text-[10px] text-danger">{error}</span>}
    </div>
  );
};
