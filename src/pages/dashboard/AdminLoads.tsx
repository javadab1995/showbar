import { Plus, Search } from "lucide-react";
import { useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/buttons/Button";
import { TableFooter } from "../../components/ui/TableFooter";
import Tabs from "../../components/tabs/Tabs";
import BaseTable from "../../components/tables/BaseTable";

import { useAdminLoads } from "../../hooks/admin/useAdminLoads";
import { useDebounce } from "../../hooks/other/useDebounce";
import { useDuplicateLoad } from "../../hooks/admin/useDuplicateLoad";
import { useArchiveLoad } from "../../hooks/admin/useArchiveLoad";
import { useUpdateLoadStatus } from "../../hooks/admin/useUpdateLoadStatus";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

import { ADMIN_PAGE_SIZE } from "../../services/apiLoads";
import { createLoadColumns } from "../../components/columns/AdminLoads.columns";

import { LoadStatus } from "../../types/status";

type LoadView = "active" | "archived";
type LoadSort = "newest" | "oldest";

export default function AdminLoads() {
  // ======================================
  // Navigation
  // ======================================

  const navigate = useNavigate();

  // ======================================
  // Online Status
  // ======================================

  const isOnline = useOnlineStatus();

  // ======================================
  // URL State
  // ======================================

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const pageSize = Number(searchParams.get("pageSize")) || ADMIN_PAGE_SIZE;

  const view = (searchParams.get("view") || "active") as LoadView;

  const sort = (searchParams.get("sort") || "newest") as LoadSort;

  const archivedPage = view === "archived";

  const updateSearchParams = (
    updates: Record<string, string | number | null>,
  ) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === 1) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  };

  // ======================================
  // UI State
  // ======================================

  const [query, setQuery] = useState("");

  const [status, setStatus] = useState<LoadStatus | "">("");

  const [archived, setArchived] = useState<string | null>(null);

  // ======================================
  // Debounced Search
  // ======================================

  const debouncedQuery = useDebounce(query, 500);

  // ======================================
  // Server Data
  // ======================================

  const { data, isPending, isError } = useAdminLoads({
    page: currentPage,
    pageSize,
    query: debouncedQuery,
    status,
    sort,
    archived: archivedPage,
  });

  const totalItems = data?.total ?? 0;

  // ======================================
  // Mutations
  // ======================================

  const duplicateMutation = useDuplicateLoad();

  const archivedMutation = useArchiveLoad();

  const updatedStatusMutation = useUpdateLoadStatus();

  // ======================================
  // Data
  // ======================================

  const loads = data?.data ?? [];

  // ======================================
  // Table Columns
  // ======================================

  const columns = createLoadColumns({
    onView: (id) => {
      navigate(`/admin/loads/${id}`);
    },

    onEdit: (id) => {
      navigate(`/admin/loads/${id}/edit`);
    },

    onDuplicate: (id) => {
      if (!isOnline) {
        return;
      }

      duplicateMutation.mutate(id);
    },

    onUpdateStatus: (id, status) => {
      if (!isOnline) {
        return;
      }

      updatedStatusMutation.mutate({
        id,
        status,
      });
    },

    onArchived: (id) => {
      if (!isOnline) {
        return;
      }

      archivedMutation.mutate(id);
    },
  });

  // ======================================
  // Search
  // ======================================

  const handleSearchChange = (value: string) => {
    setQuery(value);

    updateSearchParams({
      page: 1,
    });
  };

  // ======================================
  // Status Change
  // ======================================

  const handleStatusChange = (value: string) => {
    setStatus(value as LoadStatus | "");

    updateSearchParams({
      page: 1,
    });
  };

  // ======================================
  // Sort Change
  // ======================================

  const handleSortChange = (value: LoadSort) => {
    updateSearchParams({
      page: 1,
      sort: value,
    });
  };

  // ======================================
  // View Change
  // ======================================

  const handleViewChange = (value: LoadView) => {
    updateSearchParams({
      page: 1,
      view: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* ======================================
          Header
      ====================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-text
            "
          >
            بارها
          </h2>

          <p
            className="
              text-sm
              text-text-2
            "
          >
            مدیریت و پیگیری همه بارهای ثبت‌شده
          </p>
        </div>

        <Button
          className="
            hidden
            h-12
            max-w-48
            items-center
            justify-center
            rounded-md
            bg-primary-radial
            p-2.5
            text-surface
            hover:opacity-90
            md:flex
          "
        >
          <Link
            className="
              flex
              items-center
              gap-2.5
            "
            to="/admin/loads/new"
          >
            <Plus size={20} />
            افزودن بار
          </Link>
        </Button>
      </div>

      {/* ======================================
          Offline Notice
      ====================================== */}

      {!isOnline && (
        <div
          className="
            rounded-xl
            border
            border-danger/30
            bg-danger/5
            p-4
            text-sm
            text-danger
          "
        >
          اتصال به اینترنت برقرار نیست. اطلاعات بارها و عملیات مدیریتی در حال
          حاضر در دسترس نیستند.
        </div>
      )}

      {/* ======================================
          Toolbar
      ====================================== */}

      <Tabs
        value={view}
        onChange={handleViewChange}
        items={[
          {
            id: "active",
            label: "بارهای فعال",
          },
          {
            id: "archived",
            label: "آرشیو",
          },
        ]}
      />

      <div
        className="
          flex
          flex-col
          items-stretch
          gap-3
          rounded-xl
          border
          border-border
          bg-surface
          p-4
          md:flex-row
          md:items-center
        "
      >
        {/* Search */}

        <div
          className="
            relative
            flex-1
          "
        >
          <span
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-3
              flex
              items-center
              text-muted
            "
          >
            <Search size={18} />
          </span>

          <input
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="جستجوی مسیر، بار یا خودرو..."
            className="
              w-full
              rounded-lg
              border
              border-border
              bg-surface-2
              py-2.5
              pl-4
              pr-10
              text-sm
              text-text
              outline-none
              transition-all
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
            "
          />
        </div>

        {/* Filters */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          {/* Status */}

          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="
              cursor-pointer
              rounded-lg
              border
              border-border
              bg-surface-2
              px-3
              py-2.5
              text-sm
              text-text
              outline-none
              transition-all
              focus:ring-2
              focus:ring-primary
            "
          >
            <option value="">همه وضعیت‌ها</option>

            <option value="active">فعال</option>

            <option value="reserved">رزرو شده</option>

            <option value="completed">تکمیل شده</option>

            <option value="cancelled">لغو شده</option>

            <option value="expired">منقضی شده</option>
          </select>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value as LoadSort)}
            className="
              cursor-pointer
              rounded-lg
              border
              border-border
              bg-surface-2
              px-3
              py-2.5
              text-sm
              text-text
              outline-none
              transition-all
              focus:ring-2
              focus:ring-primary
            "
          >
            <option value="newest">جدیدترین</option>

            <option value="oldest">قدیمی‌ترین</option>
          </select>
        </div>
      </div>

      {/* ======================================
          Error
      ====================================== */}

      {isError ? (
        <div
          className="
            rounded-xl
            border
            border-danger/30
            bg-danger/5
            p-4
            text-sm
            text-danger
          "
        >
          {isOnline
            ? "دریافت اطلاعات بارها با خطا مواجه شد. لطفاً دوباره تلاش کنید."
            : "اتصال به اینترنت برقرار نیست. دریافت اطلاعات بارها امکان‌پذیر نیست."}
        </div>
      ) : (
        <>
          <BaseTable data={loads} columns={columns} isPending={isPending} />

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
        </>
      )}

      {/* ======================================
          Archive Modal
      ====================================== */}

      <Modal
        open={Boolean(archived)}
        title="حذف بار"
        onClose={() => setArchived(null)}
      >
        <div className="space-y-4">
          <p
            className="
              text-sm
              leading-relaxed
              text-text-2
            "
          >
            آیا از آرشیو این بار مطمئن هستید؟
          </p>

          <div
            className="
              flex
              items-center
              justify-end
              gap-2
              pt-2
            "
          >
            <Button
              variant="secondary"
              className="
                h-12
                max-w-48
                border
                border-border
                p-2.5
                text-text
              "
              onClick={() => setArchived(null)}
            >
              انصراف
            </Button>

            <Button
              variant="danger"
              className="
                h-12
                max-w-48
                border
                border-danger
                bg-danger/10
                p-2.5
                text-text
              "
              onClick={() => {
                if (!isOnline || !archived) {
                  return;
                }

                archivedMutation.mutate(archived);

                setArchived(null);
              }}
            >
              آرشیو بار
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
