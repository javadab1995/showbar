import { Copy, Edit, Eye, Plus, Search, StopCircle, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loads, money } from "../../data/mock";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { TableFooter } from "../../components/ui/TableFooter";
import { EmptyState } from "../../components/ui/EmptyState";
import { Modal } from "../../components/ui/Modal";
import { Button } from "../../components/buttons/Button";
import DropdownMenu from "../../components/dropdown/DropdownMenu";

export function AdminLoads() {
  const [q, setQ] = useState("");
  const [del, setDel] = useState(false);
  const navigate = useNavigate()
  
  const data = loads.filter(
    (l) => (l.origin + l.destination + l.cargo + l.vehicle).includes(q) || !q,
  );

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text">بارها</h2>
          <p className="text-text-2 text-sm">
            مدیریت و پیگیری همه بارهای ثبت‌شده
          </p>
        </div>
        <Button className="bg-primary-radial p-2.5 h-12 max-w-48 text-surface rounded-md hover:opacity-90 hidden md:flex justify-center items-center">
          <Link className="flex items-center gap-2.5 " to="/admin/loads/new">
            <Plus size={20} /> افزودن بار
          </Link>
        </Button>
      </div>

      {/* Toolbar - Search & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-surface border border-border p-4 rounded-xl">
        {/* Searchbox */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted">
            <Search size={18} />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="جستجوی مسیر، بار یا خودرو..."
            className="w-full pl-4 pr-10 py-2.5 bg-surface-2 border border-border rounded-lg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select className="px-3 py-2.5 bg-surface-2 border border-border rounded-lg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer">
            <option>همه وضعیت‌ها</option>
            <option>فعال</option>
            <option>رزرو شده</option>
            <option>تکمیل شده</option>
          </select>

          <select className="px-3 py-2.5 bg-surface-2 border border-border rounded-lg text-text text-sm focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer">
            <option>جدیدترین</option>
            <option>قدیمی‌ترین</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      {data.length ? (
        <div className="w-full overflow-x-auto bg-surface border border-border rounded-xl shadow-sm">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-text-2 text-xs font-semibold select-none">
                <th className="p-4">مسیر</th>
                <th className="p-4">نوع بار</th>
                <th className="p-4">وزن</th>
                <th className="p-4">خودرو</th>
                <th className="p-4">تاریخ بارگیری</th>
                <th className="p-4">کرایه</th>
                <th className="p-4">وضعیت</th>
                <th className="p-4">تاریخ ثبت</th>
                <th className="p-4 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm text-text">
              {data.map((l) => (
                <tr
                  key={l.id}
                  className="hover:bg-surface-2/40 transition-colors"
                >
                  <td className="p-4">
                    <Link
                      className="font-medium text-primary hover:text-primary-dark transition-colors"
                      to={`/admin/loads/${l.id}`}
                    >
                      {l.origin} ← {l.destination}
                    </Link>
                  </td>
                  <td className="p-4">{l.cargo}</td>
                  <td className="p-4 font-mono">{l.weight} تن</td>
                  <td className="p-4">{l.vehicle}</td>
                  <td className="p-4">{l.date}</td>
                  <td className="p-4 font-mono text-primary font-medium">
                    {money(l.price)}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={l.status} />
                  </td>
                  <td className="p-4 text-xs text-text-2">{l.createdAt}</td>
                  <td className="p-4 text-center">
                    <DropdownMenu
                      items={[
                        {
                          label: "مشاهده بار",
                          icon: Eye,
                          onClick: () => {
                            navigate(`/admin/loads/${l.id}`);
                          },
                        },
                        {
                          label: "ویرایش بار",
                          icon: Edit,
                          onClick: () => {
                             navigate( `/admin/loads/${l.id}/edit`)
                          },
                        },
                        {
                          label: "تکرار",
                          icon: Copy,
                          onClick: () => {
                            
                          },
                        },
                        {
                          label: "حذف کامل",
                          icon: Trash,
                          onClick: () => {
                            setDel(true)
                          },
                          danger:true,
                        },
                        {
                          label: "غیرفعال",
                          icon: StopCircle,
                          onClick: () => {
                            
                          },
                          warning:true
                        },

                      ]}
                    />
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
      ) : (
        <EmptyState title="باری وجود ندارد" text="عبارت جستجو را تغییر دهید." />
      )}

      {/* Delete Confirmation Modal */}
      <Modal open={del} title="حذف بار" onClose={() => setDel(false)}>
        <div className="space-y-4">
          <p className="text-text-2 text-sm leading-relaxed">
            آیا از حذف این بار مطمئن هستید؟ این عملیات قابل بازگشت نیست.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              className="border border-border p-2.5 h-12 max-w-48 text-text"
              variant="secondary"
              onClick={() => setDel(false)}
            >
              انصراف
            </Button>
            {/* با استفاده از واریانت خطر که به رنگ danger نقشه دارد */}
            <Button
              className="border border-danger text-text p-2.5 h-12 max-w-48 bg-danger/10 "
              variant="danger"
              onClick={() => setDel(false)}
            >
              حذف بار
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
