import { ArrowRight, CalendarDays, Phone, Truck, User } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { useDriver } from "../../hooks/admin/useDriver";

import { StatusBadge } from "../../components/ui/StatusBadge";
import VehicleLabel from "../../components/labels/VehicleLabel";
import BackButton from "../../components/buttons/BackButton";
import { toPersianDigits } from "../../helpers/number";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

export default function DriverDetailsPage() {
  const { id } = useParams();
    const isOnline = useOnlineStatus();

  const { data: driver, isPending, isError, error } = useDriver(id);

  if (isPending) {
    return (
      <div className="space-y-5">
        <div className="h-8 w-32 animate-pulse rounded bg-surface-2" />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-32 animate-pulse rounded-xl bg-surface-2" />
          <div className="h-32 animate-pulse rounded-xl bg-surface-2" />
          <div className="h-32 animate-pulse rounded-xl bg-surface-2" />
        </div>
      </div>
    );
  }

  if (isError || !driver) {
    console.error("Driver details error:", error);

    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <p className="text-sm font-medium text-danger">
          {isOnline
            ? "دریافت اطلاعات راننده انجام نشد"
            : "اتصال به اینترنت برقرار نیست"}
        </p>

        <p className="mt-2 text-sm text-text-2">
          {isOnline
            ? "لطفاً دوباره تلاش کنید."
            : "برای دریافت اطلاعات راننده، اتصال اینترنت خود را بررسی کنید."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col  gap-3">
       <BackButton to="/admin/drivers" title="برگشت به رانندگان" />

        <div>
          <h1 className="text-xl font-bold text-text">{driver.name}</h1>

          <p className="mt-1 text-sm text-text-2">اطلاعات راننده</p>
        </div>
      </div>

      {/* Driver Info */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-text-2">
            <User className="h-4 w-4" />

            <span className="text-xs">نام و نام خانوادگی</span>
          </div>

          <p className="mt-3 font-semibold text-text">{driver.name}</p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-text-2">
            <Phone className="h-4 w-4" />

            <span className="text-xs ">شماره موبایل</span>
          </div>

          <a
            href={`tel:${driver.phone}`}
            
            className="
              mt-3
              block
              font-mono
              text-sm
              text-text
              hover:text-primary
            "
          >
            {toPersianDigits(driver.phone)}
          </a>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-text-2">
            <CalendarDays className="h-4 w-4" />

            <span className="text-xs">تاریخ ثبت</span>
          </div>

          <p className="mt-3 font-mono text-sm text-text">
            {new Date(driver.created_at).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>

      {/* Vehicles */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-text">خودروهای مرتبط</h2>

            <p className="mt-1 text-xs text-text-2">
              خودروهایی که این راننده با آن‌ها مرتبط است
            </p>
          </div>

          <span className="text-sm text-primary-dark bg-primary/10 rounded-lg p-1">
            {driver.vehicles.length.toLocaleString("fa-IR")} خودرو
          </span>
        </div>

        {driver.vehicles.length ? (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {driver.vehicles.map((vehicle) => (
              <Link to={ `/admin/vehicles/${vehicle.id}`}
                key={vehicle.id}
                className=" group
                  rounded-xl
                  border border-border
                  bg-surface
                  p-4
                  transition-all duration-200 ease-in-out
                 hover:-translate-y-0.5 hover:shadow-lg
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono font-bold text-text">
                      {vehicle.plate ?? vehicle.transit_code ?? "بدون شناسه"}
                    </div>

                    <div className="mt-1 text-xs text-text-2">
                      <VehicleLabel value={vehicle.vehicle_type} />
                    </div>
                  </div>

                  <Truck className="h-5 w-5 text-text-2" />
                </div>

                <div className="mt-4">
                  <StatusBadge status={vehicle.status} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface p-6 text-center text-sm text-text-2">
            این راننده خودروی مرتبطی ندارد
          </div>
        )}
      </section>

      {/* Requests */}
      <section>
        <div className="mb-3">
          <h2 className="font-semibold text-text">درخواست‌های راننده</h2>

          <p className="mt-1 text-xs text-text-2">
            تاریخچه درخواست‌های ثبت‌شده توسط این راننده
          </p>
        </div>

        {driver.requests.length ? (
          <div className="overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-200 text-right">
              <thead className="border-b border-border bg-surface-2">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold text-text-2">
                    درخواست
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-text-2">
                    خودرو
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-text-2">
                    بارها
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-text-2">
                    تاریخ
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold text-text-2">
                    وضعیت
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {driver.requests.map((request) => (
                  <tr
                    key={request.id}
                    className="transition-colors hover:bg-surface-2"
                  >
                    <td className="px-4 py-4">
                      <Link
                        to={`/admin/requests/${request.id}`}
                        className="
                          font-mono
                          text-sm
                          font-bold
                          text-primary
                          hover:text-primary-dark
                          hover:underline
                        "
                      >
                        {request.tracking_code}
                      </Link>
                    </td>

                    <td className="px-4 py-4">
                      {request.vehicle ? (
                        <div>
                          <div className="font-mono text-sm text-text">
                            {request.vehicle.plate ??
                              request.vehicle.transit_code ??
                              "بدون شناسه"}
                          </div>

                          <div className="mt-1 text-xs text-text-2">
                            <VehicleLabel
                              value={request.vehicle.vehicle_type}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-text-2">بدون خودرو</span>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-sm text-text">
                        {request.loads.length.toLocaleString("fa-IR")}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="font-mono text-sm text-text-2">
                        {new Date(request.created_at).toLocaleDateString(
                          "fa-IR",
                        )}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={request.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-text-2">
            هنوز درخواستی برای این راننده ثبت نشده است
          </div>
        )}
      </section>
    </div>
  );
}
