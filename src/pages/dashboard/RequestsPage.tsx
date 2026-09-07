import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { requests, drivers, vehicles, loads } from "../../data/mock";

import { useState } from "react";
import { StatusBadge } from "../../components/ui/StatusBadge";

export function RequestsPage() {
  const [activeTab, setActiveTab] = useState("همه");
  const tabs = ["همه", "جدید", "در انتظار بررسی", "تأیید شده", "رد شده"];

  return (
    <div className=" mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">درخواست‌ها</h2>
          <p className="text-text-2 text-sm mt-1">
            بررسی درخواست‌های رانندگان بر اساس خودرو
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-2 overflow-x-auto pb-px">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 whitespace-nowrap -mb-px ${
              activeTab === tab
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-text-2 hover:text-text hover:border-border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar / Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-text-2">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="جستجوی پلاک، شناسه ترانزیتی یا راننده..."
            className="w-full pl-3 pr-10 py-2 bg-surface border border-border rounded-lg text-sm text-text placeholder:text-text-2/60 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Responsive Table Wrapper */}
      <div className=" border border-border rounded-xl shadow-sm overflow-hidden mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-surface-2 border-b border-border/80 text-text-2 text-xs font-semibold">
                <th className="px-6 py-4">خودرو</th>
                <th className="px-6 py-4">راننده</th>
                <th className="px-6 py-4">بارهای انتخاب‌شده</th>
                <th className="px-6 py-4">تاریخ</th>
                <th className="px-6 py-4">وضعیت</th>
                <th className="px-6 py-4 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {requests.map((r) => {
                const d = drivers.find((x) => x.id === r.driverId)!;
                const v = vehicles.find((x) => x.id === r.vehicleId)!;

                return (
                  <tr
                    key={r.id}
                    className="hover:bg-surface-2/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-text font-mono">
                        {v.plate}
                      </div>
                      <div className="text-xs text-text-2 font-mono mt-0.5">
                        {v.transitId} · {v.type}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-text">{d.name}</div>
                      <div className="text-xs text-text-2 font-mono mt-0.5">
                        {d.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-sm text-text max-w-xs truncate"
                        title={r.loadIds
                          .map(
                            (id) =>
                              loads.find((l) => l.id === id)?.origin +
                              " ← " +
                              loads.find((l) => l.id === id)?.destination,
                          )
                          .join("، ")}
                      >
                        {r.loadIds
                          .map(
                            (id) =>
                              loads.find((l) => l.id === id)?.origin +
                              " ← " +
                              loads.find((l) => l.id === id)?.destination,
                          )
                          .join("، ")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-2 font-mono">
                      {r.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="px-6 py-4 text-left">
                      <Link
                        className="inline-flex items-center justify-center px-3 py-1.5 bg-surface-2 hover:bg-border border border-border text-xs font-semibold text-text rounded-md transition-colors"
                        to={`/admin/requests/${r.id}`}
                      >
                        بررسی
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
