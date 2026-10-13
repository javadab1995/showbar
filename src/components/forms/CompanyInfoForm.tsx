
import { Building2, RefreshCw, WifiOff } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import {
  useCompany,
  useCreateCompany,
  useUpdateCompany,
} from "../../hooks/admin/useCompanies";


import { FormInput } from "../inputs/FormInput";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";

const companySchema = z.object({
  name: z.string().trim().min(2, "نام شرکت حداقل باید ۲ کاراکتر باشد"),
  phone: z.string().trim(),
  whatsapp: z.string().trim(),
  email: z.string().trim().email("ایمیل معتبر نیست").or(z.literal("")),
  address: z.string().trim(),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function CompanyInfoForm() {
  const isOnline = useOnlineStatus();

  const {
    data: company,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useCompany();

  const createMutation = useCreateCompany();
  const updateMutation = useUpdateCompany();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      phone: "",
      whatsapp: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!company) return;

    reset({
      name: company.name ?? "",
      phone: company.phone ?? "",
      whatsapp: company.whatsapp ?? "",
      email: company.email ?? "",
      address: company.address ?? "",
    });
  }, [company, reset]);

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: CompanyFormValues) => {
    // بررسی اتصال قبل از ارسال درخواست
    if (!isOnline) {
      toast.error("اتصال اینترنت برقرار نیست");
      return;
    }

    if (company) {
      updateMutation.mutate(
        {
          id: company.id,
          data: values,
        },
        {
          onSuccess: () => {
            toast.success("اطلاعات شرکت با موفقیت بروزرسانی شد");
          },
          onError: (error: Error) => {
            toast.error(
              error.message || "بروزرسانی اطلاعات شرکت انجام نشد"
            );
          },
        }
      );

      return;
    }

    createMutation.mutate(values, {
      onSuccess: () => {
        toast.success("اطلاعات شرکت با موفقیت ثبت شد");
      },
      onError: (error: Error) => {
        toast.error(error.message || "ثبت اطلاعات شرکت انجام نشد");
      },
    });
  };

  // اگر اطلاعات دریافت نشده و اتصال نداریم،
  // فرم خالی را به‌اشتباه به‌عنوان شرکت جدید نشان نده.
  if (!company && !isOnline) {
    return (
      <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="flex items-center gap-3 border-b border-border bg-surface-2/50 p-5">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-text">اطلاعات شرکت</h3>
        </div>

        <div className="flex flex-col items-center gap-3 p-8 text-center">
          <WifiOff className="h-10 w-10 text-text/50" />

          <p className="font-semibold text-text">
            اتصال اینترنت برقرار نیست
          </p>

          <p className="text-sm text-text/60">
            برای دریافت اطلاعات شرکت، ابتدا اتصال اینترنت را بررسی کن.
          </p>
        </div>
      </section>
    );
  }

  // خطای دریافت اطلاعات با نبودن شرکت متفاوت است.
  if (!company && isError) {
    return (
      <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="flex items-center gap-3 border-b border-border bg-surface-2/50 p-5">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-text">اطلاعات شرکت</h3>
        </div>

        <div className="flex flex-col items-center gap-3 p-8 text-center">
          <p className="font-semibold text-text">
            دریافت اطلاعات شرکت ناموفق بود
          </p>

          <p className="text-sm text-text/60">
            {error instanceof Error
              ? error.message
              : "هنگام دریافت اطلاعات مشکلی رخ داد."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={!isOnline || isFetching}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            {isFetching ? "در حال تلاش مجدد..." : "تلاش مجدد"}
          </button>
        </div>
      </section>
    );
  }

  if (isLoading && !company) {
    return (
      <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="flex items-center gap-3 border-b border-border bg-surface-2/50 p-5">
          <Building2 className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-text">اطلاعات شرکت</h3>
        </div>

        <div className="p-6">
          <div className="h-32 animate-pulse rounded-xl bg-surface-2" />
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/50 p-5">
        <Building2 className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-text">اطلاعات شرکت</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6">
          {!isOnline && (
            <div
              role="alert"
              className="mb-5 flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm text-text"
            >
              <WifiOff className="h-5 w-5 shrink-0" />
              <p>
                آفلاین هستی. اطلاعات را می‌توانی ببینی، اما ذخیره‌سازی
                تا زمان برقراری اتصال غیرفعال است.
              </p>
            </div>
          )}

          {isError && company && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-border bg-surface-2 p-4 text-sm text-text"
            >
              دریافت آخرین اطلاعات با خطا مواجه شد. اطلاعات موجود
              نمایش داده شده‌اند؛ برای اطمینان از آخرین وضعیت، اتصال
              را بررسی و صفحه را مجدداً بارگذاری کن.
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormInput
              label="نام شرکت"
              error={errors.name?.message}
              {...register("name")}
            />

            <FormInput
              label="شماره تماس"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <FormInput
              label="واتساپ"
              error={errors.whatsapp?.message}
              {...register("whatsapp")}
            />

            <FormInput
              label="ایمیل رسمی"
              error={errors.email?.message}
              {...register("email")}
            />

            <label className="space-y-1.5 md:col-span-2">
              <span className="ml-1 text-sm font-medium text-text-2">
                آدرس دفتر مرکزی
              </span>

              <textarea
                {...register("address")}
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-text outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={!isOnline || isSubmitting || isLoading || isError}
              className="rounded-xl bg-primary-radial px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {!isOnline
                ? "ذخیره در دسترس نیست"
                : isSubmitting
                  ? "در حال ذخیره..."
                  : company
                    ? "ذخیره تغییرات"
                    : "ثبت اطلاعات شرکت"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

