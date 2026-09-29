import { Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import BaseTable from "../../components/tables/BaseTable";

import { VEHICLE_OPTIONS } from "../../data/options";
import { useVehicles } from "../../hooks/admin/useVehicles";
import { createVehicleColumns } from "../../components/columns/Vehicle.columns";
import type { VehicleStatus } from "../../types/status";

export default function VehiclesPage() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const vehicleType = searchParams.get("vehicleType") ?? "";
 const statusParam = searchParams.get("status");

 const status: VehicleStatus | undefined =
   statusParam === "active" || statusParam === "inactive"
     ? statusParam
     : undefined;

  const {
    data: result,
    isPending,
    isError,
    error,
  } = useVehicles({
    search,

    vehicleType,

    status,
  });

  const vehicles = result?.data ?? [];

  const columns = createVehicleColumns({
    onView: (id) => {
      navigate(`/admin/vehicles/${id}`);
    },
  });

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  const handleVehicleType = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("vehicleType", value);
    } else {
      params.delete("vehicleType");
    }

    setSearchParams(params);
  };

  const handleStatus = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-text">خودروها</h2>

        <p className="mt-1 text-sm text-text-2">
          مدیریت اطلاعات خودروها و سوابق حمل
        </p>
      </div>

      {/* Filters */}

      <div
        className="
        flex
        flex-col
        gap-3
        rounded-xl
        border border-border
        bg-surface
        p-4
        sm:flex-row
        "
      >
        {/* Search */}

        <div className="relative flex-1">
          <Search
            size={16}
            className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-text-2
            "
          />

          <input
            defaultValue={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="
            جستجوی پلاک یا شناسه ترانزیتی...
            "
            className="
            h-11
            w-full
            rounded-lg
            border border-border
            bg-bg
            pr-10
            px-3
            text-sm
            text-text
            outline-none
            transition
            focus:border-primary
            focus:ring-2
            focus:ring-primary/20
            "
          />
        </div>

        {/* Vehicle type */}

        <select
          value={vehicleType}
          onChange={(e) => handleVehicleType(e.target.value)}
          className="
          h-11
          rounded-lg
          border border-border
          bg-bg
          px-3
          text-sm
          text-text
          outline-none
          "
        >
          <option value="">همه خودروها</option>

          {VEHICLE_OPTIONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => handleStatus(e.target.value)}
          className="
          h-11
          rounded-lg
          border border-border
          bg-bg
          px-3
          text-sm
          text-text
          outline-none
          "
        >
          <option value="">همه وضعیت‌ها</option>

          <option value="ACTIVE">فعال</option>

          <option value="INACTIVE">غیرفعال</option>
        </select>
      </div>

      {/* Error */}

      {isError && (
        <div
          className="
            rounded-xl
            border border-danger/30
            bg-danger/5
            p-4
            text-sm
            text-danger
            "
        >
          {error instanceof Error ? error.message : "خطا در دریافت خودروها"}
        </div>
      )}

      {/* Table */}

      <BaseTable data={vehicles} columns={columns} isPending={isPending} />
    </div>
  );
}
