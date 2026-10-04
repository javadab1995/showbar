import { useState } from "react";
import type {
  FieldPath,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { DriverRequestFormValues } from "../../schemas/driverRequestSchema";
import { getVehicleByIdentifier, VehicleLookupResult } from "../../services/apiVehicles";


type VehicleLookupArgs = {
  identifierType: "PLATE" | "TRANSIT";
  plate?: string;
  transitCode?: string;

  setValue: UseFormSetValue<DriverRequestFormValues>;
  setError: UseFormSetError<DriverRequestFormValues>;
  clearErrors: UseFormClearErrors<DriverRequestFormValues>;
};

export function useVehicleLookup({
  identifierType,
  plate,
  transitCode,
  setValue,
  setError,
  clearErrors,
}: VehicleLookupArgs) {
  const [loading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);

  const [existingVehicle, setExistingVehicle] =
    useState<VehicleLookupResult | null>(null);

  const resetVehicleLookup = () => {
    setChecked(false);
    setExistingVehicle(null);

    clearErrors(["vehicleType", "transitCode"]);
  };

  const checkVehicle = async () => {
    const identifier =
      identifierType === "PLATE" ? plate?.trim() : transitCode?.trim();

    if (!identifier) {
      const field: FieldPath<DriverRequestFormValues> =
        identifierType === "PLATE" ? "plate" : "transitCode";

      setError(field, {
        type: "manual",
        message: "ابتدا شناسه خودرو را وارد کنید",
      });

      return;
    }

    if (identifierType === "TRANSIT") {
      const normalizedTransitCode = identifier.replace(/\s/g, "").toUpperCase();

      const isValid = /^\d{2}[A-Z]{1,3}\d{3}$/.test(normalizedTransitCode);

      if (!isValid) {
        setError("transitCode", {
          type: "manual",
          message: "شناسه ترانزیت باید مانند 50A601، 50AB601 یا 50ABC601 باشد",
        });

        return;
      }
    }

    setLoading(true);

    clearErrors(["vehicleType", "transitCode"]);

    try {
      const vehicle = await getVehicleByIdentifier({
        identifierType,
        plate: identifierType === "PLATE" ? plate : null,
        transitCode: identifierType === "TRANSIT" ? transitCode : null,
      });

      setChecked(true);

      if (vehicle) {
        /*
         * خودرو قبلاً در سیستم وجود دارد.
         *
         * نوع خودرو را از دیتابیس می‌گیریم
         * و اجازه تغییر از سمت راننده نمی‌دهیم.
         */

        setExistingVehicle(vehicle);

        setValue(
          "vehicleType",
          vehicle.vehicle_type as DriverRequestFormValues["vehicleType"],
          {
            shouldValidate: true,
            shouldDirty: false,
          },
        );

        return;
      }

      /*
       * خودرو جدید است.
       *
       * نوع قبلی را پاک می‌کنیم تا اگر کاربر
       * قبلاً خودرو دیگری را بررسی کرده بود،
       * نوع آن اشتباهی برای خودرو جدید باقی نماند.
       */

      setExistingVehicle(null);

      setValue("vehicleType", "", {
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Vehicle lookup error:", error);

      setChecked(false);
      setExistingVehicle(null);

      setError("vehicleType", {
        type: "manual",
        message: "بررسی خودرو انجام نشد. لطفاً دوباره تلاش کنید.",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    checked,
    existingVehicle,
    checkVehicle,
    resetVehicleLookup,
  };
}
