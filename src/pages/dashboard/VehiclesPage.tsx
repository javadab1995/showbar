import {
  CarFront,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Table,
} from "lucide-react";
import { Link } from "react-router-dom";
import { vehicles } from "../../data/mock";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { TableFooter } from "../../components/ui/TableFooter";

export function VehiclesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-text">ناوگان خودروها</h2>
          <p className="text-text-2 mt-1">
            مدیریت متمرکز خودروها و تخصیص رانندگان
          </p>
        </div>
        <button className=" rounded-md w-full transition-colors flex justify-center items-center gap-1.5 cursor-pointer   text-surface primary bg-primary-radial p-2.5 h-12 max-w-48">
          <Plus className="w-5 h-5" /> <span>افزودن خودروی جدید</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-surface p-4 rounded-2xl border border-border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-text-2 w-5 h-5" />
          <input
            placeholder="جستجوی پلاک یا شناسه ترانزیتی..."
            className="w-full pl-4 pr-10 py-3 bg-surface-2 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-text"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-3 bg-surface-2 border border-border rounded-xl text-text outline-none cursor-pointer hover:border-primary transition-colors">
            <option>همه انواع خودرو</option>
            <option>تریلی</option>
            <option>کامیون</option>
            <option>تانکر</option>
          </select>
          <button className="px-4 py-3 bg-surface-2 border border-border rounded-xl text-text-2 hover:text-primary transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modern Data Grid */}
      <div className="bg-surface border border-border rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-surface-2 border-b border-border text-text-2 text-sm">
              <th className="p-5 font-medium">پلاک / شناسه</th>
              <th className="p-5 font-medium">نوع خودرو</th>
              <th className="p-5 font-medium">رانندگان</th>
              <th className="p-5 font-medium">وضعیت</th>
              <th className="p-5 font-medium text-left">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {vehicles.map((v) => (
              <tr
                key={v.id}
                className="hover:bg-surface-2/50 transition-colors group"
              >
                <td className="p-5">
                  <div className="flex flex-col">
                    <Link
                      to={`/admin/vehicles/${v.id}`}
                      className="font-mono font-bold text-lg text-text hover:text-primary transition-colors"
                    >
                      {v.plate}
                    </Link>
                    <span className="text-xs text-text-2 font-mono mt-0.5">
                      {v.transitId}
                    </span>
                  </div>
                </td>
                <td className="p-5 text-text">{v.type}</td>
                <td className="p-5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {v.drivers.length} راننده
                  </span>
                </td>
                <td className="p-5">
                  <StatusBadge
                    status={v.status === "فعال" ? "فعال" : "لغو شده"}
                  />
                </td>
                <td className="p-5 text-left">
                  <Link
                    to={`/admin/vehicles/${v.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 hover:bg-primary hover:text-white rounded-xl transition-all text-sm font-medium"
                  >
                    <CarFront className="w-4 h-4" /> جزئیات
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter
          totalItems={10}
          pageSize={1}
          currentPage={1}
          onPageSizeChange={() => {}}
          onPageChange={() => {}}
        />
      </div>
    </div>
  );
}
