import { useEffect } from "react";

import { Controller, useForm, type SubmitHandler } from "react-hook-form";

import { useNavigate, useParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import { Button } from "../../components/buttons/Button";

import { FormInput } from "../../components/inputs/FormInput";

import { FormTextarea } from "../../components/inputs/FormTextarea";

import { FormSelect } from "../../components/inputs/FormSelect";

import { LocationField } from "../../components/maps/LocationField";

import { DatePickerField } from "../../components/inputs/DatePickerField";

import {
  cargoOptions,
  STATUS_OPTIONS,
  VEHICLE_OPTIONS,
  TRADE_TYPE_OPTIONS,
  BORDER_OPTIONS,
  CURRENCY_OPTIONS,
  countryOptions,
} from "../../data/options";

import {
  loadSchema,
  type LoadFormInput,
  type LoadFormData,
} from "../../schemas/loadSchema";

import type { LoadData } from "../../types/load";
import { useLoad } from "../../hooks/other/useLoad";
import { useCreateLoad } from "../../hooks/admin/useCreateLoad";
import { useUpdateLoad } from "../../hooks/admin/useUpdateLoad";
import Spinner from "../../components/widgets/Spinner";

import GoToLoads from "../../components/buttons/GoToLoads";
import { CitySearch } from "../../components/inputs/CitySearch";
import { MultiSelect } from "../../components/selects/MultiSelect";

export function LoadForm() {
  // ==================================================
  // Route
  // ==================================================

  const { id } = useParams();

  const nav = useNavigate();

  const isEdit = Boolean(id);

  // ==================================================
  // Load data
  // ==================================================

  const { data: load, isLoading: isLoadLoading } = useLoad(id);

  // ==================================================
  // Mutations
  // ==================================================

  const createMutation = useCreateLoad();

  const updateMutation = useUpdateLoad();

  const isPending = createMutation.isPending || updateMutation.isPending;

  // ==================================================
  // Form
  // ==================================================

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,

    formState: { errors },
  } = useForm<LoadFormInput, unknown, LoadFormData>({
    resolver: zodResolver(loadSchema),

    defaultValues: {
      origin_country_code: "IR",
      origin: "",

      destination_country_code: "",
      destination: "",

      origin_location_url: "",

      destination_location_url: "",

      origin_latitude: null,

      origin_longitude: null,

      destination_latitude: null,

      destination_longitude: null,

      cargo: "",

      cargo_type: "",

      vehicle_type: "",

      trade_type: "",

      exit_borders: [],

      weight: 0,

      price: 0,

      currency: "IRR",

      loading_date: "",

      status: "active",

      description: "",
    },
  });

  // ==================================================
  // Reset edit data
  // ==================================================

  useEffect(() => {
    if (!load) return;

    reset({
      origin_country_code: load?.origin_country_code ?? "",
      origin: load.origin ?? "",

      destination_country_code: load?.destination_country_code ?? "",
      destination: load.destination ?? "",

      origin_latitude: load.origin_latitude ?? null,

      origin_longitude: load.origin_longitude ?? null,

      destination_latitude: load.destination_latitude ?? null,

      destination_longitude: load.destination_longitude ?? null,

      cargo: load.cargo ?? "",

      cargo_type: load.cargo_type ?? "",

      vehicle_type: load.vehicle_type ?? "",

      trade_type: load.trade_type ?? "",

      exit_borders: load.exit_borders ?? [],

      weight: load.weight ?? 0,

      price: load.price ?? 0,

      currency: load.currency ?? "IRR",

      loading_date: load.loading_date ?? "",

      status: load.status ?? "active",

      description: load.description ?? "",
    });
  }, [load, reset]);

  // ==================================================
  // Coordinates
  // ==================================================

  // ==================================================
  // Trade type
  // ==================================================

  const tradeType = watch("trade_type");

  const showBorder = tradeType === "export" || tradeType === "import";

  // ==================================================
  // Submit
  // ==================================================

  const onSubmit: SubmitHandler<LoadFormData> = (data) => {
    const loadData: LoadData = {
      origin_country_code: data.origin_country_code,
      origin: data.origin,

      destination_country_code: data.destination_country_code,
      destination: data.destination,

      origin_latitude: data.origin_latitude,

      origin_longitude: data.origin_longitude,

      destination_latitude: data.destination_latitude,

      destination_longitude: data.destination_longitude,

      cargo: data.cargo || null,

      cargo_type: data.cargo_type,

      vehicle_type: data.vehicle_type,

      trade_type: data.trade_type || null,

      exit_borders: data.exit_borders ?? [],

      weight: data.weight,

      price: data.price,

      currency: data.currency,

      loading_date: data.loading_date,

      status: data.status,

      description: data.description || null,
    };

    if (isEdit && id) {
      updateMutation.mutate({
        id,
        data: loadData,
      });

      return;
    }

    createMutation.mutate(loadData);
  };

  const originCountryCode = watch("origin_country_code");
  const destinationCountryCode = watch("destination_country_code");

  // ==================================================
  // Loading edit data
  // ==================================================

  if (isEdit && isLoadLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">
      {/* ==================================================
          Header
      ================================================== */}

      <div>
        <h2 className="text-2xl font-bold text-text">
          {isEdit ? "ویرایش بار" : "افزودن بار"}
        </h2>

        <p className="mt-1 text-sm text-text/60">
          اطلاعات بار، مسیر و مشخصات حمل را وارد کنید.
        </p>
        <GoToLoads to="/admin/loads" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-surface
          shadow-sm
        "
      >
        {/* ==================================================
            01 - Basic information
        ================================================== */}

        <section className="p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span
                className="
                  flex
                  size-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary
                  text-sm
                  font-bold
                  text-surface
                "
              >
                ۱
              </span>

              <div>
                <h3 className="text-base font-semibold text-text">
                  اطلاعات اصلی بار
                </h3>

                <p className="mt-0.5 text-xs text-text/50">
                  مشخصات کلی بار و حمل
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormSelect
              label="کشور مبدأ"
              options={countryOptions}
              {...register("origin_country_code")}
              error={errors.origin_country_code?.message}
            />

            <Controller
              name="origin"
              control={control}
              render={({ field }) => (
                <CitySearch
                  label="شهر مبدأ"
                  countryCode={originCountryCode}
                  value={field.value}
                  onChange={field.onChange}
                  onCitySelect={(city) => {
                    setValue("origin_latitude", city?.latitude ?? null, {
                      shouldDirty: true,
                    });

                    setValue("origin_longitude", city?.longitude ?? null, {
                      shouldDirty: true,
                    });
                  }}
                  error={errors.origin?.message}
                />
              )}
            />

            <FormSelect
              label="کشور مقصد"
              options={countryOptions}
              {...register("destination_country_code")}
              error={errors.destination_country_code?.message}
            />

            <Controller
              name="destination"
              control={control}
              render={({ field }) => (
                <CitySearch
                  label="شهر مقصد"
                  countryCode={destinationCountryCode}
                  value={field.value}
                  onChange={field.onChange}
                  onCitySelect={(city) => {
                    setValue("destination_latitude", city?.latitude ?? null, {
                      shouldDirty: true,
                    });

                    setValue("destination_longitude", city?.longitude ?? null, {
                      shouldDirty: true,
                    });
                  }}
                  error={errors.destination?.message}
                />
              )}
            />
            <FormInput
              label="شرح بار"
              type="text"
              placeholder="مثلاً سیمان، فولاد، مواد غذایی"
              {...register("cargo")}
              error={errors.cargo?.message}
            />

            <FormSelect
              label="نوع بار"
              options={cargoOptions}
              {...register("cargo_type")}
              error={errors.cargo_type?.message}
            />

            <FormSelect
              label="نوع ناوگان"
              options={VEHICLE_OPTIONS}
              {...register("vehicle_type")}
              error={errors.vehicle_type?.message}
            />

            <FormSelect
              label="نوع تجارت"
              options={TRADE_TYPE_OPTIONS}
              {...register("trade_type")}
              error={errors.trade_type?.message}
            />

            {showBorder && (
              <Controller
                name="exit_borders"
                control={control}
                render={({ field, fieldState }) => (
                  <MultiSelect
                    options={BORDER_OPTIONS}
                    value={field.value ?? []}
                    onChange={field.onChange}
                    placeholder="انتخاب مرز خروج | ورود"
                    disabled={isPending}
                    className="h-12 flex items-center
            w-full
            rounded-xl
            border border-border mt-5
            bg-bg
            px-4
            text-sm
            text-text
            outline-none
            transition
            disabled:cursor-not-allowed
            disabled:opacity-60"
                  />
                )}
              />
            )}
            <FormInput
              label="وزن (تن)"
              type="number"
              step="0.01"
              {...register("weight")}
              error={errors.weight?.message}
            />

            <Controller
              name="loading_date"
              control={control}
              render={({
                field: { onChange, value },

                fieldState: { error },
              }) => (
                <DatePickerField
                  label="تاریخ بارگیری"
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />
          </div>
        </section>

        <div className="border-t border-border" />

        {/* ==================================================
            02 - Price
        ================================================== */}

        <section className="p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span
              className="
                flex
                size-8
                items-center
                justify-center
                rounded-lg
                bg-primary
                text-sm
                font-bold
                text-surface
              "
            >
              ۲
            </span>

            <div>
              <h3 className="text-base font-semibold text-text">
                اطلاعات مالی
              </h3>

              <p className="mt-0.5 text-xs text-text/50">
                مبلغ پیشنهادی حمل بار
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-6 ">
            <FormSelect
              label="ارز"
              options={CURRENCY_OPTIONS}
              {...register("currency")}
              error={errors.currency?.message}
            />

            <FormInput
              label="قیمت"
              type="number"
              placeholder="مثلاً 250000000"
              {...register("price")}
              error={errors.price?.message}
            />
          </div>
        </section>

        <div className="border-t border-border" />

        <div className="border-t border-border" />

        {/* ==================================================
            04 - Description
        ================================================== */}

        <section className="p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span
                className="
                  flex
                  size-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-primary
                  text-sm
                  font-bold
                  text-surface
                "
              >
                ۴
              </span>

              <div>
                <h3 className="text-base font-semibold text-text">توضیحات</h3>

                <p className="mt-0.5 text-xs text-text/50">
                  اطلاعات تکمیلی مربوط به بار
                </p>
              </div>
            </div>
          </div>

          <FormTextarea
            label="توضیحات بار"
            hint="اختیاری"
            rows={5}
            placeholder="
              شرایط بارگیری، تخلیه،
              محدودیت‌ها و سایر توضیحات...
            "
            {...register("description")}
            error={errors.description?.message}
          />
        </section>

        <div className="border-t border-border" />

        {/* ==================================================
            05 - Status
        ================================================== */}

        <section className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormSelect
              label="وضعیت بار"
              options={STATUS_OPTIONS}
              {...register("status")}
              error={errors.status?.message}
            />
          </div>
        </section>

        {/* ==================================================
            Actions
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-3
            border-t
            border-border
            bg-bg/40
            px-6
            py-5
            md:px-8
          "
        >
          <Button
            type="button"
            onClick={() => nav("/admin/loads")}
            className="
              rounded-md
              bg-surface-radial
              px-4
              py-2.5
              text-surface
            "
          >
            انصراف
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-md
              bg-primary-radial
              px-5
              py-2.5
              font-medium
              text-surface
              transition-opacity
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                در حال ذخیره...
              </>
            ) : isEdit ? (
              "ذخیره تغییرات"
            ) : (
              "ثبت بار"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
