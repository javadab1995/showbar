import type { ReactNode } from "react";

type LoadInfoItemProps = {
  label: string;
  value: ReactNode;
};

export function LoadInfoItem({ label, value }: LoadInfoItemProps) {
  return (
    <div
      className="
        flex
        min-h-16
        flex-col
        justify-center
        gap-1
        px-5
        py-3
        sm:odd:border-l
        sm:nth-[-n+4]:border-b
        sm:nth-5:border-l
      "
    >
      <span className="text-xs text-text-2">{label}</span>

      <div className="text-sm font-medium text-text">{value}</div>
    </div>
  );
}
