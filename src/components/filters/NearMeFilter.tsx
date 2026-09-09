import {
  LoaderCircle,
  MapPin,
} from "lucide-react";
import {
  useState,
} from "react";
import { Coordinates } from "../../types/load";



type NearMeFilterProps = {
  enabled: boolean;
  onChange: (
    enabled: boolean,
    coordinates: Coordinates | null,
  ) => void;
};

export function NearMeFilter({
  enabled,
  onChange,
}: NearMeFilterProps) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError(
        "مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.",
      );

      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
       const coordinates: Coordinates = {
         lat: position.coords.latitude,
         lng: position.coords.longitude,
       };

        setLoading(false);

        onChange(true, coordinates);
      },

      (error) => {
        setLoading(false);

        if (
          error.code ===
          error.PERMISSION_DENIED
        ) {
          setError(
            "دسترسی به موقعیت مکانی داده نشد.",
          );
        } else if (
          error.code ===
          error.POSITION_UNAVAILABLE
        ) {
          setError(
            "موقعیت مکانی در دسترس نیست.",
          );
        } else {
          setError(
            "دریافت موقعیت مکانی ناموفق بود.",
          );
        }

        onChange(false, null);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5 * 60 * 1000,
      },
    );
  };

  const handleChange = () => {
    if (enabled) {
      setError(null);
      onChange(false, null);
      return;
    }

    getLocation();
  };

  return (
    <div className="flex flex-col gap-1.5 xl:col-span-2">
      <button
        type="button"
        onClick={handleChange}
        disabled={loading}
        className="
          flex
          py-1
          items-center
          gap-2
          rounded-full
          border
          border-border
          px-3
          text-xs
          text-text
          transition
          hover:border-primary
          disabled:cursor-wait
          disabled:opacity-60
          h-9
          xl:col-span-2
        "
      >
        {loading ? (
          <LoaderCircle size={17} className="animate-spin" />
        ) : (
          <MapPin
            size={17}
            className={enabled ? "text-primary" : "text-text-2"}
          />
        )}

        <span>نزدیک‌ترین به من</span>

        {/* Switch */}

        <span
          className={`
            mr-auto
            flex
            h-5
            w-9
            items-center
            rounded-full
            p-0.5
            transition
            ${enabled ? "bg-primary" : "bg-border"}
          `}
        >
          <span
            className={` 
              h-4
              w-4
              rounded-full
              bg-surface
              shadow-sm
              transition-transform
              ${enabled ? "-translate-x-4" : "translate-x-0"}
            `}
          />
        </span>
      </button>

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}