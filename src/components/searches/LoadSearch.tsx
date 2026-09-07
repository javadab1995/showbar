import { Search, SearchIcon } from "lucide-react";

type LoadSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function LoadSearch({ value, onChange }: LoadSearchProps) {
  return (
    <div
      className="
        relative mb-5 flex h-10 max-w-4xl
        items-center gap-1.5
        rounded-lg border border-border
        p-1 px-4
      "
    >
      <Search size={19} className="shrink-0 text-muted" />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="جستجوی مبدأ، مقصد، نوع بار..."
        className="
          w-full bg-transparent
          text-xs text-text
          outline-none
          placeholder:text-xs
          placeholder:text-muted
        "
      />

      <button
        type="button"
        className="
          absolute left-0 flex h-full
          items-center gap-2
          rounded-lg bg-primary-radial
          px-2 py-1 text-surface
        "
      >
        <span className="text-sm">جستجو</span>

        <SearchIcon size={16} />
      </button>
    </div>
  );
}
