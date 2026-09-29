import { Eye, EyeOff, KeyRound, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUserEmail } from "../../../hooks/auth/useCurrentUserEmail";
import { useChangePassword } from "../../../hooks/auth/useChangePassword";
import toast from "react-hot-toast";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "رمز فعلی را وارد کنید."),

    newPassword: z.string().min(8, "رمز جدید باید حداقل ۸ کاراکتر باشد."),

    confirmPassword: z.string().min(1, "تکرار رمز جدید را وارد کنید."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "تکرار رمز جدید با رمز جدید یکسان نیست.",
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "رمز جدید باید با رمز فعلی متفاوت باشد.",
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  error?: string;
  registration: ReturnType<typeof useForm<PasswordFormValues>>["register"];
  name: "currentPassword" | "newPassword" | "confirmPassword";
  show: boolean;
  onToggle: () => void;
};

function PasswordField({
  label,
  placeholder,
  error,
  registration,
  name,
  show,
  onToggle,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text">{label}</label>

      <div className="relative">
        <input
          {...registration(name)}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={
            name === "currentPassword" ? "current-password" : "new-password"
          }
          className={`h-11 w-full rounded-xl border bg-surface px-4 pl-11 text-sm text-text outline-none transition placeholder:text-muted ${
            error
              ? "border-danger focus:ring-2 focus:ring-danger/10"
              : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
          }`}
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-text"
          aria-label={show ? "مخفی کردن رمز" : "نمایش رمز"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

export default function AccountSecurity() {
  const { data: email, isLoading: emailLoading } = useCurrentUserEmail();

  const changePasswordMutation = useChangePassword();

  const [visibleFields, setVisibleFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const toggleField = (field: keyof typeof visibleFields) => {
    setVisibleFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const onSubmit = (values: PasswordFormValues) => {
    changePasswordMutation.mutate(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => {
          toast.success("رمز عبور با موفقیت تغییر کرد.");

          reset();
        },

        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "تغییر رمز عبور انجام نشد.",
          );
        },
      },
    );
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/50 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <ShieldCheck size={20} />
        </div>

        <div>
          <h2 className="font-bold text-text">حساب و امنیت</h2>

          <p className="mt-0.5 text-xs text-text-2">
            اطلاعات ورود و امنیت حساب مدیر
          </p>
        </div>
      </div>

      <div className="space-y-8 p-5">
        {/* Email */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Mail size={17} className="text-primary" />

            <h3 className="font-semibold text-text">ایمیل حساب</h3>
          </div>

          <div className="flex min-h-11 items-center justify-between gap-4 rounded-xl border border-border bg-surface-2 px-4">
            <span className="truncate text-sm text-text">
              {emailLoading ? "در حال دریافت..." : email || "ایمیل ثبت نشده"}
            </span>

            <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
              غیرقابل تغییر
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-muted">
            ایمیل حساب به‌عنوان شناسه ورود استفاده می‌شود و از این بخش قابل
            تغییر نیست.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Password */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex items-center gap-2">
            <KeyRound size={17} className="text-primary" />

            <div>
              <h3 className="font-semibold text-text">تغییر رمز عبور</h3>

              <p className="mt-0.5 text-xs text-text-2">
                برای تغییر رمز، ابتدا رمز فعلی را تأیید کنید.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <PasswordField
              label="رمز فعلی"
              placeholder="رمز فعلی را وارد کنید"
              error={errors.currentPassword?.message}
              registration={register}
              name="currentPassword"
              show={visibleFields.current}
              onToggle={() => toggleField("current")}
            />

            <PasswordField
              label="رمز جدید"
              placeholder="حداقل ۸ کاراکتر"
              error={errors.newPassword?.message}
              registration={register}
              name="newPassword"
              show={visibleFields.new}
              onToggle={() => toggleField("new")}
            />

            <PasswordField
              label="تکرار رمز جدید"
              placeholder="رمز جدید را دوباره وارد کنید"
              error={errors.confirmPassword?.message}
              registration={register}
              name="confirmPassword"
              show={visibleFields.confirm}
              onToggle={() => toggleField("confirm")}
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {changePasswordMutation.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  در حال تغییر...
                </>
              ) : (
                <>
                  <KeyRound size={17} />
                  تغییر رمز عبور
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
