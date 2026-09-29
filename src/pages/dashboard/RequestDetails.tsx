
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Hash,
  Package,
  Phone,
  Truck,
  User,
  XCircle,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { ReactNode, useState } from "react";

import { Button } from "../../components/buttons/Button";
import { Modal } from "../../components/ui/Modal";
import { StatusBadge } from "../../components/ui/StatusBadge";

import { useRequest } from "../../hooks/admin/useRequest";

import { formatMoney } from "../../helpers/formater";
import Spinner from "../../components/widgets/Spinner";
import { toPersianDigits } from "../../helpers/number";
import { toPersianDate } from "../../helpers/date";
import VehicleLabel from "../../components/labels/VehicleLabel";
import TradeTypeLabel from "../../components/labels/TradeTypeLabel";
import CargoTypeLabel from "../../components/labels/CargoTypeLabel";
import BackButton from "../../components/buttons/BackButton";
import { useAssignLoadToRequest, useRejectLoadFromRequest } from "../../hooks/admin/useRequestLoadMutations";
import toast from "react-hot-toast";

type ActionType = "assign" | "reject" | null;

export function RequestDetails() {
  const { id } = useParams<{ id: string }>();

  const [confirm, setConfirm] = useState<{
    type: ActionType;
    loadId: string | null;
  }>({
    type: null,
    loadId: null,
  });

  const {
    data: request,
    isPending,
    isError,
    error,
  } = useRequest(id);

   const assignMutation = useAssignLoadToRequest();
  const rejectMutation = useRejectLoadFromRequest();
  
  const isActionPending = assignMutation.isPending || rejectMutation.isPending;


  if (isPending) {
    return (
      <div className="flex justify-center items-center h-dvh w-full py-12 text-center text-sm text-text-2">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl">
        <div
          className="
            rounded-xl
            border border-danger/30
            bg-danger/5
            p-4
            text-sm text-danger
          "
        >
          {error instanceof Error
            ? error.message
            : "خطایی در دریافت اطلاعات درخواست رخ داد"}
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="mx-auto max-w-5xl py-12 text-center">
        <p className="text-text-2">
          درخواست پیدا نشد.
        </p>

        <Link
          to="/admin/requests"
          className="
            mt-4 inline-flex items-center gap-2
            text-sm font-medium text-primary
            hover:text-primary-dark
          "
        >
          <ArrowRight className="h-4 w-4" />
          بازگشت به درخواست‌ها
        </Link>
      </div>
    );
  }

  const selectedLoad =
    request.loads.find(
      (load) => load.id === confirm.loadId,
    );

  const isConfirmOpen = confirm.type !== null;


 
  const handleAssign = (loadId: string) => {
    setConfirm({
      type: "assign",
      loadId,
    });
  };

  const handleReject = (loadId: string) => {
    setConfirm({
      type: "reject",
      loadId,
    });
  };

  const handleConfirmAction = () => {
    if (!confirm.loadId || !confirm.type) {
      return;
    }

    if (confirm.type === "assign") {
      assignMutation.mutate(
        {
          requestId: request.id,
          loadId: confirm.loadId,
        },
        {
          onSuccess: () => {
            toast.success("بار با موفقیت تخصیص داده شد");
            setConfirm({
              type: null,
              loadId: null,
            });
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
          },
        },
      );

      return;
    }

    rejectMutation.mutate(
      {
        requestId: request.id,
        loadId: confirm.loadId,
      },
      {
        onSuccess: () => {
          setConfirm({
            type: null,
            loadId: null,
          });
          toast.success("این بار درخواست با موفقیت رد شد.")

        },
        onError: (err) => {
          toast.error(err.message);
        
        }
      },
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Back */}
      <div>
        <BackButton to="/admin/requests" title="بازگشت به درخواست ها" />
      </div>

      {/* Header */}
      <header
        className="
          flex flex-col gap-4
          sm:flex-row sm:items-start
          sm:justify-between
        "
      >
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-text">جزئیات درخواست</h2>

            <StatusBadge status={request.status} />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-2">
            <span className="inline-flex items-center gap-1.5">
              <Hash className="h-4 w-4" />

              <span className="font-mono">{request.tracking_code}</span>
            </span>

            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />

              {new Date(request.created_at).toLocaleDateString("fa-IR")}
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Driver + Vehicle */}
        <section className="space-y-6 lg:col-span-1">
          {/* Driver */}
          <div
            className="
              space-y-5
              rounded-xl
              border border-border
              bg-surface
              p-5
            "
          >
            <h3 className="flex items-center gap-2 font-bold text-text">
              <User className="h-4 w-4 text-primary" />
              اطلاعات راننده
            </h3>

            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-primary/10
                  text-primary
                  font-bold
                "
              >
                {request.driver.name.slice(0, 1)}
              </div>

              <div className="min-w-0">
                <p className="truncate font-bold text-text">
                  {request.driver.name}
                </p>

                <a
                  href={`tel:${request.driver.phone}`}
                  className="
                    mt-1
                    flex items-center gap-1.5
                    text-xs text-text-2
                    hover:text-primary
                  "
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span dir="ltr">{toPersianDigits(request.driver.phone)}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Vehicle */}
          <div
            className="
              space-y-5
              rounded-xl
              border border-border
              bg-surface
              p-5
            "
          >
            <h3 className="flex items-center gap-2 font-bold text-text">
              <Truck className="h-4 w-4 text-primary" />
              اطلاعات خودرو
            </h3>

            <div className="space-y-2.5">
              <InfoRow
                label="نوع خودرو"
                value={<VehicleLabel value={request.vehicle.vehicle_type} />}
              />

              <InfoRow
                label="پلاک"
                value={request.vehicle.plate ?? "ثبت نشده"}
                mono
              />

              <InfoRow
                label="شناسه ترانزیتی"
                value={request.vehicle.transit_code ?? "ثبت نشده"}
                mono
              />
            </div>
          </div>
        </section>

        {/* Loads */}
        <section
          className="
            rounded-xl
            border border-border
            bg-surface
            p-5
            lg:col-span-2
          "
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 font-bold text-text">
                <Package className="h-4 w-4 text-primary" />
                بارهای موردنظر راننده
              </h3>

              <p className="mt-1 text-xs text-text-2">
                بارهایی که این راننده در این درخواست انتخاب کرده است.
              </p>
            </div>

            <span
              className="
                shrink-0 rounded-full
                bg-surface-2
                px-2.5 py-1
                text-xs font-medium text-text-2
              "
            >
              {request.loads.length} بار
            </span>
          </div>

          {request.loads.length === 0 ? (
            <div
              className="
                rounded-lg
                border border-dashed border-border
                py-10
                text-center
                text-sm text-text-2
              "
            >
              این درخواست هیچ باری ندارد.
            </div>
          ) : (
            <div className="space-y-3">
              {request.loads.map((load) => {
                const canAssign =
                  load.status === "active" &&
                  load.request_load_status === "pending";

                return (
                  <div
                    key={load.id}
                    className="
                      rounded-xl
                      border border-border
                      bg-surface-2
                      p-4
                    "
                  >
                    {/* Load Header */}
                    <div
                      className="
                        flex flex-col gap-3
                        sm:flex-row sm:items-start
                        sm:justify-between
                      "
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-text">
                            {load.origin}
                          </span>

                          <ArrowRight className="h-4 w-4 shrink-0 rotate-180 text-text-2" />

                          <span className="font-bold text-text">
                            {load.destination}
                          </span>
                        </div>

                        <p className="mt-1 font-mono text-xs text-text-2">
                          #{load.id}
                        </p>
                      </div>

                      <StatusBadge status={load.status} />
                    </div>

                    {/* Load Details */}
                    <div
                      className="
                        mt-4
                        grid grid-cols-2
                        gap-2
                        sm:grid-cols-3
                      "
                    >
                      <InfoRow
                        label="نوع بار"
                        value={
                          <CargoTypeLabel
                            value={load.cargo_type}
                            name={load.cargo}
                          />
                        }
                      />

                      <InfoRow
                        label="نوع خودرو"
                        value={<VehicleLabel value={load.vehicle_type} />}
                      />

                      <InfoRow
                        label="وزن"
                        value={`${toPersianDigits(load.weight)} تن`}
                      />

                      <InfoRow
                        label="قیمت"
                        value={formatMoney(load.price, load.currency)}
                      />

                      <InfoRow
                        label="نوع معامله"
                        value={<TradeTypeLabel value={load.trade_type} />}
                      />

                      <InfoRow
                        label="تاریخ بارگیری"
                        value={toPersianDate(load.loading_date)}
                      />
                    </div>

                    {/* Actions */}
                    <div
                      className="
                        mt-4
                        flex flex-col gap-2
                        border-t border-border
                        pt-4
                        sm:flex-row sm:justify-end
                      "
                    >
                      {canAssign ? (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => handleReject(load.id)}
                          >
                            <XCircle className="ml-2 h-4 w-4" />
                            رد بار
                          </Button>

                          <Button onClick={() => handleAssign(load.id)}>
                            <CheckCircle2 className="ml-2 h-4 w-4" />
                            تخصیص بار
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-text-2">
                          <StatusBadge status={load.request_load_status} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={isConfirmOpen}
        title={confirm.type === "assign" ? "تأیید تخصیص بار" : "تأیید رد بار"}
        onClose={() =>
          setConfirm({
            type: null,
            loadId: null,
          })
        }
      >
        <div className="space-y-5">
          <div>
            {confirm.type === "assign" ? (
              <>
                <p className="text-sm leading-6 text-text-2">
                  آیا می‌خواهید این بار را به خودرو و راننده این درخواست اختصاص
                  دهید؟
                </p>

                {selectedLoad && (
                  <div
                    className="
                      mt-4
                      rounded-lg
                      border border-border
                      bg-surface-2
                      p-3
                    "
                  >
                    <div className="font-bold text-text">
                      {selectedLoad.origin}
                      {" → "}
                      {selectedLoad.destination}
                    </div>

                    <div className="mt-1 text-xs text-text-2">
                      {request.driver.name}
                      {" · "}
                      <VehicleLabel value={request.vehicle.vehicle_type} />
                      <span className="bg-primary/10 p-1 rounded-lg mr-2">
                        {request.vehicle.plate || request.vehicle.transit_code}
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="text-sm leading-6 text-text-2">
                  آیا از رد کردن این بار برای این درخواست مطمئن هستید؟
                </p>

                {selectedLoad && (
                  <div
                    className="
                      mt-4
                      rounded-lg
                      border border-danger/20
                      bg-danger/5
                      p-3
                    "
                  >
                    <div className="font-bold text-text">
                      {selectedLoad.origin}
                      {" → "}
                      {selectedLoad.destination}
                    </div>

                    <div className="mt-1 text-xs text-text-2">
                      این عملیات فقط این بار را از این درخواست خارج می‌کند.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <Button
              variant="secondary"
              onClick={() =>
                setConfirm({
                  type: null,
                  loadId: null,
                })
              }
            >
              انصراف
            </Button>

            <Button
              onClick={handleConfirmAction}
              disabled={isActionPending}
              variant={confirm.type === "reject" ? "danger" : undefined}
            >
              {isActionPending ? (
                "در حال ثبت..."
              ) : confirm.type === "assign" ? (
                <>
                  <CheckCircle2 className="ml-2 h-4 w-4" />
                  تأیید تخصیص
                </>
              ) : (
                <>
                  <XCircle className="ml-2 h-4 w-4" />
                  تأیید رد بار
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value: string | ReactNode;
  mono?: boolean;
};

function InfoRow({
  label,
  value,
  mono = false,
}: InfoRowProps) {
  return (
    <div
      className="
        flex min-w-0
        flex-col gap-1
        rounded-lg
        border border-border/60
        bg-surface
        px-3 py-2.5
      "
    >
      <span className="text-[11px] text-text-2">
        {label}
      </span>

      <span
        className={`
          truncate text-sm font-medium text-text
          ${mono ? "font-mono" : ""}
        `}
      >
        {value}
      </span>
    </div>
  );
}




