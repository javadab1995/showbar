import { ArrowLeft, CarFront, ClipboardList, Plus, Truck, TruckIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { loads, requests, vehicles, drivers, money } from "../../data/mock";

import { Button } from "../../components/buttons/Button";
import { StatusBadge } from "../../components/ui/StatusBadge";
import SeeAllBtn from "../../components/buttons/SeeAllBtn";

export function Dashboard() {
  const active = loads.filter((x) => x.status === "فعال").length;
  const pending = requests.filter((x) => x.status === "در انتظار بررسی").length;


  const kpiItems = [
    { label: "بارهای فعال", value: active, icon: Truck },
    { label: "درخواست‌های جدید", value: pending, icon: ClipboardList },
    {
      label: "بارهای رزرو شده",
      value: loads.filter((x) => x.status === "رزرو شده").length,
      icon: Truck,
    },
    {
      label: "بارهای تکمیل شده",
      value: loads.filter((x) => x.status === "تکمیل شده").length,
      icon: Truck,
    },
  ];

  return (
    <div className="space-y-8 ">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-1.5">
        <div>
          <h2 className="text-2xl font-bold text-text">خوش آمدید 👋</h2>
          <p className="text-text-2">
            وضعیت عملیاتی ShowBar را از اینجا بررسی کنید.
          </p>
        </div>
        <Button className="bg-primary-radial p-2.5 h-12 max-w-48 text-surface rounded-md hover:opacity-90 hidden md:flex justify-center items-center">
          <Link className="flex items-center gap-2.5 " to="/admin/loads/new">
            <Plus size={20} /> افزودن بار
          </Link>
        </Button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiItems.map((item) => (
          <div
            key={item.label}
            className="bg-surface border border-border p-5 rounded-xl shadow-sm flex items-center gap-4"
          >
            <div className="p-3 bg-primary-soft rounded-lg text-primary">
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-text-2 font-medium">{item.label}</p>
              <p className="text-2xl font-bold text-text">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Loads */}
        <section className="bg-surface border border-border rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-text">آخرین بارها</h3>
          </div>
          <div className="space-y-1">
            {loads.slice(0, 5).map((l) => (
              <div
                key={l.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-2 transition-colors"
              >
                <div>
                  <p className="font-semibold text-text">
                    {l.origin} ← {l.destination}
                  </p>
                  <p className="text-xs text-text-2">
                    {l.cargo} · {l.weight} تن · {money(l.price)}
                  </p>
                </div>
                <StatusBadge status={l.status} />
              </div>
            ))}
          </div>
        </section>

        {/* Pending Requests */}
        <section className="bg-surface border border-border rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-text">
              درخواست‌های در انتظار بررسی
            </h3>
            <SeeAllBtn to="/admin/requests" />
            
          </div>
          <div className="space-y-1">
            {requests
              .filter((r) => r.status === "در انتظار بررسی")
              .map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-2 transition-colors"
                >
                  <div>
                    <p className="font-semibold text-text">{r.id}</p>
                    <p className="text-xs text-text-2">
                      {drivers.find((d) => d.id === r.driverId)?.name} ·{" "}
                      {vehicles.find((v) => v.id === r.vehicleId)?.plate}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
          </div>
        </section>
      </div>

      {/* Quick Actions Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "افزودن بار", icon: Plus, to: "/admin/loads/new" },
          {
            label: "مشاهده درخواست‌ها",
            icon: ClipboardList,
            to: "/admin/requests",
          },
          { label: "مشاهده خودروها", icon: TruckIcon, to: "/admin/vehicles" },
        ].map((action) => (
          <Button key={action.label}>
            <Link
              to={action.to}
              className="flex items-center justify-center gap-3 p-4  transition-all font-medium"
            >
              <action.icon size={20} className="text-surface" /> {action.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
