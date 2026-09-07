import { ArrowRight, UserRound, Truck, History, Info } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { drivers, vehicles, requests } from "../../data/mock";
import { StatusBadge } from "../../components/ui/StatusBadge";


export function VehicleDetails() {
  const { id } = useParams();
  const v = vehicles.find((x) => x.id === id);

  if (!v)
    return <div className="text-center py-20 text-text-2">خودرو پیدا نشد</div>;

  const ds = drivers.filter((d) => v.drivers.includes(d.id));

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/vehicles"
          className="flex items-center gap-2 text-text-2 hover:text-primary transition-colors font-medium"
        >
          <ArrowRight className="w-4 h-4" /> بازگشت به لیست
        </Link>
        <StatusBadge status={v.status === "فعال" ? "فعال" : "لغو شده"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Vehicle Info */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-surface border border-border rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text">{v.type}</h2>
                <p className="text-text-2 mt-1">
                  شناسه ترانزیتی:{" "}
                  <span className="font-mono">{v.transitId}</span>
                </p>
              </div>
            </div>

            {/* Simulated Iranian Plate */}
            <div className="bg-white border-2 border-slate-800 rounded-lg p-2 w-fit mx-auto flex items-center font-mono text-4xl tracking-widest shadow-lg">
              <span className="bg-blue-700 text-white px-3 py-1 rounded-sm text-lg mr-3 flex flex-col items-center leading-none">
                <span className="text-[10px]">I.R.</span>
                <span className="text-[12px]">IRAN</span>
              </span>
              <span className="text-black font-bold">{v.plate}</span>
            </div>
          </section>

          {/* History */}
          <section className="bg-surface border border-border rounded-3xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border flex items-center gap-3">
              <History className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-text">تاریخچه درخواست‌ها</h3>
            </div>
            <div className="divide-y divide-border">
              {requests
                .filter((r) => r.vehicleId === v.id)
                .map((r) => (
                  <div
                    key={r.id}
                    className="p-5 flex items-center justify-between hover:bg-surface-2/50 transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-text">{r.id}</span>
                      <span className="text-sm text-text-2">{r.createdAt}</span>
                    </div>
                    <StatusBadge status={r.status} />
                  </div>
                ))}
            </div>
          </section>
        </div>

        {/* Right Column: Drivers */}
        <section className="bg-surface border border-border rounded-3xl shadow-sm h-fit">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-text flex items-center gap-2">
              <UserRound className="w-5 h-5 text-primary" /> رانندگان
            </h3>
            <span className="text-xs bg-surface-2 px-2 py-1 rounded-full text-text-2">
              {ds.length} نفر
            </span>
          </div>
          <div className="p-4 space-y-2">
            {ds.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-2/50 hover:bg-surface-2 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                  <UserRound className="w-5 h-5 text-text-2" />
                </div>
                <div>
                  <p className="font-bold text-text">{d.name}</p>
                  <p className="text-sm text-text-2 font-mono">{d.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
