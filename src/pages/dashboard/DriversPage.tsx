import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import BaseTable from "../../components/tables/BaseTable";




import { useDrivers } from "../../hooks/admin/useDrivers";
import { ADMIN_PAGE_SIZE } from "../../services/apiLoads";
import { createDriverColumns } from "../../components/columns/Drivers.columns";
import { TableFooter } from "../../components/ui/TableFooter";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";



export default function DriversPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()
    const isOnline = useOnlineStatus();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pageSize = Number(searchParams.get("pageSize")) || ADMIN_PAGE_SIZE;

  const queryParam = searchParams.get("query") ?? "";

  const [query, setQuery] = useState(queryParam);

  const { data, isPending, isError, error } = useDrivers(
    currentPage,
    pageSize,
    queryParam,
  );

 
  const drivers = data?.data ?? [];
  const totalItems = data?.total ?? 0;

   const columns = createDriverColumns({
     onView: (id) => {
       navigate(`/admin/drivers/${id}`);
     },
     onRequestView(id) {
        navigate(`/admin/requests/${id}`);
     },
   });

  const updateSearchParams = (
    updates: Record<string, string | number | null>,
  ) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else if (key === "page" && value === 1) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  };

  const handleSearch = () => {
    updateSearchParams({
      query: query.trim() || null,
      page: 1,
    });
  };

 if (isError) {
   return (
     <div className="rounded-xl border border-border bg-surface p-6">
       <p className="text-sm text-danger">
         {isOnline
           ? "دریافت اطلاعات رانندگان انجام نشد"
           : "اتصال به اینترنت برقرار نیست"}
       </p>

       <p className="mt-2 text-sm text-text-2">
         {isOnline
           ? "لطفاً دوباره تلاش کنید."
           : "برای دریافت اطلاعات رانندگان، اتصال اینترنت خود را بررسی کنید."}
       </p>
     </div>
   );
 }
  
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">رانندگان</h1>

          <p className="mt-1 text-sm text-text-2">
            مدیریت رانندگان و خودروهای مرتبط
          </p>
        </div>

        <div className="text-sm text-primary p-1 rounded-lg bg-primary/10">
          {totalItems.toLocaleString("fa-IR")} راننده
        </div>
      </div>

      {/* Search */}
      <div className="flex w-full sm:max-w-md">
        <div className="relative w-full">
          <Search
            className="
              pointer-events-none
              absolute right-3 top-1/2
              h-4 w-4
              -translate-y-1/2
              text-text-2
            "
          />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="جستجوی نام، موبایل، کد ملی، پلاک یا کد ترانزیت..."
            className="
              h-10 w-full
              rounded-lg
              border border-border
              bg-surface
              pr-10 pl-3
              text-sm text-text
              outline-none
              transition-colors
              placeholder:text-text-2
              focus:border-primary
            "
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <BaseTable
          data={drivers}
          columns={columns}
          isPending={isPending}
          
        />
      </div>

      {/* Pagination */}
      {totalItems > pageSize && (
        <TableFooter
          pageSize={pageSize}
          totalItems={totalItems}
          currentPage={currentPage}
          onPageSizeChange={(size) => {
            updateSearchParams({
              page: 1,
              pageSize: size,
            });
          }}
          onPageChange={(page) => {
            updateSearchParams({
              page,
            });
          }}
        />
      )}
    </div>
  );
}
