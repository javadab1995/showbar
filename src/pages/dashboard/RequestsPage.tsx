import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

import { useMediaQuery } from "../../hooks/other/useMediaQuery";
import {
  useDriverRequests,
  useInfiniteDriverRequests,
} from "../../hooks/admin/useDriverRequests";
import { useInfiniteScroll } from "../../hooks/other/useInfiniteScroll";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

import { createRequestColumns } from "../../components/columns/Requests.columns";
import Tabs from "../../components/tabs/Tabs";
import BaseTable from "../../components/tables/BaseTable";
import RequestMobileList from "../../components/lists/RequestMobileList";
import Spinner from "../../components/widgets/Spinner";

import { DriverRequestStatus } from "../../types/status";

type RequestView = "all" | DriverRequestStatus;

const tabs = [
  {
    id: "all",
    label: "همه",
  },
  {
    id: "pending",
    label: "در انتظار بررسی",
  },
  {
    id: "confirmed",
    label: "تأیید شده",
  },
  {
    id: "rejected",
    label: "رد شده",
  },
] 

export default function RequestsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState("");

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isOnline = useOnlineStatus();

  const currentTab = (searchParams.get("status") as RequestView) || "all";

  const status = currentTab === "all" ? "" : currentTab;

  // فقط query مربوط به viewport فعلی فعال باشد
  const {
    data: desktopResult,
    isPending: isDesktopPending,
    isError: isDesktopError,
    error: desktopError,
  } = useDriverRequests(status, !isMobile);

  const {
    data: mobileResult,
    isPending: isMobilePending,
    isError: isMobileError,
    error: mobileError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteDriverRequests(status, isMobile);

  const { lastItemRef } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage,
    enabled: isOnline && isMobile,
  });

  const desktopRequests = desktopResult?.data ?? [];

  const mobileRequests = mobileResult?.pages.flatMap((page) => page.data) ?? [];

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

  const columns = createRequestColumns({
    onView: (id) => navigate(`/admin/requests/${id}`),
  });

 const handleTabChange = (value: string) => {
   const nextValue = value as RequestView;

   const params = new URLSearchParams(searchParams);

   if (nextValue === "all") {
     params.delete("status");
   } else {
     params.set("status", nextValue);
   }

   setSearchParams(params);
 };

  const handleRequestClick = (id: string) => {
    navigate(`/admin/requests/${id}`);
  };

  const isError = isMobile ? isMobileError : isDesktopError;

  const error = isMobile ? mobileError : desktopError;

  if (isError) {
    console.error("Driver requests error:", error);
  }

  return (
    <div className="mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text">
            درخواست‌های رانندگان
          </h1>

          <p className="mt-1 text-sm text-text-2">
            درخواست‌های ثبت‌شده توسط رانندگان را بررسی کنید.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs items={tabs} value={currentTab} onChange={handleTabChange} />

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-2"
        />

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجو بر اساس پلاک، کد ترانزیت، نام یا شماره تماس"
          className="w-full rounded-xl border border-border bg-surface py-2.5 pr-10 pl-4 text-sm text-text outline-none transition focus:border-primary"
        />
      </div>

      {/* Data */}
      {isError ? (
        <div className="rounded-xl border border-danger/30 bg-danger/5 p-6">
          <p className="text-sm font-medium text-danger">
            {isOnline
              ? "دریافت اطلاعات درخواست‌ها انجام نشد"
              : "اتصال به اینترنت برقرار نیست"}
          </p>

          <p className="mt-2 text-sm text-text-2">
            {isOnline
              ? "لطفاً دوباره تلاش کنید."
              : "برای دریافت درخواست‌ها، اتصال اینترنت خود را بررسی کنید."}
          </p>
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
              <div className="flex min-h-40 items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <RequestMobileList
                requests={filteredMobileRequests}
                onRequestClick={handleRequestClick}
                lastItemRef={lastItemRef}
               
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
