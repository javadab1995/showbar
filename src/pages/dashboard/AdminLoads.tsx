import { Copy, Edit, Eye, Plus, Search, StopCircle, Trash } from "lucide-react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useState } from "react";

import { money } from "../../data/mock";

import { StatusBadge } from "../../components/ui/StatusBadge";

import { TableFooter } from "../../components/ui/TableFooter";

import { EmptyState } from "../../components/ui/EmptyState";

import { Modal } from "../../components/ui/Modal";

import { Button } from "../../components/buttons/Button";

import DropdownMenu from "../../components/dropdown/DropdownMenu";

import Spinner from "../../components/widgets/Spinner";

import { useAdminLoads } from "../../hooks/useAdminLoads";

import { useDebounce } from "../../hooks/useDebounce";

import type { LoadStatus } from "../../types";

import { ADMIN_PAGE_SIZE } from "../../services/apiLoads";
import { toPersianDate } from "../../helpers/date";
import { toPersianDigits } from "../../helpers/number";

export function AdminLoads() {
  // ======================================
  // Navigation
  // ======================================

  const navigate = useNavigate();

  // ======================================
  // UI State
  // ======================================
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
 

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

  const [query, setQuery] = useState("");

  const [status, setStatus] = useState<LoadStatus | "">("");

  const [sort, setSort] = useState<"newest" | "oldest">("newest");



  


  const [pageSize, setPageSize] = useState(ADMIN_PAGE_SIZE);

  // ======================================
  // Delete Modal
  // ======================================

  const [deleteId, setDeleteId] = useState<string | null>(null);
 
  // ======================================
  // Debounced Search
  // ======================================

  const debouncedQuery = useDebounce(query, 500);



  // ======================================
  // Server Data
  // ======================================

const {
  data,
  isLoading,
  isFetching,
  error: isError,
} = useAdminLoads({
  page:currentPage,
  pageSize: ADMIN_PAGE_SIZE,
  query:debouncedQuery,
  status,
  sort,
});
  
  
    const loads = data?.data ?? [];
    const totalCount = data?.count ?? 0;
 


const handleSearchChange = (value: string) => {
  setQuery(value);
  updateSearchParams({ page: 1 });
};
  // ======================================
  // Status Change
  // ======================================

  const handleStatusChange = (value: string) => {
    setStatus(value as LoadStatus | "");
     updateSearchParams({ page: 1 });
  };

  // ======================================
  // Sort Change
  // ======================================

  const handleSortChange = (value: "newest" | "oldest") => {
    setSort(value);
     updateSearchParams({ page: 1 });
  };

  // ======================================
  // Page Size Change
  // ======================================

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
     updateSearchParams({ page: 1 });
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
          Toolbar
      ====================================== */}

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
            placeholder="
              جستجوی مسیر، بار یا خودرو...
            "
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
              focus:ring-2
              focus:ring-primary
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
            onChange={(e) =>
              handleSortChange(e.target.value as "newest" | "oldest")
            }
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

      {isError && (
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
          {isError instanceof Error ? isError.message : "خطایی رخ داد"}
        </div>
      )}

      {/* ======================================
          Table
      ====================================== */}

      <div
        className="
          relative
          w-full
          overflow-x-auto
          rounded-xl
          border
          border-border
          bg-surface
          shadow-sm
        "
      >
        {/* Table Loading Overlay */}

        {isFetching && (
          <div
            className="
              absolute
              inset-0
              z-20
              flex
              items-center
              justify-center
              bg-surface/60
              backdrop-blur-[1px]
            "
          >
            <Spinner />
          </div>
        )}

        {isLoading ? (
          <div
            className="
              flex
              min-h-100
              items-center
              justify-center
            "
          >
            <Spinner />
          </div>
        ) : loads.length ? (
          <>
            <table
              className="
                w-full
                border-collapse
                text-right
              "
            >
              <thead>
                <tr
                  className="
                    border-b
                    border-border
                    bg-surface-2
                    text-xs
                    font-semibold
                    text-text-2
                  "
                >
                  <th className="p-4">مسیر</th>

                  <th className="p-4">نوع بار</th>

                  <th className="p-4">وزن</th>

                  <th className="p-4">خودرو</th>

                  <th className="p-4">تاریخ بارگیری</th>

                  <th className="p-4">کرایه</th>

                  <th className="p-4">وضعیت</th>

                  <th className="p-4">تاریخ ثبت</th>

                  <th className="w-12 p-4" />
                </tr>
              </thead>

              <tbody
                className="
                  divide-y
                  divide-border/60
                  text-sm
                  text-text
                "
              >
                {loads.map((load) => (
                  <tr
                    key={load.id}
                    className="
                      transition-colors
                      hover:bg-surface-2/40
                    "
                  >
                    {/* Route */}

                    <td className="p-4">
                      <Link
                        className="
                          font-medium
                          text-primary
                          transition-colors
                          hover:text-primary-dark
                        "
                        to={`/admin/loads/${load.id}`}
                      >
                        {load.origin}
                        {" ← "}
                        {load.destination}
                      </Link>
                    </td>

                    {/* Cargo */}

                    <td className="p-4">{load.cargo || "-"}</td>

                    {/* Weight */}

                    <td
                      className="
                        p-4
                        font-mono
                      "
                    >
                      {toPersianDigits(load.weight)} تن
                    </td>

                    {/* Vehicle */}

                    <td className="p-4">{load.vehicle_type}</td>

                    {/* Loading Date */}

                    <td className="p-4">{toPersianDate(load.loading_date)}</td>

                    {/* Price */}

                    <td
                      className="
                        p-4
                        font-mono
                        font-medium
                        text-primary
                      "
                    >
                      {money(load.price)}
                    </td>

                    {/* Status */}

                    <td className="p-4">
                      <StatusBadge status={load.status} />
                    </td>

                    {/* Created At */}

                    <td
                      className="
                        p-4
                        text-xs
                        text-text-2
                      "
                    >
                      {toPersianDate(load.created_at) || "-"}
                    </td>

                    {/* Actions */}

                    <td
                      className="
                        p-4
                        text-center
                      "
                    >
                      <DropdownMenu
                        items={[
                          {
                            label: "مشاهده بار",

                            icon: Eye,

                            onClick: () => {
                              navigate(`/admin/loads/${load.id}`);
                            },
                          },

                          {
                            label: "ویرایش بار",

                            icon: Edit,

                            onClick: () => {
                              navigate(`/admin/loads/${load.id}/edit`);
                            },
                          },

                          {
                            label: "تکرار",

                            icon: Copy,

                            onClick: () => {
                              navigate(`/admin/loads/new?copy=${load.id}`);
                            },
                          },

                          {
                            label: "حذف کامل",

                            icon: Trash,

                            danger: true,

                            onClick: () => {
                              setDeleteId(load.id);
                            },
                          },

                          {
                            label: "غیرفعال",

                            icon: StopCircle,

                            warning: true,

                            onClick: () => {
                              // بعداً mutation
                            },
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ======================================
                Pagination
            ====================================== */}

            <TableFooter
              totalItems={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageSizeChange={handlePageSizeChange}
              onPageChange={(page) => updateSearchParams({ page })}
            />
          </>
        ) : (
          <div className="p-8">
            <EmptyState
              title="باری وجود ندارد"
              text="عبارت جستجو یا فیلترها را تغییر دهید."
            />
          </div>
        )}
      </div>

      {/* ======================================
          Delete Modal
      ====================================== */}

      <Modal
        open={Boolean(deleteId)}
        title="حذف بار"
        onClose={() => setDeleteId(null)}
      >
        <div className="space-y-4">
          <p
            className="
              text-sm
              leading-relaxed
              text-text-2
            "
          >
            آیا از حذف این بار مطمئن هستید؟ این عملیات قابل بازگشت نیست.
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
              onClick={() => setDeleteId(null)}
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
                // بعداً delete mutation

                setDeleteId(null);
              }}
            >
              حذف بار
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
