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
        rounded-full border border-border
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

     
    </div>
  );
}
