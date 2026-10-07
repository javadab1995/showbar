import { Building2, Palette } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  useCompany,
  useCreateCompany,
  useUpdateCompany,
} from "../../hooks/admin/useCompanies";
import toast from "react-hot-toast";
import { FormInput } from "../inputs/FormInput";



const companySchema = z.object({
  name: z.string().trim().min(2, "نام شرکت حداقل باید ۲ کاراکتر باشد"),

  phone: z.string().trim(),

  whatsapp: z.string().trim(),

  email: z.string().trim().email("ایمیل معتبر نیست").or(z.literal("")),

  address: z.string().trim(),
});

type CompanyFormValues = z.infer<typeof companySchema>;


export default function CompanyInfoForm() {
  const { data: company , isLoading } = useCompany();

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

  const onSubmit = (values: CompanyFormValues) => {
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
            toast.error(error.message || "بروزرسانی اطلاعات شرکت انجام نشد");
          },
        },
      );

      return;
    }

    createMutation.mutate(
       values,
      {
        onSuccess: () => {
          toast.success("اطلاعات شرکت با موفقیت ثبت شد");
        },
        onError: (error: Error) => {
          toast.error(error.message || "ثبت اطلاعات شرکت انجام نشد");
        },
      },
    );
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
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
              label=" ایمیل رسمی"
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
                className="
                  w-full resize-none rounded-xl border
                  bg-surface-2 px-4 py-2.5
                  text-text outline-none
                  transition-all
                  border-border focus:border-primary focus:ring-4 focus:ring-primary/10
                "
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                rounded-xl bg-primary-radial
                px-5 py-2.5
                text-sm font-semibold text-white
                transition-colors
                hover:bg-primary-dark
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isSubmitting
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
