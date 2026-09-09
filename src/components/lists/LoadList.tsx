import type { Load } from "../../types/load";
import { LoadCard } from "../card/LoadCard";


type LoadListProps = {
  loads: Load[];
  basket: string[];
  onToggleBasket: (id: string) => void;
  lastItemRef?: (node: HTMLElement | null) => void;
};

export function LoadList({
  loads,
  basket,
  onToggleBasket,
  lastItemRef,
}: LoadListProps) {
  if (!loads.length) {
    return (
      <div className="py-12 text-center text-text/60">
        باری با این مشخصات پیدا نشد.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {loads.map((load, index) => {
        const isLastItem = index === loads.length - 1;

        return (
          <div key={load.id} ref={isLastItem ? lastItemRef : undefined}>
            <LoadCard
              load={load}
              selected={basket.includes(load.id)}
              onToggle={() => onToggleBasket(load.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
