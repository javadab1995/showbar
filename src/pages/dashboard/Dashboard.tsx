import {
  Activity,
  ArrowLeft,
  ClipboardList,
  PackageCheck,
  Plus,
  Truck,
  TruckIcon,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/AuthProvider";
import { Button } from "../../components/buttons/Button";
import { StatusBadge } from "../../components/ui/StatusBadge";

import { formatMoney } from "../../helpers/formater";
import { toPersianDate } from "../../helpers/date";
import { useDashboard } from "../../hooks/admin/useDashboard";
import { LoadDetailsSkeleton } from "../../components/skeleton/LoadDetailsSkeleton";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

export default function Dashboard() {
  const { user } = useAuth();
  const isOnline = useOnlineStatus();

  const { data, isLoading, isError, error } = useDashboard();

  if (isLoading) {
    return <LoadDetailsSkeleton />;
  }
  if (isError) {
    console.error("Dashboard error:", error);

    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <p className="font-semibold text-text">
            {isOnline
              ? "دریافت اطلاعات داشبورد انجام نشد"
              : "اتصال به اینترنت برقرار نیست"}
          </p>

          <p className="mt-2 text-sm text-text-2">
            {isOnline
              ? "لطفاً دوباره صفحه را بارگذاری کنید."
              : "برای دریافت اطلاعات داشبورد، اتصال اینترنت خود را بررسی کنید."}
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <p className="font-semibold text-text">
            اطلاعات داشبورد در دسترس نیست
          </p>

          <p className="mt-2 text-sm text-text-2">
            لطفاً دوباره صفحه را بارگذاری کنید.
          </p>
        </div>
      </div>
    );
  }

  const { stats, recentLoads, pendingRequests } = data;

  const kpis = [
    {
      label: "بارهای فعال",
      value: stats.activeLoads,
      icon: Truck,
      description: "در حال پذیرش درخواست",
    },
    {
      label: "درخواست‌های جدید",
      value: stats.pendingRequests,
      icon: ClipboardList,
      description: "نیازمند بررسی",
      highlight: true,
    },
    {
      label: "بارهای رزرو شده",
      value: stats.reservedLoads,
      icon: PackageCheck,
      description: "در انتظار بارگیری",
    },
    {
      label: "بارهای تکمیل شده",
      value: stats.completedLoads,
      icon: Activity,
      description: "مجموع بارهای تکمیل شده",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-primary">
              پنل مدیریت ShowBar
            </p>

            <h1 className="text-2xl font-bold text-text">
              خوش آمدید{user?.email ? `، ${user.email.split("@")[0]}` : ""} 👋
            </h1>

            <p className="mt-2 text-sm text-text-2">
              وضعیت عملیات حمل‌ونقل و درخواست‌های اخیر را از اینجا مدیریت کنید.
            </p>
          </div>

          <Button className="shrink-0">
            <Link
              to="/admin/loads/new"
              className="flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              افزودن بار
            </Link>
          </Button>
        </div>

        <div className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 rounded-full bg-primary/5" />
        <div className="pointer-events-none absolute -bottom-24 right-1/3 h-40 w-40 rounded-full bg-primary/5" />
      </section>

      {/* KPI */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                {item.highlight && stats.pendingRequests > 0 && (
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                )}
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium text-text-2">{item.label}</p>

                <p className="mt-1 text-3xl font-bold tracking-tight text-text">
                  {item.value.toLocaleString("fa-IR")}
                </p>

                <p className="mt-2 text-xs text-text-2">{item.description}</p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* Latest loads */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-bold text-text">آخرین بارها</h2>
              <p className="mt-1 text-xs text-text-2">
                آخرین بارهای ثبت‌شده در سامانه
              </p>
            </div>

            <Link
              to="/admin/loads"
              className="flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary-dark"
            >
              مشاهده همه
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          {recentLoads.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center px-5 text-sm text-text-2">
              هنوز باری ثبت نشده است.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentLoads.map((load) => (
                <Link
                  key={load.id}
                  to={`/admin/loads/${load.id}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-surface-2/50"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-semibold text-text">
                        {load.origin}
                      </p>

                      <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-text-2" />

                      <p className="truncate font-semibold text-text">
                        {load.destination}
                      </p>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-2">
                      {load.cargo && <span>{load.cargo}</span>}

                      {load.weight !== null && (
                        <>
                          <span>•</span>
                          <span>{load.weight} تن</span>
                        </>
                      )}

                      <span>•</span>

                      <span>{formatMoney(load.price, load.currency)}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={load.status} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pending requests */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-bold text-text">
                درخواست‌های در انتظار بررسی
              </h2>

              <p className="mt-1 text-xs text-text-2">
                درخواست‌هایی که نیاز به اقدام دارند
              </p>
            </div>

            <Link
              to="/admin/requests"
              className="flex items-center gap-1 text-sm font-medium text-primary transition hover:text-primary-dark"
            >
              همه
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center px-5 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="h-5 w-5" />
              </div>

              <p className="mt-3 text-sm font-medium text-text">
                درخواست جدیدی وجود ندارد
              </p>

              <p className="mt-1 text-xs text-text-2">
                فعلاً چیزی برای بررسی ندارید.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {pendingRequests.slice(0, 5).map((request) => (
                <Link
                  key={request.id}
                  to={`/admin/requests/${request.id}`}
                  className="block px-5 py-4 transition hover:bg-surface-2/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-text">
                        {request.driver.name}
                      </p>

                      <p className="mt-1 text-xs text-text-2">
                        {request.vehicle.plate}
                        <span className="mx-2">•</span>
                        {request.tracking_code}
                      </p>
                    </div>

                    <StatusBadge status={request.status} />
                  </div>

                  <p className="mt-2 text-[11px] text-text-2">
                    {toPersianDate(request.created_at)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-3">
          <h2 className="font-bold text-text">دسترسی سریع</h2>
          <p className="mt-1 text-xs text-text-2">عملیات‌های پرکاربرد</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction to="/admin/loads/new" icon={Plus} label="افزودن بار" />

          <QuickAction
            to="/admin/requests"
            icon={ClipboardList}
            label="مدیریت درخواست‌ها"
          />

          <QuickAction
            to="/admin/vehicles"
            icon={TruckIcon}
            label="مدیریت خودروها"
          />

          <QuickAction
            to="/admin/drivers"
            icon={UsersRound}
            label="مدیریت رانندگان"
          />
        </div>
      </section>
    </div>
  );
}

type QuickActionProps = {
  to: string;
  icon: typeof Plus;
  label: string;
};

function QuickAction({ to, icon: Icon, label }: QuickActionProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-4 text-sm font-semibold text-text shadow-sm transition hover:border-primary/30 hover:bg-surface-2 hover:text-primary"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>

      <span>{label}</span>

      <ArrowLeft className="mr-auto h-4 w-4 text-text-2" />
    </Link>
  );
}
