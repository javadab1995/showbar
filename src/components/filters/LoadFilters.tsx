 import { motion } from "framer-motion";

import {
BORDER_OPTIONS,
  cargoOptions,
  cityOptions,
  fleetOptions,
  tonnageOptions,
} from "../../data/options";

import { MultiSelect } from "../selects/MultiSelect";
import { NearMeFilter } from "../filters/NearMeFilter";

import type {
  Coordinates,
  LoadFilters as LoadFiltersType,
} from "../../types/load";

type LoadFiltersProps = {
  filters: LoadFiltersType;

  onChange: <K extends keyof LoadFiltersType>(
    key: K,
    value: LoadFiltersType[K],
  ) => void;

  onNearMeChange: (
    enabled: boolean,
    coordinates: Coordinates | null,
  ) => void;

  onReset: () => void;
};

export function LoadFilters({
  filters,
  onChange,
  onNearMeChange,
  onReset,
}: LoadFiltersProps) {
  return (
    <div
      className="
        flex items-center gap-2.5
        overflow-x-auto flex-nowrap
        pb-2
      "
    >
      {/* Trade type */}
      <div
        className="
          relative flex h-9 shrink-0
          items-center rounded-full
          border border-border
          bg-surface p-1
        "
      >
        {[
          {
            value: "export",
            label: "صادرات",
          },
          {
            value: "import",
            label: "واردات",
          },
        ].map((item) => {
          const active =
            filters.tradeType === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                onChange(
                  "tradeType",
                  active
                    ? ""
                    : item.value as "export" | "import",
                )
              }
              className={` 
                relative z-10
                flex h-7 shrink-0
                items-center justify-center
                rounded-full px-4
                text-xs font-medium
                transition-colors duration-300
                ${
                  active
                    ? "text-surface"
                    : "text-text-2 hover:text-text"
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="activeTradeTab"
                  className="
                    absolute inset-0 -z-10
                    rounded-full
                    bg-primary-radial
                  "
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.4,
                  }}
                />
              )}

              {item.label}
            </button>
          );
        })}
      </div>

      {/* Cargo */}
      <select
        value={filters.cargo}
        onChange={(event) =>
          onChange("cargo", event.target.value)
        }
        className={` 
          filter-select shrink-0
          transition-all duration-300
          ${filters.cargo ? "bg-primary-radial text-surface" : ""}
        `}
      >
        <option value="">
          نوع بار
        </option>

        {cargoOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Tonnage */}
      <select
        value={filters.tonnage}
        onChange={(event) =>
          onChange("tonnage", event.target.value)
        }
        className={` 
          filter-select shrink-0
          transition-all duration-300
          ${filters.tonnage ? "bg-primary-radial text-surface" : ""}
        `}
      >
        <option value="">
          تناژ
        </option>

        {tonnageOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
 {/* Fleet */}
      <select
        value={filters.fleetType}
        onChange={(event) =>
          onChange("fleetType", event.target.value)
        }
        className={` 
          filter-select shrink-0
          transition-all duration-300
          ${filters.fleetType ? "bg-primary-radial text-surface" : ""}
        `}
      >
        <option value="">
          ناوگان
        </option>

        {fleetOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Border */}
      <div className="shrink-0">
        <MultiSelect
          options={BORDER_OPTIONS}
          value={filters.borders}
          onChange={(value) =>
            onChange("borders", value)
          }
          placeholder="مرز خروج"
        />
      </div>

      {/* Origin */}
      <select
        value={filters.origin}
        onChange={(event) =>
          onChange("origin", event.target.value)
        }
        className={` 
          filter-select shrink-0
          transition-all duration-300
          ${filters.origin ? "bg-primary-radial text-surface" : ""}
        `}
      >
        <option value="">
          مبدأ
        </option>

        {cityOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Destination */}
      <select
        value={filters.destination}
        onChange={(event) =>
          onChange("destination", event.target.value)
        }
        className={` 
          filter-select shrink-0
          transition-all duration-300
          ${filters.destination ? "bg-primary-radial text-surface" : ""}
        `}
      >
        <option value="">
          مقصد
        </option>

        {cityOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {/* Near me */}
      <div className="shrink-0">
        <NearMeFilter
          enabled={filters.nearest}
          onChange={onNearMeChange}
        />
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="
          h-9 shrink-0 rounded-full
          border border-border
          px-3 py-1
          text-sm text-text-2
          transition hover:text-danger
        "
      >
        پاک کردن فیلترها
      </button>
    </div>
  );
}