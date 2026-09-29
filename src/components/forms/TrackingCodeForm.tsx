import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { TrackRequestFormData } from "../../types/trackRequest.type";
import { Button } from "../buttons/Button";


type Props = {
  defaultValue?: string;
  loading: boolean;
  onSubmit: (data: TrackRequestFormData) => void;
};

export default function TrackingCodeForm({
  defaultValue = "",
  loading,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TrackRequestFormData>({
    defaultValues: {
      trackingCode: defaultValue,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="trackingCode"
          className="mb-2 block text-sm font-medium"
        >
          کد پیگیری
        </label>

        <input
          id="trackingCode"
          type="text"
          dir="ltr"
          autoComplete="off"
          {...register("trackingCode", {
            required: "کد پیگیری الزامی است",
          })}
          placeholder="مثلاً SHB-8F42K"
          className="
            h-14 w-full
            rounded-xl
            border border-border
            bg-surface
            px-4
            text-center
            text-base
            font-medium
            uppercase
            tracking-wider
            text-text
            outline-none
            placeholder:text-sm
            placeholder:font-normal
            placeholder:tracking-normal
            placeholder:text-text/40
            transition
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
          "
        />

        {errors.trackingCode && (
          <p className="mt-1 text-xs text-red-500">
            {errors.trackingCode.message}
          </p>
        )}
      </div>

      <div className="rounded-xl bg-bg px-4 py-3 text-xs leading-6 text-text/60">
        کد پیگیری را که پس از ثبت درخواست دریافت کرده‌اید وارد کنید.
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="
          flex h-12 w-full
          items-center justify-center gap-2
          rounded-md
          bg-primary-radial
          px-5
          font-semibold text-surface
          transition
          hover:bg-primary-dark
          active:scale-[0.99]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <Search size={18} />

        {loading ? "در حال بررسی..." : "پیگیری"}
      </Button>
    </form>
  );
}
