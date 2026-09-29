import type { ReactNode } from "react";

export type TabItem<T extends string> = {
  id: T;
  label: string;
  icon?: ReactNode;
};

type TabsProps<T extends string> = {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
};

export default function Tabs<T extends string>({
  items,
  value,
  onChange,
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className="flex w-fit items-center gap-1 rounded-lg border border-border bg-surface p-1"
    >
      {items.map((item) => {
        const isActive = item.id === value;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`
              flex items-center gap-2
              rounded-md px-2 py-1
              text-xs font-medium
              transition-colors
              ${
                isActive
                  ? "bg-primary-radial text-surface"
                  : "text-text-2 hover:bg-surface-2 hover:text-text"
              }
            `}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
