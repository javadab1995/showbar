import { zodResolver } from "@hookform/resolvers/zod";
import { BellRing, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";

import { Button } from "../../components/buttons/Button";
import GoToLoads from "../../components/buttons/GoToLoads";
import Spinner from "../../components/widgets/Spinner";
import { FormInput } from "../../components/inputs/FormInput";

import { toPersianDate } from "../../helpers/date";

import { useCreateLoadAvailabilityAlert } from "../../hooks/public/useCreateLoadAvailabilityAlert";
import { useLoad } from "../../hooks/other/useLoad";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

const notifyMeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "نام و نام خانوادگی الزامی است.")
    .max(150, "نام و نام خانوادگی نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد."),

  mobile: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل باید به صورت ۰۹۱۲۳۴۵۶۷۸۹ باشد."),
});

type NotifyMeFormValues = z.infer<typeof notifyMeSchema>;

export default function NotifyMe() {
  const { id } = useParams();

  const isOnline = useOnlineStatus();

  const { data: load, isLoading, isError } = useLoad(id);

  const createAlertMutation = useCreateLoadAvailabilityAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotifyMeFormValues>({
    resolver: zodResolver(notifyMeSchema),

    defaultValues: {
      name: "",
      mobile: "",
    },
  });

  async function onSubmit(data: NotifyMeFormValues) {
    if (!id) {
      return;
    }

    // جلوگیری از ارسال درخواست در حالت آفلاین
    if (!isOnline) {
      createAlertMutation.reset();

      return;
    }

    try {
      await createAlertMutation.mutateAsync({
        loadId: id,
        name: data.name,
        mobile: data.mobile,
      });
    } catch (error) {
      console.error("Create availability alert error:", error);
    }
  }

  // --------------------------------------------------
  // ثبت موفق درخواست
  // --------------------------------------------------

  if (createAlertMutation.isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20 max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-text">
            درخواست اطلاع‌رسانی شما ثبت شد.
          </h1>

          <p className="text-text-2 text-sm max-w-sm">
            در صورت فعال شدن مجدد این بار، شما را مطلع خواهیم کرد.
          </p>
        </div>

        <GoToLoads to="/" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 mb-10 space-y-6">
      {/* Header */}

      <div className="flex flex-col items-center text-center space-y-2 mt-20">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <BellRing className="w-6 h-6 animate-pulse" />
        </div>

        <h1 className="text-xl font-bold text-text">
          اطلاع‌رسانی در صورت موجود شدن
        </h1>

        <p className="text-text-2 text-sm">
          برای اطلاع از فعال‌سازی مجدد این بار، فرم زیر را پر کنید.
        </p>
      </div>

      {/* Load Error */}

      {isError && (
        <p className="p-3 rounded-lg border border-danger bg-danger/10 text-danger text-sm">
          {isOnline
            ? "مشکلی در دریافت اطلاعات بار به وجود آمده است."
            : "اتصال به اینترنت برقرار نیست و اطلاعات بار قابل دریافت نیست."}
        </p>
      )}

      {!isLoading ? (
        <div className="bg-surface border border-border p-6 rounded-xl shadow-sm space-y-6">
          {/* Load Info */}

          <div className="bg-surface-2 border border-border/60 p-4 rounded-lg space-y-1">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider block">
              مشخصات بار انتخابی
            </span>

            <div className="text-base font-bold text-text">
              {load?.origin} ← {load?.destination}
            </div>

            <div className="text-xs text-text-2 flex items-center gap-1.5 font-mono">
              <span>{load?.cargo}</span>

              <span>•</span>

              <span>{load?.weight} تن</span>

              <span>•</span>

              <span>
                {load?.loading_date} --- {toPersianDate(load?.loading_date)}
              </span>
            </div>
          </div>

          {/* Form */}

          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Name */}

            <FormInput
              label="نام و نام‌خانوادگی"
              {...register("name")}
              error={errors?.name?.message}
              placeholder="علی رضایی"
            />

            {/* Mobile */}

            <FormInput
              label="شماره تماس"
              {...register("mobile")}
              error={errors?.mobile?.message}
              placeholder="09121234567"
            />

            {/* Offline Message */}

            {!isOnline && (
              <p className="text-sm text-danger">
                برای ثبت درخواست اطلاع‌رسانی، اتصال به اینترنت لازم است.
              </p>
            )}

            {/* Mutation Error */}

            {createAlertMutation.isError && isOnline && (
              <p className="text-sm text-danger">
                ثبت درخواست اطلاع‌رسانی با خطا مواجه شد. لطفاً دوباره تلاش کنید.
              </p>
            )}

            {/* Submit */}

            <Button
              className="
                text-sm
                w-full
                flex
                justify-center
                items-center
                p-2.5
                cursor-pointer
                rounded-md
                font-medium
                hover:opacity-90
                transition-opacity
                text-surface
                bg-primary-radial
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
              type="submit"
              disabled={
                isSubmitting || createAlertMutation.isPending || !isOnline
              }
            >
              {createAlertMutation.isPending ? "در حال ثبت..." : "اطلاع بده"}
            </Button>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
