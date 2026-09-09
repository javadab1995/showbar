import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import { MapPin, Trash2 } from "lucide-react";

import "leaflet/dist/leaflet.css";
import { Coordinates } from "../../types/load";



type LocationPickerProps = {
  value?: Coordinates | null;
  onChange: (location: Coordinates | null) => void;
    label?: string;
};

const DEFAULT_CENTER: [number, number] = [35.6892, 51.389];

function LocationMarker({
  value,
    onChange,
  label
}: {
  value?: Coordinates | null;
        onChange: (location: Coordinates) => void;
        label?: string;
}) {
  useMapEvents({
    click(event) {
      onChange({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  if (!value) return null;

  return <Marker position={[value.lat, value.lng]} />;
}

export function LocationPicker({ value, onChange, label }: LocationPickerProps) {
  const [location, setLocation] = useState<Coordinates | null>(value ?? null);

  useEffect(() => {
    setLocation(value ?? null);
  }, [value]);

  const handleChange = (coordinates: Coordinates) => {
    setLocation(coordinates);
    onChange(coordinates);
  };

  const handleClear = () => {
    setLocation(null);
    onChange(null);
  };

  return (
    <div className="space-y-3">
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div
            className="
              flex
              size-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-primary-soft
              text-primary
            "
          >
            <MapPin size={20} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text">
             {label}
            </h3>

            <p className="mt-1 text-xs leading-6 text-text-2">
              برای انتخاب موقعیت، روی نقشه کلیک کنید. این اطلاعات برای نمایش
              بارهای نزدیک به رانندگان استفاده می‌شود.
            </p>
          </div>
        </div>

        {location && (
          <button
            type="button"
            onClick={handleClear}
            className="
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-lg
              px-2
              py-1.5
              text-xs
              text-danger
              transition-colors
              hover:bg-danger/10
            "
          >
            <Trash2 size={15} />
            حذف
          </button>
        )}
      </div>

      {/* Map */}

      <div
        className="
          relative
          h-80
          overflow-hidden
          rounded-xl
          border
          border-border
        "
      >
        <MapContainer
          center={location ? [location.lat, location.lng] : DEFAULT_CENTER}
          zoom={location ? 13 : 6}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker value={location} onChange={handleChange} />
        </MapContainer>

        {/* Hint */}

        {!location && (
          <div
            className="
              pointer-events-none
              absolute
              bottom-3
              right-3
              z-1000
              rounded-lg
              border
              border-border
              bg-surface/95
              px-3
              py-2
              text-xs
              text-text-2
              shadow-sm
            "
          >
            روی نقشه کلیک کنید تا موقعیت انتخاب شود
          </div>
        )}
      </div>

      {/* Coordinates */}

      {location && (
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
            rounded-lg
            border
            border-primary/15
            bg-primary-soft
            px-4
            py-3
          "
        >
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-primary" />

            <span className="text-xs text-text-2">موقعیت انتخاب شده:</span>
          </div>

          <div className="flex gap-4 text-xs font-medium text-primary">
            <span>Lat: {location.lat.toFixed(6)}</span>

            <span>Lng: {location.lng.toFixed(6)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
