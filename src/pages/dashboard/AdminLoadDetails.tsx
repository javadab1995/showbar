import {
  ArrowRight,
  Pencil,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  loads,
  requests,
  drivers,
  vehicles,
  money,
} from "../../data/mock";

import { StatusBadge } from "../../components/ui/StatusBadge";

export function AdminLoadDetails() {
  const { id } = useParams();

  const load = loads.find((item) => item.id === id);

  if (!load) {
    return (
      <div
        className="
          flex min-h-100
          items-center justify-center
          text-sm text-text-2
        "
      >
        بار پیدا نشد
      </div>
    );
  }

  const loadRequests = requests.filter(
    (request) =>
      request.loadIds.includes(load.id),
  );

  const information = [
    {
      label: "نوع بار",
      value: load.cargo,
    },
    {
      label: "وزن",
      value: `${load.weight} تن`,
    },
    {
      label: "نوع خودرو",
      value: load.vehicle,
    },
    {
      label: "تاریخ بارگیری",
      value: load.date,
    },
    {
      label: "کرایه",
      value: money(load.price),
    },
    {
      label: "تاریخ ثبت",
      value: load.createdAt,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-6">

      {/* Back */}
      <Link
        to="/admin/loads"
        className="
          mb-5
          inline-flex
          items-center
          gap-1.5
          text-sm
          text-text-2
          transition-colors
          hover:text-primary
        "
      >
        <ArrowRight size={17} />
        بازگشت
      </Link>

      {/* Header */}
      <div
        className="
          mb-6
          flex flex-col
          gap-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="min-w-0">

          <div
            className="
              flex flex-wrap
              items-center
              gap-3
            "
          >
            <h1
              className="
                text-xl
                font-bold
                text-text
                sm:text-2xl
              "
            >
              {load.origin}
              <span className="mx-2 text-text-2">
                ←
              </span>
              {load.destination}
            </h1>

            <StatusBadge status={load.status} />
          </div>

          <p
            className="
              mt-2
              text-sm
              text-text-2
            "
          >
            {load.cargo}
            <span className="mx-2 text-border">
              ·
            </span>
            {load.weight} تن
            <span className="mx-2 text-border">
              ·
            </span>
            {load.vehicle}
          </p>
        </div>

        <Link
          to={`/admin/loads/${load.id}/edit`}
          className="
            inline-flex
            h-9
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-lg
            border border-border
            bg-surface
            px-4
            text-sm
            font-medium
            text-text
            transition-colors
            hover:border-primary
            hover:text-primary
          "
        >
          <Pencil size={16} />
          ویرایش
        </Link>
      </div>

      {/* Main */}
      <div
        className="
          grid
          gap-5
          lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]
        "
      >

        {/* Left */}
        <div className="space-y-5">

          {/* Load information */}
          <section
            className="
              rounded-xl
              border border-border
              bg-surface
            "
          >
            <div
              className="
                border-b border-border
                px-5 py-4
              "
            >
              <h2
                className="
                  text-sm
                  font-semibold
                  text-text
                "
              >
                اطلاعات بار
              </h2>
            </div>
<div
              className="
                grid
                grid-cols-1
                divide-y divide-border
                sm:grid-cols-2
                sm:divide-y-0
              "
            >
              {information.map((item) => (
                <div
                  key={item.label}
                  className="
                    flex
                    min-h-16
                    flex-col
                    justify-center
                    gap-1
                    px-5 py-3
                    sm:odd:border-l
                    sm:nth-[-n+4]:border-b
                    sm:nth-5:border-b-0
                    sm:nth-6:border-b-0
                    sm:nth-5:border-l
                  "
                >
                  <span
                    className="
                      text-xs
                      text-text-2
                    "
                  >
                    {item.label}
                  </span>

                  <b
                    className="
                      text-sm
                      font-medium
                      text-text
                    "
                  >
                    {item.value}
                  </b>
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section
            className="
              rounded-xl
              border border-border
              bg-surface
            "
          >
            <div
              className="
                border-b border-border
                px-5 py-4
              "
            >
              <h2
                className="
                  text-sm
                  font-semibold
                  text-text
                "
              >
                توضیحات و الزامات
              </h2>
            </div>

            <div className="p-5">

              {load.description && (
                <p
                  className="
                    mb-4
                    text-sm
                    leading-7
                    text-text-2
                  "
                >
                  {load.description}
                </p>
              )}

              {load.requirements.length > 0 && (
                <div className="space-y-2">
                  {load.requirements.map(
                    (requirement) => (
                      <div
                        key={requirement}
                        className="
                          flex
                          items-center
                          gap-2
                          rounded-lg
                          bg-primary-soft
                          px-3 py-2.5
                          text-sm
                          text-text
                        "
                      >
                        <span
                          className="
                            flex size-5
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-primary
                            text-xs
                            text-surface
                          "
                        >
                          ✓
                        </span>

                        {requirement}
                      </div>
                    ),
                  )}
                </div>
              )}

              {!load.description &&
                !load.requirements.length && (
                  <p
                    className="
                      text-sm
                      text-text-2
                    "
                  >
                    توضیح یا الزام خاصی ثبت نشده است.
                  </p>
                )}
            </div>
          </section>
        </div>
{/* Requests */}
        <section
          className="
            h-fit
            rounded-xl
            border border-border
            bg-surface
          "
        >
          {/* Section header */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b border-border
              px-5 py-4
            "
          >
            <h2
              className="
                text-sm
                font-semibold
                text-text
              "
            >
              درخواست‌های این بار
            </h2>

            <span
              className="
                rounded-full
                bg-primary-soft
                px-2.5 py-1
                text-xs
                font-medium
                text-primary
              "
            >
              {loadRequests.length} درخواست
            </span>
          </div>

          {/* Requests */}
          <div className="divide-y divide-border">

            {loadRequests.map((request) => {
              const driver = drivers.find(
                (item) =>
                  item.id === request.driverId,
              );

              const vehicle = vehicles.find(
                (item) =>
                  item.id === request.vehicleId,
              );

              if (!driver || !vehicle) {
                return null;
              }

              return (
                <div
                  key={request.id}
                  className="
                    flex
                    flex-col
                    gap-4
                    px-5 py-4
                    transition-colors
                    hover:bg-primary-soft/30
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >
                  {/* Driver / vehicle */}
                  <div
                    className="
                      min-w-0
                      space-y-1
                    "
                  >
                    <b
                      className="
                        block
                        text-sm
                        font-semibold
                        text-text
                      "
                    >
                      {driver.name}
                    </b>

                    <small
                      className="
                        block
                        text-xs
                        text-text-2
                      "
                    >
                      {driver.phone}
                    </small>

                    <small
                      className="
                        block
                        text-xs
                        text-text-2
                      "
                    >
                      پلاک:{" "}
                      <span className="font-medium text-text">
                        {vehicle.plate}
                      </span>

                      <span className="mx-1.5 text-border">
                        ·
                      </span>

                      {vehicle.transitId}
                    </small>
                  </div>

                  {/* Actions */}
                  <div
                    className="
                      flex
                      shrink-0
                      items-center
                      justify-between
                      gap-3
                      sm:flex-col
                      sm:items-end
                    "
                  >
                    <StatusBadge
                      status={request.status}
                    />

                    <Link
                      to={`/admin/requests/${request.id}`}
                      className="
inline-flex
                        h-8
                        items-center
                        justify-center
                        rounded-md
                        border border-border
                        px-3
                        text-xs
                        font-medium
                        text-text-2
                        transition-colors
                        hover:border-primary
                        hover:text-primary
                      "
                    >
                      مشاهده
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Empty */}
            {!loadRequests.length && (
              <div
                className="
                  px-5 py-12
                  text-center
                "
              >
                <p
                  className="
                    text-sm
                    text-text-2
                  "
                >
                  هنوز درخواستی برای این بار
                  ثبت نشده است.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}