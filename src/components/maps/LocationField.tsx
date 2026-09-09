import { useState } from "react";
import { Link2, Map, MapPin, X } from "lucide-react";

import { FormInput } from "../inputs/FormInput";
import { LocationPicker } from "./LocationPicker";
import { Coordinates } from "../../types/load";



type LocationMode = "none" | "url" | "map";

interface LocationFieldProps {
  label: string;

  url: string | null;
  coordinates: Coordinates | null;

  onUrlChange: (url: string | null) => void;
  onCoordinatesChange: (coordinates: Coordinates | null) => void;
}

export function LocationField({
  label,
  url,
  coordinates,
  onUrlChange,
  onCoordinatesChange,
}: LocationFieldProps) {
  const [mode, setMode] = useState<LocationMode>(() => {
    if (coordinates) return "map";
    if (url) return "url";

    return "none";
  });

  const handleModeChange = (nextMode: LocationMode) => {
    setMode(nextMode);

    if (nextMode === "none") {
      onUrlChange(null);
      onCoordinatesChange(null);
    }

    if (nextMode === "url") {
      onCoordinatesChange(null);
    }

    if (nextMode === "map") {
      onUrlChange(null);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <MapPin size={20} />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-text">{label}</h4>

          <p className="mt-0.5 text-xs text-text/50">
            موقعیت دقیق {label} را مشخص کنید
          </p>
        </div>
      </div>

      {/* Mode selector */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => handleModeChange("none")}
          className={`
            flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5
            text-sm transition
            ${
              mode === "none"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-surface text-text/60 hover:bg-bg"
            }
          `}
        >
          <X size={16} />
          بدون موقعیت
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("url")}
          className={`
            flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5
            text-sm transition
            ${
              mode === "url"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-surface text-text/60 hover:bg-bg"
            }
          `}
        >
          <Link2 size={16} />
          لینک Maps
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("map")}
          className={`
            flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5
            text-sm transition
            ${
              mode === "map"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-surface text-text/60 hover:bg-bg"
            }
          `}
        >
          <Map size={16} />
          انتخاب روی نقشه
        </button>
      </div>

      {/* None */}
      {mode === "none" && (
        <div className="mt-4 rounded-lg bg-bg px-4 py-3 text-sm text-text/50">
          موقعیت دقیق برای این نقطه ثبت نخواهد شد.
        </div>
      )}

      {/* URL */}
      {mode === "url" && (
        <div className="mt-4">
          <FormInput
            label="لینک موقعیت"
            type="url"
            placeholder="https://maps.google.com/..."
            value={url ?? ""}
            onChange={(event) => onUrlChange(event.target.value || null)}
          />

          <p className="mt-2 text-xs text-text/45">
            لینک موقعیت را از Google Maps کپی و اینجا وارد کنید.
          </p>
        </div>
      )}

      {/* Map */}
      {mode === "map" && (
        <div className="mt-4">
          <LocationPicker
            label=""
            value={coordinates}
            onChange={onCoordinatesChange}
          />
        </div>
      )}
    </div>
  );
}
