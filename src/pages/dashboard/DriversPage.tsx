import { Search } from "lucide-react";
import { drivers, vehicles } from "../../data/mock";
import { StatusBadge } from "../../components/ui/StatusBadge";


export function DriversPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text">رانندگان</h2>
        <p className="text-text-2 text-sm">مدیریت رانندگان و خودروهای مرتبط</p>
      </div>

      {/* Toolbar */}
      <div className="bg-surface border border-border p-4 rounded-xl flex items-center">
        <div className="relative w-full md:w-96">
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted">
            <Search size={18} />
          </span>
          <input
            placeholder="جستجوی نام، موبایل، پلاک یا شناسه..."
            className="w-full pl-4 pr-10 py-2.5 bg-surface-2 border border-border rounded-lg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto bg-surface border border-border rounded-xl shadow-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-text-2 text-xs font-semibold select-none">
              <th className="p-4">نام</th>
              <th className="p-4">شماره موبایل</th>
              <th className="p-4">خودروهای مرتبط</th>
              <th className="p-4">آخرین درخواست</th>
              <th className="p-4">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-sm text-text">
            {drivers.map((d) => (
              <tr
                key={d.id}
                className="hover:bg-surface-2/40 transition-colors"
              >
                <td className="p-4 font-medium">{d.name}</td>
                <td className="p-4 font-mono text-text-2">{d.phone}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {d.vehicleIds.map((id) => {
                      const vehicle = vehicles.find((v) => v.id === id);
                      return vehicle ? (
                        <span
                          key={id}
                          className="px-2 py-0.5 rounded-md bg-surface-2 border border-border text-xs text-text-2 font-mono"
                        >
                          {vehicle.plate}
                        </span>
                      ) : null;
                    })}
                  </div>
                </td>
                <td className="p-4 text-text-2">{d.lastRequest}</td>
                <td className="p-4">
                  <StatusBadge
                    status={d.status === "فعال" ? "فعال" : "لغو شده"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
