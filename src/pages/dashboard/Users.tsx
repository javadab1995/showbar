import {
  Check,
  Clock3,
  Power,
  ShieldCheck,
  Trash2,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

import { useUsers } from "../../hooks/admin/useUsers";
import { manageAdmin, type AdminAction } from "../../services/apiUsers";

import type { AdminUser } from "../../services/apiUsers";

type UserFilter = "all" | "active" | "inactive" | "pending";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

function getUserStatus(user: AdminUser) {
  if (user.role === "super_admin") {
    return "active";
  }

  // مهم:
  // banned_until باید قبل از last_sign_in_at بررسی شود.
  // چون کاربر غیرفعال ممکن است قبلاً وارد سیستم شده باشد.
  if (user.banned_until) {
    return "inactive";
  }

  if (user.last_sign_in_at) {
    return "active";
  }

  return "pending";
}

function UserStatusBadge({ user }: { user: AdminUser }) {
  const status = getUserStatus(user);

  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
        <Check className="h-3.5 w-3.5" />
        فعال
      </span>
    );
  }

  if (status === "inactive") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-danger/10 px-2.5 py-1 text-xs font-medium text-danger">
        <X className="h-3.5 w-3.5" />
        غیرفعال
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
      <Clock3 className="h-3.5 w-3.5" />
      در انتظار تأیید
    </span>
  );
}

