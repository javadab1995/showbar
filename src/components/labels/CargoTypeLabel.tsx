import { cargoOptions } from "../../data/options";

type Props = {
  value: string | null | undefined;
  name?: string | null | undefined;
};

export default function CargoTypeLabel({ value, name }: Props) {
  const typeLabel =
    cargoOptions.find((option) => option.value === value)?.label ?? "-";

  return (
    <div className="flex items-center gap-2">
      {name && <span className="font-medium text-text">{name}</span>}

      <span className="text-sm text-text-2 bg-surface-2 rounded-md p-1">
        {typeLabel}
      </span>
    </div>
  );
}
