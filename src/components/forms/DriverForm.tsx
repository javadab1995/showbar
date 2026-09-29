import { useForm, useWatch } from "react-hook-form";
import {
  DriverRequestFormValues,
  driverRequestSchema,
} from "../../schemas/driverRequestSchema";

import { Button } from "../buttons/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../inputs/FormInput";
import { VEHICLE_OPTIONS } from "../../data/options";
import PlateInput from "../inputs/PlateInput";

type Props = {
  onSubmit: (data: DriverRequestFormValues) => void;
  loading: boolean;
};

export default function DriverForm({ onSubmit, loading }: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<DriverRequestFormValues>({
    resolver: zodResolver(driverRequestSchema),

    defaultValues: {
      tradeType: "DOMESTIC",

      name: "",
      phone: "",
      nationalID: "",

      vehicleType: "",

      identifierType: "PLATE",

      plateCountry: "IR",
      plateFirst: "",
      plateLetter: "",
      plateNumber: "",
      plateCity: "",
      plate: "",

      transitCode: "",

      note: "",
    },
  });

  const identifierType = useWatch({
    control,
    name: "identifierType",
  });



  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
      space-y-5 py-10
      "
    >
      {/* Driver Info */}
      <section
        className="
        rounded-2xl
        border
        border-border
        bg-surface
        p-5
        sm:p-6
        "
      >
        <div className="mb-5">
          <h2 className="text-base font-semibold text-text">اطلاعات راننده</h2>

          <p className="mt-1 text-sm text-text-2">
            مشخصات فردی راننده را وارد کنید.
          </p>
        </div>

        <div
          className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-3
          "
        >
          <FormInput
            label="نام و نام خانوادگی"
            placeholder="مثلاً علی رضایی"
            error={errors.name?.message}
            {...register("name")}
          />

          <FormInput
            label="شماره موبایل"
            placeholder="09121234567"
            inputMode="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <FormInput
            label="کد ملی"
            placeholder="0012345678"
            inputMode="numeric"
            error={errors.nationalID?.message}
            {...register("nationalID")}
          />
        </div>
      </section>

      {/* Vehicle Info */}
      <section
        className="
        rounded-2xl
        border
        border-border
        bg-surface
        p-5
        sm:p-6
        "
      >
        <div className="mb-5">
          <h2 className="text-base font-semibold text-text">اطلاعات خودرو</h2>

          <p className="mt-1 text-sm text-text-2">
            نوع خودرو و شناسه وسیله نقلیه را وارد کنید.
          </p>
        </div>

        <div
          className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          "
        >
          <label className="flex flex-col gap-2 col-span-2">
            <span className="text-sm font-medium text-text ">نوع خودرو</span>

            <select
              {...register("vehicleType")}
              className="
              h-12
              rounded-xl
              border
              border-border
              bg-bg
              px-4
              text-sm
              text-text
              outline-none
              transition
              focus:border-primary
              focus:ring-2
              focus:ring-primary/10
              "
            >
              <option value="">انتخاب خودرو</option>

              {VEHICLE_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>

            {errors.vehicleType && (
              <span className="text-xs text-danger">
                {errors.vehicleType.message}
              </span>
            )}
          </label>

          {/* Identifier selector */}

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-text">نوع شناسه</span>

            <div className="flex gap-2">
              <label
                className={`
                cursor-pointer
                rounded-lg
                border
                px-4
                py-2
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
                px-4
                py-2
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
          </div>

          {identifierType === "PLATE" && (
            <div className="col-span-2">
              <PlateInput
                register={register}
                control={control}
                setValue={setValue}
              />
            </div>
          )}

          {identifierType === "TRANSIT" && (
            <div className="col-span-2">
              <FormInput
                label="شناسه ترانزیت"
                placeholder="مثلاً 50AB601"
                error={errors.transitCode?.message}
                {...register("transitCode")}
              />
            </div>
          )}
        </div>
      </section>

      {/* Note */}

      <section
        className="
        rounded-2xl
        border
        border-border
        bg-surface
        p-5
        sm:p-6
        "
      >
        <div className="mb-4">
          <h2 className="text-base font-semibold text-text">توضیحات</h2>

          <p className="mt-1 text-sm text-text-2">
            اطلاعات تکمیلی درباره راننده یا خودرو.
          </p>
        </div>

        <textarea
          rows={4}
          placeholder="مثلاً توضیح درباره سابقه راننده یا شرایط خودرو..."
          {...register("note")}
          className="
          min-h-28
          w-full
          resize-none
          rounded-xl
          border
          border-border
          bg-bg
          px-4
          py-3
          text-sm
          text-text
          outline-none
          transition
          placeholder:text-muted
          focus:border-primary
          focus:ring-2
          focus:ring-primary/10
          "
        />
      </section>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="
          w-full
          sm:w-52
          justify-center
          rounded-xl
          bg-primary-radial
          py-3
          text-sm
          font-medium
          text-surface
          transition
          hover:bg-primary-dark
          "
        >
          {loading ? "در حال ثبت..." : "ثبت درخواست"}
        </Button>
      </div>
    </form>
  );
}