function ConfirmDialog({
  title,
  description,
  confirmText,
  danger = false,
  isLoading,
  onConfirm,
  onClose,
}: {
  title: string;
  description: string;
  confirmText: string;
  danger?: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-xl">
        <h2 className="text-lg font-bold text-text">{title}</h2>

        <p className="mt-2 text-sm leading-6 text-text-2">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-text transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            انصراف
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={[
              "rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50",
              danger
                ? "bg-danger hover:bg-danger/90"
                : "bg-primary hover:bg-primary-dark",
            ].join(" ")}
          >
            {isLoading ? "در حال انجام..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Users() {
  const { data: users = [], isLoading, isError, refetch } = useUsers();

  const [filter, setFilter] = useState<UserFilter>("all");

  const [actionUser, setActionUser] = useState<AdminUser | null>(null);
  const [action, setAction] = useState<AdminAction | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const filteredUsers = users.filter((user) => {
    if (filter === "all") {
      return true;
    }

    return getUserStatus(user) === filter;
  });

  const activeCount = users.filter(
    (user) => getUserStatus(user) === "active",
  ).length;

  const inactiveCount = users.filter(
    (user) => getUserStatus(user) === "inactive",
  ).length;

  const pendingCount = users.filter(
    (user) => getUserStatus(user) === "pending",
  ).length;

  function openAction(user: AdminUser, nextAction: AdminAction) {
    setActionUser(user);
    setAction(nextAction);
  }

  function closeAction() {
    if (isActionLoading) return;

    setActionUser(null);
    setAction(null);
  }

  async function handleAction() {
    if (!actionUser || !action) {
      return;
    }

    try {
      setIsActionLoading(true);

      await manageAdmin(actionUser.id, action);

      await refetch();

      setActionUser(null);
      setAction(null);
    } catch (error) {
      console.error("MANAGE ADMIN ERROR:", error);

      const message =
        error instanceof Error ? error.message : "عملیات با خطا مواجه شد.";

      alert(message);
    } finally {
      setIsActionLoading(false);
    }
  }

  const tabs = [
    {
      id: "all" as const,
      label: "همه",
      count: users.length,
    },
    {
      id: "active" as const,
      label: "فعال",
      count: activeCount,
    },
    {
      id: "inactive" as const,
      label: "غیرفعال",
      count: inactiveCount,
    },
    {
      id: "pending" as const,
      label: "در انتظار تأیید",
      count: pendingCount,
    },
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <UsersRound className="h-5 w-5 text-primary" />

            <h1 className="text-xl font-bold text-text">مدیریت کاربران</h1>
          </div>

          <p className="mt-1 text-sm text-text-2">
            مدیریت حساب‌های دسترسی پنل مدیریت
          </p>
        </div>

        <Link
          to="/admin/add-admin"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          <UserPlus className="h-4 w-4" />
          افزودن ادمین
        </Link>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full rounded-xl border border-border bg-surface p-1 sm:min-w-0">
          {tabs.map((tab) => {
            const isActive = filter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={[
                  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-2 hover:bg-surface-2 hover:text-text",
                ].join(" ")}
              >
                {tab.label}

                <span
                  className={[
                    "min-w-5 rounded-md px-1.5 py-0.5 text-xs",
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-surface-2 text-text-2",
                  ].join(" ")}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-text-2">
            در حال دریافت کاربران...
          </div>
        ) : isError ? (
          <div className="p-8 text-center">
            <p className="text-sm text-danger">
              دریافت کاربران با خطا مواجه شد.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text transition hover:bg-surface-2"
            >
              تلاش مجدد
            </button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-sm text-text-2">
            کاربری در این بخش وجود ندارد.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-225 text-sm">
              <thead className="border-b border-border bg-surface-2/50">
                <tr>
                  <th className="px-5 py-4 text-right font-semibold text-text">
                    ایمیل
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-text">
                    نقش
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-text">
                    وضعیت
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-text">
                    تاریخ ایجاد
                  </th>

                  <th className="px-5 py-4 text-right font-semibold text-text">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => {
                  const status = getUserStatus(user);

                  const isSuperAdmin = user.role === "super_admin";

                  return (
                    <tr
                      key={user.id}
                      className="transition hover:bg-surface-2/30"
                    >
                      {/* Email */}
                      <td className="px-5 py-4 font-medium text-text">
                        {user.email}
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        {isSuperAdmin ? (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            سوپر ادمین
                          </span>
                        ) : (
                          <span className="inline-flex rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-medium text-text-2">
                            ادمین
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <UserStatusBadge user={user} />
                      </td>

                      {/* Created */}
                      <td className="px-5 py-4 text-text-2">
                        {formatDate(user.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        {isSuperAdmin ? (
                          <span className="text-xs text-text-2">
                            دسترسی کامل
                          </span>
                        ) : (
                          <div className="flex items-center gap-2">
                            {/* Activate */}
                            {status === "inactive" && (
                              <button
                                type="button"
                                onClick={() => openAction(user, "activate")}
                                title="فعال کردن کاربر"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-success/10 px-3 py-2 text-xs font-medium text-success transition hover:bg-success/15"
                              >
                                <Power className="h-3.5 w-3.5" />
                                فعال کردن
                              </button>
                            )}

                            {/* Deactivate */}
                            {status === "active" && (
                              <button
                                type="button"
                                onClick={() => openAction(user, "deactivate")}
                                title="غیرفعال کردن کاربر"
                                className="inline-flex items-center gap-1.5 rounded-lg bg-warning/10 px-3 py-2 text-xs font-medium text-warning transition hover:bg-warning/15"
                              >
                                <Power className="h-3.5 w-3.5" />
                                غیرفعال کردن
                              </button>
                            )}

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => openAction(user, "delete")}
                              title="حذف دائمی کاربر"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-danger/10 px-3 py-2 text-xs font-medium text-danger transition hover:bg-danger/15"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              حذف
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {actionUser && action && (
        <ConfirmDialog
          isLoading={isActionLoading}
          onClose={closeAction}
          onConfirm={handleAction}
          danger={action === "delete"}
          title={
            action === "delete"
              ? "حذف دائمی کاربر"
              : action === "deactivate"
                ? "غیرفعال کردن کاربر"
                : "فعال کردن کاربر"
          }
          description={
            action === "delete"
              ? `حساب ${actionUser.email} به صورت دائمی حذف خواهد شد. این عملیات قابل بازگشت نیست.`
              : action === "deactivate"
                ? `حساب ${actionUser.email} غیرفعال می‌شود و دیگر نمی‌تواند وارد پنل مدیریت شود.`
                : `حساب ${actionUser.email} دوباره فعال می‌شود و امکان ورود به پنل مدیریت را خواهد داشت.`
          }
          confirmText={
            action === "delete"
              ? "حذف دائمی"
              : action === "deactivate"
                ? "غیرفعال کردن"
                : "فعال کردن"
          }
        />
      )}
    </section>
  );
}
