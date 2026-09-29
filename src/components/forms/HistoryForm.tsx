import { useForm, useWatch } from "react-hook-form";
import { Search } from "lucide-react";
import { TrackRequestFormData } from "../../types/trackRequest.type";
import PlateInput from "../inputs/PlateInput";
import { FormInput } from "../inputs/FormInput";
import { Button } from "../buttons/Button";

type Props = {
  loading: boolean;
  onSubmit: (data: TrackRequestFormData) => void;
};

export default function HistoryForm({ loading, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TrackRequestFormData>({
    defaultValues: {
      identifierType: "PLATE",
      plate: "",
      plateFirst: "",
      plateLetter: "",
      plateNumber: "",
      plateCity: "",
      transitCode: "",
      nationalId: "",
      phone: "",
    },
  });

  const identifierType = useWatch({
    control,
    name: "identifierType",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Identifier type */}
      <div>
        <span className="mb-2 block text-sm font-medium">نوع شناسه</span>

        <div className="flex gap-2">
          <label
            className={`
              cursor-pointer
              rounded-lg
              border
              px-4 py-2
              text-sm
              transition
              ${
                identifierType === "PLATE"
                  ? "border-primary bg-primary-soft text-primary-dark"
                  : "border-border text-text-2"
              }
            `}
          >
            <input
              type="radio"
              value="PLATE"
              className="hidden"
              {...register("identifierType")}
            />
            پلاک خودرو
          </label>

          <label
            className={`
              cursor-pointer
              rounded-lg
              border
              px-4 py-2
              text-sm
              transition
              ${
                identifierType === "TRANSIT"
                  ? "border-primary bg-primary-soft text-primary-dark"
                  : "border-border text-text-2"
              }
            `}
          >
            <input
              type="radio"
              value="TRANSIT"
              className="hidden"
              {...register("identifierType")}
            />
            پلاک ترانزیت
          </label>
        </div>

        {/* Plate */}
        {identifierType === "PLATE" && (
          <div className="mt-4">
            <PlateInput
              register={register}
              control={control}
              setValue={setValue}
            />

            {errors.plate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.plate.message}
              </p>
            )}
          </div>
        )}

        {/* Transit */}
        {identifierType === "TRANSIT" && (
          <div className="mt-4">
            <FormInput
              label="شناسه ترانزیت"
              placeholder="مثلاً 50AB601"
              error={errors.transitCode?.message}
              {...register("transitCode", {
                required: "شناسه ترانزیت الزامی است",
              })}
            />
          </div>
        )}
      </div>

      {/* National ID */}
      <div>
        <label htmlFor="nationalId" className="mb-2 block text-sm font-medium">
          کد ملی
        </label>

        <input
          id="nationalId"
          type="text"
          inputMode="numeric"
          maxLength={10}
          {...register("nationalId", {
            required: "کد ملی الزامی است",
            pattern: {
              value: /^\d{10}$/,
              message: "کد ملی باید ۱۰ رقم باشد",
            },
          })}
          placeholder="کد ملی را وارد کنید"
          className="
            h-12 w-full
            rounded-xl
            border border-border
            bg-surface
            px-4
            text-sm
            text-text
            outline-none
            placeholder:text-text/40
            transition
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
          "
        />

        {errors.nationalId && (
          <p className="mt-1 text-xs text-red-500">
            {errors.nationalId.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          شماره تلفن
        </label>

        <input
          id="phone"
          type="tel"
          inputMode="tel"
          {...register("phone", {
            required: "شماره تلفن الزامی است",
            pattern: {
              value: /^09\d{9}$/,
              message: "شماره تلفن معتبر نیست",
            },
          })}
          placeholder="مثلاً 09121234567"
          className="
            h-12 w-full
            rounded-xl
            border border-border
            bg-surface
            px-4
            text-sm
            text-text
            outline-none
            placeholder:text-text/40
            transition
            focus:border-primary
            focus:ring-4
            focus:ring-primary/10
          "
        />

        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="rounded-xl bg-bg px-4 py-3 text-xs leading-6 text-text/60">
        با وارد کردن اطلاعات بالا، درخواست‌های ثبت‌شده مربوط به شما نمایش داده
        می‌شود.
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

        {loading ? "در حال بررسی..." : "مشاهده سوابق"}
      </Button>
    </form>
  );
}
