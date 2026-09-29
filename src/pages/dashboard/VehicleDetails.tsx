import {
  ArrowRight,
  UserRound,
  Truck,
  History,
  Package,
  Phone,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { StatusBadge } from "../../components/ui/StatusBadge";
import Spinner from "../../components/widgets/Spinner";
import VehicleLabel from "../../components/labels/VehicleLabel";

import { useVehicleDetails } from "../../hooks/admin/useVehicleDetails";
import { toPersianDigits } from "../../helpers/number";
import VehiclePlate from "../../components/ui/VehiclePlate";


export function VehicleDetails() {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, isError } = useVehicleDetails(id);


  if (isPending) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-20 text-center text-sm text-text-2">
        خودرو پیدا نشد.
      </div>
    );
  }

  const { vehicle, drivers, assignments, requests } = data;

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/vehicles"
          className="
            flex items-center gap-2
            text-sm font-medium
            text-text-2
            transition-colors
            hover:text-primary
          "
        >
          <ArrowRight size={16} />
          بازگشت به خودروها
        </Link>

        <StatusBadge status={vehicle.status} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Vehicle Info */}
        <section
          className="
            space-y-5
            rounded-2xl
            border border-border
            bg-surface
            p-6
            lg:col-span-2
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-primary/10
                text-primary
              "
            >
              <Truck size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-text">
                <VehicleLabel value={vehicle.vehicle_type} />
              </h1>
            </div>
          </div>

          <div
            className="
              rounded-xl
              border border-border
              bg-bg
              p-5
            "
          >
            <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
              <InfoItem
                label="نوع شناسه"
                value={vehicle.identifier_type === "PLATE" ? "پلاک" : "ترانزیت"}
              />
              <VehiclePlate
                type={vehicle.identifier_type}
                value={vehicle.transit_code || vehicle.plate}
              />
            </div>
          </div>
        </section>

        {/* Drivers */}
        <section
          className="
            h-fit
            rounded-2xl
            border border-border
            bg-surface
          "
        >
          <Header
            icon={<UserRound size={18} />}
            title="رانندگان"
            count={drivers.length}
          />

          <div className="space-y-2 p-4">
            {drivers.length === 0 ? (
              <Empty text="راننده‌ای ثبت نشده است" />
            ) : (
              drivers?.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex items-center gap-3
                    rounded-xl
                    bg-surface-2
                    p-3
                  "
                >
                  <div
                    className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                    "
                  >
                    <UserRound size={18} />
                  </div>

                  <div>
                    <p className="font-medium text-text">{item.driver?.name}</p>

                    <p className="flex items-center gap-1 text-xs text-text-2">
                      <Phone size={12} />
                      {toPersianDigits(item?.driver?.phone)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Assignments History */}
      <section
        className="
          rounded-2xl
          border border-border
          bg-surface
        "
      >
        <Header
          icon={<History size={18} />}
          title="سوابق حمل"
          count={assignments.length}
        />

        <div className="divide-y divide-border">
          {assignments.length === 0 ? (
            <Empty text="سابقه حملی ثبت نشده است" />
          ) : (
            assignments.map((item) => (
              <div
                key={item.id}
                className="
                  flex flex-col gap-3
                  p-5
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-text">
                    <Package size={16} />

                    {item.load?.origin}

                    <span>→</span>

                    {item.load?.destination}
                  </div>

                  <p className="mt-2 text-sm text-text-2">
                    راننده: {item.driver?.name}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Requests */}
      <section
        className="
          rounded-2xl
          border border-border
          bg-surface
        "
      >
        <Header
          icon={<History size={18} />}
          title="درخواست‌های ثبت شده"
          count={requests.length}
        />

        <div className="divide-y divide-border">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-5"
            >
              <div>
                <p className="font-medium text-text">{request.driver?.name}</p>

                <p className="text-xs text-text-2">
                  {request.loads.length} بار انتخاب شده
                </p>
              </div>

              <StatusBadge status={request.status} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Header({
  icon,
  title,
  count,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
}) {
  return (
    <div
      className="
        flex items-center justify-between
        border-b border-border
        p-5
      "
    >
      <h3 className="flex items-center gap-2 font-bold text-text">
        <span className="text-primary">{icon}</span>
        {title}
      </h3>

      <span
        className="
          rounded-full
          bg-surface-2
          px-2.5 py-1
          text-xs
          text-text-2
        "
      >
        {count}
      </span>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-text-2">{label}</p>

      <p className="mt-1 font-medium text-text">{value}</p>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="p-8 text-center text-sm text-text-2">{text}</div>;
}
