import { useState } from "react";

import { useBasket } from "../../contexts/BasketContext";

import {
  type Coordinates,
  initialLoadFilters,
  type LoadFilters,
} from "../../types/load";

import { LoadSearch } from "../../components/searches/LoadSearch";

import { LoadResultSummary } from "../../components/summary/LoadResultSummary";

import { LoadList } from "../../components/lists/LoadList";

import { LoadFilters as LoadFiltersComponent } from "../../components/filters/LoadFilters";



import { useInfiniteScroll } from "../../hooks/other/useInfiniteScroll";
import { usePublicLoads } from "../../hooks/public/usePublicLoads";
import { Loader, WifiOff } from "lucide-react";
import Spinner from "../../components/widgets/Spinner";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

export default function PublicLoads() {
  // ==================================
  // Basket
  // ==================================

  const { basket, setBasket } = useBasket();

    const isOnline = useOnlineStatus();

  // ==================================
  // Search
  // ==================================

  const [query, setQuery] = useState("");

  // ==================================
  // Filters
  // ==================================

  const [filters, setFilters] = useState<LoadFilters>(initialLoadFilters);

  // ==================================
  // User Location
  // ==================================

  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  // ==================================
  // Loads Query
  // ==================================

  const {
    loads,

    totalCount,

    isLoading,

    isError,

    error,

    hasNextPage,

    isFetchingNextPage,

    fetchNextPage,
  } = usePublicLoads(query, filters, userLocation);

  // ==================================
  // Infinite Scroll
  // ==================================

  const { lastItemRef } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,

    isFetchingNextPage,

    fetchNextPage,
  });

  // ==================================
  // Update Filter
  // ==================================

  const updateFilter = <K extends keyof LoadFilters>(
    key: K,
    value: LoadFilters[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==================================
  // Near Me
  // ==================================

  const handleNearMeChange = (
    enabled: boolean,
    coordinates: Coordinates | null,
  ) => {
    updateFilter("nearest", enabled);

    setUserLocation(coordinates);
  };

  // ==================================
  // Basket
  // ==================================

  const toggleBasket = (id: string) => {
    setBasket((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // ==================================
  // Reset Filters
  // ==================================

  const resetFilters = () => {
    setFilters(initialLoadFilters);

    setUserLocation(null);
  };

  // ==================================
  // Loading
  // ==================================

  

  // ==================================
  // Error
  // ==================================

  if (isError) {
   console.error("Public loads error:", error);
   const message = !isOnline
     ? "اتصال به اینترنت برقرار نیست."
     : "دریافت بارها با خطا مواجه شد.";

   return (
     <section className="flex flex-col justify-center items-center min-h-100 text-center">
       <WifiOff className="w-8 h-8" />
       <p className="text-danger">{message}</p>

       <p className="mt-2 text-sm text-text-2">
         {!isOnline
           ? "اتصال اینترنت خود را بررسی کنید."
           : "لطفاً کمی بعد دوباره تلاش کنید."}
       </p>
     </section>
   );
 }
  return (
    <section className="mx-auto  px-6 py-20 mb-20 ">
      {/* Header */}

      <div className="mb-6 mt-10">
        <h1 className="text-2xl font-bold text-text">بارهای موجود</h1>

        <p className="mt-1 text-sm text-text-2">
          بار مناسب مسیرتان را پیدا و برای آن درخواست ثبت کنید.
        </p>
      </div>

      {/* Search */}

      <LoadSearch value={query} onChange={setQuery} />

      {/* Filters */}

      <LoadFiltersComponent
        filters={filters}
        onChange={updateFilter}
        onNearMeChange={handleNearMeChange}
        onReset={resetFilters}
      />

      {/* Summary */}

      {isLoading ? (
        <section className="mx-auto flex flex-col justify-between items-center w-full h-full py-52">
          <Spinner />
          در حال دریافت بارها...
        </section>
      ) : (
        <>
          <LoadResultSummary count={totalCount} />

          {/* Loads */}

          <LoadList
            loads={loads}
            basket={basket}
            onToggleBasket={toggleBasket}
            lastItemRef={lastItemRef}
          />
        </>
      )}

      {/* Loading Next Page */}

      {isFetchingNextPage && (
        <div className="py-8 text-center text-sm text-text-2">
          در حال دریافت بارهای بیشتر... <Loader />
        </div>
      )}

      {/* End */}

      {!hasNextPage && loads.length > 0 && (
        <div className="py-8 text-center text-sm text-text-2">
          همه بارها نمایش داده شدند
        </div>
      )}

      
    </section>
  );
}
