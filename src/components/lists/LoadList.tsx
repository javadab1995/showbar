import { Load } from "../../types";
import { LoadCard } from "../card/LoadCard";
import { EmptyState } from "../ui/EmptyState";



type LoadListProps = {
  loads: Load[];
  basket: string[];
  onToggleBasket: (id: string) => void;
};

export function LoadList({ loads, basket, onToggleBasket }: LoadListProps) {
  if (!loads.length) {
    return (
      <EmptyState
        title="باری پیدا نشد"
        text="فیلترها یا عبارت جستجو را تغییر دهید."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {loads.map((load) => (
        <LoadCard
          key={load.id}
          load={load}
          selected={basket.includes(load.id)}
          onToggle={() => onToggleBasket(load.id)}
        />
      ))}
    </div>
  );
}
