import { useState } from "react";
import { useBasket } from "../../contexts/BasketContext";
import { Coordinates, initialLoadFilters, LoadFilters } from "../../types/load";
import { filterLoads } from "../../helpers/loads/filterLoads";
import { loads } from "../../data/mock";
import { calculateDistance } from "../../helpers/calc/calculateDistance";
import { LoadSearch } from "../../components/searches/LoadSearch";
import { LoadResultSummary } from "../../components/summary/LoadResultSummary";
import { LoadList } from "../../components/lists/LoadList";
import { LoadFilters as LoadFiltersComponent } from "../../components/filters/LoadFilters";


export function PublicLoads() {
  const { basket, setBasket } = useBasket();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<LoadFilters>(initialLoadFilters);

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  const updateFilter = <K extends keyof LoadFilters>(
    key: K,
    value: LoadFilters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredLoads = filterLoads(loads, query, filters);

  const sortedLoads =
    filters.nearest && userLocation
      ? [...filteredLoads].sort((a, b) => {
          const distanceA = calculateDistance(
            userLocation,
            a.originCoordinates,
          );

          const distanceB = calculateDistance(
            userLocation,
            b.originCoordinates,
          );

          return distanceA - distanceB;
        })
      : filteredLoads;

  const handleNearMeChange = (
    enabled: boolean,
    coordinates: Coordinates | null,
  ) => {
    updateFilter("nearest", enabled);
    setUserLocation(coordinates);
  };

  const toggleBasket = (id: string) => {
    setBasket((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  
  const resetFilters = () => {
    setFilters(initialLoadFilters);
    setUserLocation(null);
  };

  return (
    <section className="mx-auto px-6 py-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">بارهای موجود</h1>

        <p className="mt-1 text-sm text-text-2">
          بار مناسب مسیرتان را پیدا و برای آن درخواست ثبت کنید.
        </p>
      </div>

      <LoadSearch value={query} onChange={setQuery} />

      <LoadFiltersComponent
        filters={filters}
        onChange={updateFilter}
        onNearMeChange={handleNearMeChange}
        onReset={resetFilters}
      />

      <LoadResultSummary count={sortedLoads.length} />

      <LoadList
        loads={sortedLoads}
        basket={basket}
        onToggleBasket={toggleBasket}
      />
    </section>
  );
}
