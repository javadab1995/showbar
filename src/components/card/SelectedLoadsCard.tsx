import { Loader } from "lucide-react";
import type { Load } from "../../types/load";
import SelectedLoadItem from "../items/SelectedLoadItem";


type Props = {
  loads: Load[];
  loading:Boolean
};

export default function SelectedLoadsCard({ loads, loading }: Props) {

  if (loading) return <Loader />
  
  return (
    <aside
      className="
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-surface
      "
    >
      <div
        className="
          border-b
          border-border
          px-5
          py-4
        "
      >
        <h2 className="text-sm font-semibold text-primary-dark">
          بارهای موردنظر شما
        </h2>

        <p className="mt-1 text-xs text-primary">
          {loads.length} بار انتخاب شده
        </p>
      </div>

      {loads.map((load, index) => (
        <SelectedLoadItem
          key={load.id}
          load={load}
          isLast={index === loads.length - 1}
        />
      ))}
    </aside>
  );
}
