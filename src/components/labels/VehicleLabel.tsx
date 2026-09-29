import { VEHICLE_OPTIONS } from "../../data/options";


type Props = {
  value: string | null | undefined;
};

export default function VehicleLabel({ value }: Props) {
  return (
    <span>
      {VEHICLE_OPTIONS.find((option) => option.value === value)?.label ??
        "سایر"}
    </span>
  );
}
