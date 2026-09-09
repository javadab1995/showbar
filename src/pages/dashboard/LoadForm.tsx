import { useNavigate, useParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import toast from "react-hot-toast";

import { Loader2 } from "lucide-react";

import { Button } from "../../components/buttons/Button";
import { FormInput } from "../../components/inputs/FormInput";
import { TextAreaField } from "../../components/textarea/TextAreaField";
import { SelectField } from "../../components/selects/SelectField";


import {
  cargoOptions,
  STATUS_OPTIONS,
  VEHICLE_OPTIONS,
  TRADE_TYPE_OPTIONS,
  BORDER_OPTIONS,
  CURRENCY_OPTIONS,
} from "../../data/options";

import { createLoad, updateLoad } from "../../services/apiLoads";

import {
  loadSchema,
  type LoadFormInput,
  type LoadFormData,
} from "../../schemas/loadSchema";

import type { Coordinates, LoadData } from "../../types/load";
import { LocationField } from "../../components/maps/LocationField";


export function LoadForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoadFormInput, unknown, LoadFormData>({
    resolver: zodResolver(loadSchema),

    defaultValues: {
      origin: "",
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
      exit_border: "",

      weight: 0,
      price: 0,
      currency: "IRR",
      loading_date: "",

      status: "active",

      description: "",
    },
  });


  // --------------------------------------------------
  // Coordinates
  // --------------------------------------------------

  const originLatitude = watch("origin_latitude");
  const originLongitude = watch("origin_longitude");

  const destinationLatitude = watch("destination_latitude");
  const destinationLongitude = watch("destination_longitude");

  const originCoordinates: Coordinates | null =
    originLatitude !== null && originLongitude !== null
      ? {
          lat: originLatitude,
          lng: originLongitude,
        }
      : null;

  const destinationCoordinates: Coordinates | null =
    destinationLatitude !== null && destinationLongitude !== null
      ? {
          lat: destinationLatitude,
          lng: destinationLongitude,
        }
      : null;

  // --------------------------------------------------
  // Mutation
  // --------------------------------------------------

  const { isPending, mutate } = useMutation({
    mutationFn: (data: LoadData) => {
      if (id) {
        return updateLoad(id, data);
      }

      return createLoad(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["loads"],
      });

      toast.success(
        id ? "تغییرات بار با موفقیت ذخیره شد" : "بار جدید با موفقیت ثبت شد",
      );

      nav("/admin/loads");
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const onSubmit: SubmitHandler<LoadFormData> = (data) => {
    const loadData: LoadData = {
      origin: data.origin,
      destination: data.destination,

      origin_location_url: data.origin_location_url || null,
      destination_location_url: data.destination_location_url || null,

      origin_latitude: data.origin_latitude,
      origin_longitude: data.origin_longitude,

      destination_latitude: data.destination_latitude,
      destination_longitude: data.destination_longitude,

      cargo: data.cargo || null,
      cargo_type: data.cargo_type,

      vehicle_type: data.vehicle_type,

      trade_type: data.trade_type || null,
      exit_border: data.exit_border || null,

      weight: data.weight,
      price: data.price,
      currency: data.currency,

      loading_date: data.loading_date,

      status: data.status,

      description: data.description || null,
    };

    mutate(loadData);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">
      {/* ==================================================
          Header
      ================================================== */}

      <div>
        <h2 className="text-2xl font-bold text-text">
          {id ? "ویرایش بار" : "افزودن بار"}
        </h2>

        <p className="mt-1 text-sm text-text/60">
          اطلاعات بار، مسیر و مشخصات حمل را وارد کنید.
        </p>
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
                  flex size-8 items-center justify-center
                  rounded-lg
                  bg-primary
                  text-sm font-bold
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
            {/* Origin */}
            <FormInput
              label="مبدأ"
              type="text"
              placeholder="مثلاً تهران"
              {...register("origin")}
              error={errors.origin?.message}
            />

            {/* Destination */}
            <FormInput
              label="مقصد"
              type="text"
              placeholder="مثلاً استانبول"
              {...register("destination")}
              error={errors.destination?.message}
            />

            {/* Cargo */}
            <FormInput
              label="شرح بار"
              type="text"
              placeholder="مثلاً سیمان، فولاد، مواد غذایی"
              {...register("cargo")}
              error={errors.cargo?.message}
            />

            {/* Cargo type */}
            <SelectField
              label="نوع بار"
              options={cargoOptions}
              {...register("cargo_type")}
              error={errors.cargo_type?.message}
            />

            {/* Vehicle */}
            <SelectField
              label="نوع خودرو"
              options={VEHICLE_OPTIONS}
              {...register("vehicle_type")}
              error={errors.vehicle_type?.message}
            />

            {/* Trade */}
            <SelectField
              label="نوع تجارت"
              options={TRADE_TYPE_OPTIONS}
              {...register("trade_type")}
              error={errors.trade_type?.message}
            />

            {/* Border */}
            <SelectField
              label="مرز خروج"
              options={BORDER_OPTIONS}
              {...register("exit_border")}
              error={errors.exit_border?.message}
            />

            {/* Weight */}
            <FormInput
              label="وزن (تن)"
              type="number"
              step="0.01"
              {...register("weight")}
              error={errors.weight?.message}
            />

            {/* Loading date */}
            <FormInput
              label="تاریخ بارگیری"
              type="date"
              {...register("loading_date")}
              error={errors.loading_date?.message}
            />
          </div>
        </section>
        <div className="border-t border-border" />

        <section className="p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span
              className="
                  flex size-8 items-center justify-center
                  rounded-lg
                  bg-primary
                  text-sm font-bold
                  text-surface
                "
            >
              ۲
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

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 mt-4">
            <FormInput
              label="قیمت"
              type="number"
              {...register("price")}
              placeholder="مثلاً 250000000"
            />

            <SelectField
              label="ارز"
              options={CURRENCY_OPTIONS}
              {...register("currency")}
            />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* ==================================================
            02 - Locations
        ================================================== */}

        <section className="p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span
                className="
                  flex size-8 items-center justify-center
                  rounded-lg
                  bg-primary
                  text-sm font-bold
                  text-surface
                "
              >
                ۳
              </span>

              <div>
                <h3 className="text-base font-semibold text-text">
                  موقعیت‌های جغرافیایی
                </h3>

                <p className="mt-0.5 text-xs text-text/50">
                  در صورت نیاز موقعیت دقیق مبدأ و مقصد را مشخص کنید.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {/* Origin location */}

            <LocationField
              label="مبدأ"
              url={watch("origin_location_url") || null}
              coordinates={originCoordinates}
              onUrlChange={(url) => {
                setValue("origin_location_url", url ?? "", {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              onCoordinatesChange={(location) => {
                setValue("origin_latitude", location?.lat ?? null, {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                setValue("origin_longitude", location?.lng ?? null, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />

            {/* Destination location */}

            <LocationField
              label="مقصد"
              url={watch("destination_location_url") || null}
              coordinates={destinationCoordinates}
              onUrlChange={(url) => {
                setValue("destination_location_url", url ?? "", {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              onCoordinatesChange={(location) => {
                setValue("destination_latitude", location?.lat ?? null, {
                  shouldDirty: true,
                  shouldValidate: true,
                });

                setValue("destination_longitude", location?.lng ?? null, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* ==================================================
            03 - Description
        ================================================== */}

        <section className="p-6 md:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span
                className="
                  flex size-8 items-center justify-center
                  rounded-lg
                  bg-primary
                  text-sm font-bold
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

          <TextAreaField
            label="توضیحات بار"
            rows={5}
            placeholder="شرایط بارگیری، تخلیه، محدودیت‌ها و سایر توضیحات..."
            {...register("description")}
            error={errors.description?.message}
          />
        </section>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* ==================================================
            04 - Status
        ================================================== */}

        <section className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SelectField
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
            ) : id ? (
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
