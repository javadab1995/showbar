import { useNavigate, useSearchParams } from "react-router-dom";

import { useState } from "react";
import { useMediaQuery } from "../../hooks/other/useMediaQuery";
import { useDriverRequests, useInfiniteDriverRequests } from "../../hooks/admin/useDriverRequests";
import { useInfiniteScroll } from "../../hooks/other/useInfiniteScroll";
import { createRequestColumns } from "../../components/columns/Requests.columns";
import Tabs from "../../components/tabs/Tabs";
import { Search } from "lucide-react";
import BaseTable from "../../components/tables/BaseTable";
import RequestMobileList from "../../components/lists/RequestMobileList";
import Spinner from "../../components/widgets/Spinner";
import { DriverRequestLoadStatus } from "../../types/status";


type RequestView = "all" | DriverRequestLoadStatus;

const tabs: {
  id: RequestView;
  label: string;
}[] = [
  {
    id: "all",
    label: "همه",
  },
  
  {
    id: "pending",
    label: "در انتظار بررسی",
  },
  {
    id: "approved",
    label: "تأیید شده",
  },
  {
    id: "rejected",
    label: "رد شده",
  },
];

export function RequestsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState("");

  const isMobile = useMediaQuery("(max-width: 767px)");

  const currentTab = (searchParams.get("status") as RequestView) || "all";

  const status = currentTab === "all" ? "" : currentTab;

  /*
   * Desktop query
   */
  const {
    data: desktopResult,
    isPending: isDesktopPending,
    isError: isDesktopError,
    error: desktopError,
  } = useDriverRequests(status);

  /*
   * Mobile query
   */
  const {
    data: mobileResult,
    isPending: isMobilePending,
    isError: isMobileError,
    error: mobileError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteDriverRequests(status);

  /*
   * Infinite scroll
   */
  const { lastItemRef } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage,
  });

  /*
   * Desktop data
   */
  const desktopRequests = desktopResult?.data ?? [];

  /*
   * Mobile data
   */
  const mobileRequests = mobileResult?.pages.flatMap((page) => page.data) ?? [];

  /*
   * Search
   */
  const filterRequests = <T extends typeof desktopRequests>(requests: T): T => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return requests;
    }

    return requests.filter((request) => {
      return (
        request.vehicle.plate?.toLowerCase().includes(value) ||
        request.vehicle.transit_code?.toLowerCase().includes(value) ||
        request.driver.name.toLowerCase().includes(value) ||
        request.driver.phone.includes(value)
      );
    }) as T;
  };

  const filteredDesktopRequests = filterRequests(desktopRequests);

  const filteredMobileRequests = filterRequests(mobileRequests);

  /*
   * Table columns
   */
  const columns = createRequestColumns({
    onView: (id) => {
      navigate(`/admin/requests/${id}`);
    },
  });

  /*
   * Tab change
   */
  const handleTabChange = (value: RequestView) => {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    setSearchParams(params);
  };

  /*
   * Mobile request click
   */
  const handleRequestClick = (id: string) => {
    navigate(`/admin/requests/${id}`);
  };

  /*
   * Current viewport error
   */
  const isError = isMobile ? isMobileError : isDesktopError;

  const error = isMobile ? mobileError : desktopError;

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text">درخواست‌ها</h2>

        <p className="mt-1 text-sm text-text-2">
          بررسی درخواست‌های رانندگان بر اساس خودرو
        </p>
      </div>

      {/* Tabs */}
      <Tabs items={tabs} value={currentTab} onChange={handleTabChange} />

      {/* Search */}
      <div className="flex items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <span
            className="
              pointer-events-none
              absolute inset-y-0 right-3
              flex items-center
              text-text-2
            "
          >
            <Search size={16} />
          </span>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی پلاک، شناسه ترانزیتی یا راننده..."
            className="
              w-full
              rounded-lg
              border border-border
              bg-surface
              py-2 pl-3 pr-10
              text-sm text-text
              placeholder:text-text-2/60
              outline-none
              transition-all
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
          />
        </div>
      </div>

      {/* Error */}
      {isError ? (
        <div
          className="
            rounded-xl
            border border-danger/30
            bg-danger/5
            p-4
            text-sm text-danger
          "
        >
          {error instanceof Error
            ? error.message
            : "خطایی در دریافت درخواست‌ها رخ داد"}
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden md:block">
            <BaseTable
              data={filteredDesktopRequests}
              columns={columns}
              isPending={isDesktopPending}
            />
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            {isMobilePending ? (
              <div className="py-8 text-center text-sm text-text-2">
               <Spinner />
              </div>
            ) : (
              <>
                <RequestMobileList
                  requests={filteredMobileRequests}
                  onRequestClick={handleRequestClick}
                  lastItemRef={lastItemRef}
                />

                {isFetchingNextPage && (
                  <div className="py-4 text-center text-xs text-text-2">
                    در حال دریافت درخواست‌های بیشتر...
                  </div>
                )}

                {!hasNextPage && mobileRequests.length > 0 && (
                  <div className="py-4 text-center text-xs text-text-2">
                    همه درخواست‌ها نمایش داده شدند
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
