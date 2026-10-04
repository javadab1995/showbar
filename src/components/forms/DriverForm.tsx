import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DriverRequestFormValues,
  driverRequestSchema,
} from "../../schemas/driverRequestSchema";

import { Button } from "../buttons/Button";
import { FormInput } from "../inputs/FormInput";
import { VEHICLE_OPTIONS } from "../../data/options";
import PlateInput from "../inputs/PlateInput";
import { useVehicleLookup } from "../../hooks/public/useVehicleLookup";



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
    setError,
    clearErrors,
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

  const plate = useWatch({
    control,
    name: "plate",
  });

  const transitCode = useWatch({
    control,
    name: "transitCode",
  });

  const vehicleType = useWatch({
    control,
    name: "vehicleType",
  });

  const {
    loading: vehicleLookupLoading,
    checked: vehicleChecked,
    existingVehicle,
    checkVehicle,
    resetVehicleLookup,
  } = useVehicleLookup({
    identifierType,
    plate,
    transitCode,
    setValue,
    setError,
    clearErrors,
  });

  /*
   * اگر شناسه خودرو بعد از lookup تغییر کند،
   * نتیجه lookup قبلی دیگر معتبر نیست.
   *
   * این برای PlateInput هم کار می‌کند چون
   * مقدار نهایی plate را تغییر می‌دهد.
   */
  useEffect(() => {
    if (!vehicleChecked) {
      return;
    }

    resetVehicleLookup();
  }, [plate, transitCode, identifierType]);

  const handleIdentifierTypeChange = (type: "PLATE" | "TRANSIT") => {
    setValue("identifierType", type);

    resetVehicleLookup();

    setValue("vehicleType", "");

    if (type === "PLATE") {
      setValue("transitCode", "");
    } else {
      setValue("plateFirst", "");
      setValue("plateLetter", "");
      setValue("plateNumber", "");
      setValue("plateCity", "");
      setValue("plate", "");
    }
  };

  const handleFormSubmit = (data: DriverRequestFormValues) => {
    /*
     * تا وقتی خودرو بررسی نشده،
     * اجازه ثبت درخواست نمی‌دهیم.
     */
    if (!vehicleChecked) {
      setError("vehicleType", {
        type: "manual",
        message: "ابتدا خودرو را بررسی کنید",
      });

      return;
    }

    /*
     * اگر خودرو موجود بوده،
     * نوع خودرو باید همان نوع ثبت‌شده در دیتابیس باشد.
     *
     * این کنترل فقط UX است.
     * کنترل اصلی همچنان داخل RPC انجام می‌شود.
     */
    if (existingVehicle && data.vehicleType !== existingVehicle.vehicle_type) {
      setError("vehicleType", {
        type: "manual",
        message:
          "نوع خودرو تغییر کرده است. برای تغییر نوع خودرو با پشتیبانی تماس بگیرید.",
      });

      return;
    }

    onSubmit(data);
  };

  const vehicleTypeLabel =
    VEHICLE_OPTIONS.find((item) => item.value === existingVehicle?.vehicle_type)
      ?.label ?? existingVehicle?.vehicle_type;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 py-10">
      {/* Driver Info */}

      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-text">اطلاعات راننده</h2>

          <p className="mt-1 text-sm text-text-2">
            مشخصات فردی راننده را وارد کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-text">اطلاعات خودرو</h2>

          <p className="mt-1 text-sm text-text-2">
            نوع خودرو و شناسه وسیله نقلیه را وارد کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Identifier selector */}

          <div className="col-span-2 flex flex-col gap-2">
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
                  checked={identifierType === "PLATE"}
                  onChange={() => handleIdentifierTypeChange("PLATE")}
                  className="hidden"
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
                  checked={identifierType === "TRANSIT"}
                  onChange={() => handleIdentifierTypeChange("TRANSIT")}
                  className="hidden"
                />
                پلاک ترانزیت
              </label>
            </div>
          </div>

          {/* Iranian Plate */}

          {identifierType === "PLATE" && (
            <div className="col-span-2">
              <PlateInput
                register={register}
                control={control}
                setValue={setValue}
              />
            </div>
          )}

          {/* Transit Code */}

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

          {/* Check Vehicle */}

          <div className="col-span-2">
            <Button
              type="button"
              onClick={checkVehicle}
              disabled={
                vehicleLookupLoading ||
                !(identifierType === "PLATE"
                  ? plate?.trim()
                  : transitCode?.trim())
              }
              className="
                w-full
                justify-center
                rounded-xl
                border
                border-primary
                bg-transparent
                py-3
                text-sm
                font-medium
                text-primary
                transition
                hover:bg-primary-soft
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {vehicleLookupLoading ? "در حال بررسی..." : "بررسی خودرو"}
            </Button>
          </div>

          {/* Vehicle Type */}

          <div className="col-span-2">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-text">نوع خودرو</span>

              {existingVehicle ? (
                <>
                  <div
                    className="
                      flex
                      h-12
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-border
                      bg-bg
                      px-4
                      text-sm
                      text-text-2
                    "
                  >
                    <span>{vehicleTypeLabel}</span>

                    <span
                      className="text-xs text-muted"
                      title="نوع خودرو قابل تغییر نیست"
                    >
                      قفل شده
                    </span>
                  </div>

                  <input type="hidden" {...register("vehicleType")} />

                  <span className="text-xs text-text-2">
                    این خودرو قبلاً با نوع{" "}
                    <strong className="font-medium text-text">
                      {vehicleTypeLabel}
                    </strong>{" "}
                    ثبت شده است. برای تغییر نوع خودرو با پشتیبانی تماس بگیرید.
                  </span>
                </>
              ) : (
                <>
                  <select
                    {...register("vehicleType")}
                    value={vehicleType ?? ""}
                    onChange={(event) =>
                      setValue(
                        "vehicleType",
                        event.target
                          .value as DriverRequestFormValues["vehicleType"],
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        },
                      )
                    }
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

                  {vehicleChecked && (
                    <span className="text-xs text-primary">
                      این خودرو هنوز در سیستم ثبت نشده است. نوع خودرو را انتخاب
                      کنید.
                    </span>
                  )}
                </>
              )}

              {errors.vehicleType && (
                <span className="text-xs text-danger">
                  {errors.vehicleType.message}
                </span>
              )}
            </label>
          </div>
        </div>
      </section>

      {/* Note */}

      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
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

      {/* Submit */}

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="
            w-full
            justify-center
            rounded-xl
            bg-primary-radial
            py-3
            text-sm
            font-medium
            text-surface
            transition
            hover:bg-primary-dark
            sm:w-52
          "
        >
          {loading ? "در حال ثبت..." : "ثبت درخواست"}
        </Button>
      </div>
    </form>
  );
}
