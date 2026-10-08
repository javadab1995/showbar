import { motion } from "framer-motion";

import {
  BORDER_OPTIONS,
  cargoOptions,
  countryOptions,
  fleetOptions,
  tonnageOptions,
} from "../../data/options";

import { MultiSelect } from "../selects/MultiSelect";
import { NearMeFilter } from "../filters/NearMeFilter";


import type {
  Coordinates,
  LoadFilters as LoadFiltersType,
  TradeType,
} from "../../types/load";
import { FilterCitySearch } from "./CityFilterSearch";
import { CustomSelect } from "../inputs/CustomSelect";

type LoadFiltersProps = {
  filters: LoadFiltersType;

  onChange: <K extends keyof LoadFiltersType>(
    key: K,
    value: LoadFiltersType[K],
  ) => void;

  onNearMeChange: (enabled: boolean, coordinates: Coordinates | null) => void;

  onReset: () => void;
};

export function LoadFilters({
  filters,
  onChange,
  onNearMeChange,
  onReset,
}: LoadFiltersProps) {

  const handleOriginCountryChange = (countryCode: string) => {
    onChange("origin_country_code", countryCode);
    onChange("origin", "");
    onChange("origin_city_geoname_id", undefined);
  };

  const handleDestinationCountryChange = (countryCode: string) => {
    onChange("destination_country_code", countryCode);
    onChange("destination", "");
    onChange("destination_city_geoname_id", undefined);
  };



  return (
    <div
      className="
        flex
        items-center
        gap-2.5
        overflow-x-auto
        flex-nowrap
        pb-2
        scrollbar-thin scrollbar-thumb-primary-soft "
    >
      {/* Trade type */}
      <div
        className="
          relative
          flex
          h-9
          shrink-0
          items-center
          rounded-full
          border
          border-border
          bg-surface
          p-1
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
          {
            value: "domestic",
            label: "داخلی",
          },
        ].map((item) => {
          const active = filters.tradeType === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                onChange("tradeType", active ? "" : (item.value as TradeType))
              }
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
                ${active ? "text-surface" : "text-text-2 hover:text-text"}
              `}
            >
              {active && (
                <motion.div
                  layoutId="activeTradeTab"
                  className="
                    absolute
                    inset-0
                    -z-10
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
      <CustomSelect
        value={filters.cargo}
        options={cargoOptions}
        placeholder="نوع بار"
        onChange={(value) => onChange("cargo", value)}
      />

      {/* Tonnage */}
      <CustomSelect
        value={filters.tonnage}
        options={tonnageOptions}
        placeholder="تناژ"
        onChange={(value) => onChange("tonnage", value)}
      />

      {/* Fleet */}
      <CustomSelect
        value={filters.fleetType}
        options={fleetOptions}
        placeholder="ناوگان"
        onChange={(value) => onChange("fleetType", value)}
      />
      {/* Origin */}
      <div
        className="
          flex
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-border
          
          p-1
        "
      >
        <select
          value={filters.origin_country_code ?? ""}
          onChange={(event) => handleOriginCountryChange(event.target.value)}
          className="
            h-7
            
            border-l border-border
            bg-transparent
            px-1
           
            text-xs
            text-text
            outline-none
          "
        >
          <option value="">کشور مبدأ</option>

          {countryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FilterCitySearch
          countryCode={filters.origin_country_code ?? ""}
          value={filters.origin}
          onChange={(value) => onChange("origin", value)}
          onCitySelect={(city) => onChange("origin_city_geoname_id", city?.id)}
          placeholder="شهر مبدأ"
        />
      </div>

      {/* Destination */}
      <div
        className="
          flex
          shrink-0
          items-center
          gap-1.5
          rounded-full
          border
          border-border
          bg-surface
          p-1
        "
      >
        <select
          value={filters.destination_country_code ?? ""}
          onChange={(event) =>
            handleDestinationCountryChange(event.target.value)
          }
          className="
            h-7
            
            border-l border-border
            bg-transparent
            px-1
           
            text-xs
            text-text
            outline-none
          "
        >
          <option value="">کشور مقصد</option>

          {countryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <FilterCitySearch
          countryCode={filters.destination_country_code ?? ""}
          value={filters.destination}
          onChange={(value) => onChange("destination", value)}
          onCitySelect={(city) =>
            onChange("destination_city_geoname_id", city?.id)
          }
          placeholder="شهر مقصد"
        />
      </div>

      {/* Border */}
      <div className="shrink-0">
        <MultiSelect
          options={BORDER_OPTIONS}
          value={filters.borders}
          onChange={(value) => onChange("borders", value)}
          placeholder="مرز خروج"
          className="  min-w-32  flex min-h-9 w-full items-center justify-between gap-2 rounded-full border border-border px-3 py-1 text-sm text-text transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Near me */}
      <div className="shrink-0">
        <NearMeFilter enabled={filters.nearest} onChange={onNearMeChange} />
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="
          h-9
          shrink-0
          rounded-full
          border
          border-border
          px-3
          py-1
          text-sm
          text-text-2
          transition
          hover:text-danger
        "
      >
        پاک کردن فیلترها
      </button>
    </div>
  );
}
