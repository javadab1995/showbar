import { ArrowRight, CheckCircle2, User, Truck, Package } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useState } from "react";
import { drivers, loads, requests, vehicles } from "../../data/mock";
import { Button } from "../../components/buttons/Button";
import { Modal } from "../../components/ui/Modal";

export function RequestDetails() {
  const { id } = useParams();
  const r = requests.find((x) => x.id === id);
  const [confirm, setConfirm] = useState<string | null>(null);

  if (!r) return <div className="p-8 text-text-2">درخواست پیدا نشد</div>;

  const d = drivers.find((x) => x.id === r.driverId)!;
  const v = vehicles.find((x) => x.id === r.vehicleId)!;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/requests"
          className="flex items-center gap-2 text-sm text-text-2 hover:text-primary transition-colors"
        >
          <ArrowRight className="w-4 h-4" /> بازگشت به درخواست‌ها
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-text">جزئیات درخواست</h2>
        <p className="text-text-2 font-mono text-sm mt-1">
          {r.id} · {r.createdAt}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Column */}
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-border p-6 rounded-xl shadow-sm space-y-6">
            <h3 className="font-bold text-text flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary" /> اطلاعات خودرو
            </h3>
            <div className="space-y-4">
              {[
                { label: "پلاک", value: v.plate },
                { label: "شناسه ترانزیتی", value: v.transitId },
                { label: "نوع خودرو", value: v.type },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center bg-surface-2 p-3 rounded-lg border border-border/50"
                >
                  <span className="text-xs text-text-2">{item.label}</span>
                  <span className="font-mono font-bold text-text">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-bold text-text mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> راننده
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {d.name.slice(0, 1)}
                </div>
                <div>
                  <div className="font-bold text-text">{d.name}</div>
                  <div className="text-xs font-mono text-text-2">{d.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loads Column */}
        <section className="lg:col-span-2 bg-surface border border-border p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-text mb-6 flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" /> بارهای موردنظر راننده
          </h3>
          <div className="space-y-3">
            {r.loadIds.map((id) => {
              const l = loads.find((x) => x.id === id)!;
              return (
                <div
                  key={id}
                  className="flex items-center justify-between p-4 bg-surface-2 border border-border rounded-lg hover:border-primary/30 transition-all"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-text">
                      {l.origin} ← {l.destination}
                    </div>
                    <div className="text-xs text-text-2 font-mono">
                      {l.cargo} · {l.weight} تن · {l.date}
                    </div>
                  </div>
                  {l.status === "فعال" ? (
                    <Button onClick={() => setConfirm(id)}>
                      اختصاص
                    </Button>
                  ) : (
                    <span className="text-xs text-text-2 italic bg-surface p-2 rounded">
                      قابل تخصیص نیست
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={!!confirm}
        title="تأیید تخصیص بار"
        onClose={() => setConfirm(null)}
      >
        <div className="space-y-4">
          <p className="text-text-2">
            آیا این بار به خودرو{" "}
            <span className="font-mono font-bold text-text">{v.plate}</span>{" "}
            اختصاص داده شود؟
          </p>
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="secondary" onClick={() => setConfirm(null)}>
              انصراف
            </Button>
            <Button onClick={() => setConfirm(null)}>
              <CheckCircle2 className="w-4 h-4 ml-2" /> تأیید تخصیص
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
