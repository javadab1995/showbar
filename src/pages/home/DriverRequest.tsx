import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useBasket } from "../../contexts/BasketContext";
import { getLoadsByIds } from "../../services/apiLoads";

import BackButton from "../../components/buttons/BackButton";
import SelectedLoadsCard from "../../components/card/SelectedLoadsCard";
import DriverForm from "../../components/forms/DriverForm";

import { useCreateDriverRequest } from "../../hooks/public/useCreateDriverRequest";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

import type { DriverRequestFormValues } from "../../schemas/driverRequestSchema";

export default function DriverRequest() {
  const { mutate: createRequest, isPending } = useCreateDriverRequest();

  const { basket, setBasket } = useBasket();

  const navigate = useNavigate();

  const isOnline = useOnlineStatus();

  const {
    data: selectedLoads = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["basket-loads", basket],
    queryFn: () => getLoadsByIds(basket),
    enabled: basket.length > 0,
    retry: 0,
  });

  function handleSubmit(values: DriverRequestFormValues) {
    // --------------------------------------------------
    // جلوگیری از ارسال درخواست در حالت آفلاین
    // --------------------------------------------------

    if (!isOnline) {
      toast.error("برای ثبت درخواست، اتصال به اینترنت لازم است.");
      return;
    }

    createRequest(
      {
        loadIds: basket,

        tradeType: values.tradeType,

        name: values.name,

        phone: values.phone,

        nationalID: values.nationalID,

        vehicleType: values.vehicleType,

        identifierType: values.identifierType,

        plateCountry:
          values.identifierType === "PLATE" ? values.plateCountry : undefined,

        plate: values.identifierType === "PLATE" ? values.plate : undefined,

        transitCode:
          values.identifierType === "TRANSIT" ? values.transitCode : undefined,

        note: values.note,
      },
      {
        onSuccess(request) {
          toast.success("درخواست با موفقیت ثبت شد");

          setBasket([]);

          navigate(
            `/request/success?code=${encodeURIComponent(
              request.tracking_code,
            )}`,
          );
        },

        onError() {
          toast.error(
            isOnline
              ? "ثبت درخواست با خطا مواجه شد. لطفاً دوباره تلاش کنید."
              : "اتصال به اینترنت برقرار نیست.",
          );
        },
      },
    );
  }

  return (
    <section
      dir="rtl"
      className="
        min-h-[calc(100vh-4rem)]
        px-6
        py-20
      "
    >
      <BackButton to="/" title="بازگشت به بارها" />

      <h1
        className="
          text-2xl
          font-bold
          tracking-tight
          text-text
          sm:text-3xl
        "
      >
        درخواست بار
      </h1>

      <div
        className="
          mt-7
          grid
          gap-5
          lg:grid-cols-[280px_minmax(0,1fr)]
        "
      >
        <SelectedLoadsCard loads={selectedLoads} loading={isLoading} />

        <DriverForm onSubmit={handleSubmit} loading={isPending} />
      </div>

      {isError && (
        <p className="mt-4 text-sm text-danger">
          {isOnline
            ? "دریافت اطلاعات بارهای انتخاب‌شده با خطا مواجه شد."
            : "اتصال به اینترنت برقرار نیست و اطلاعات بارهای انتخاب‌شده قابل دریافت نیست."}
        </p>
      )}
    </section>
  );
}
