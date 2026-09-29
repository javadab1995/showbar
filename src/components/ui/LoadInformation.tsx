
import { toPersianDate } from "../../helpers/date";
import { toPersianDigits } from "../../helpers/number";

import type { Load } from "../../types/load";

import { LoadInfoItem } from "../items/LoadInfoItem";
import CargoTypeLabel from "../labels/CargoTypeLabel";
import VehicleLabel from "../labels/VehicleLabel";
import BorderLabel from "../labels/BorderLabel";
import TradeTypeLabel from "../labels/TradeTypeLabel";
import { formatMoney } from "../../helpers/formater";
import { getExitBorderLabels } from "../../helpers/exitBorders";


type LoadInformationProps = {
  load: Load;
};

export function LoadInformation({ load }: LoadInformationProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-xl
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
        <h2
          className="
            text-sm
            font-semibold
            text-text
          "
        >
          اطلاعات بار
        </h2>
      </div>

      <div
        className="
          grid
          grid-cols-1
          divide-y
          divide-border
          sm:grid-cols-2
          sm:divide-y-0
        "
      >
        <LoadInfoItem
          label="نوع بار"
          value={<CargoTypeLabel value={load.cargo_type} name={load.cargo} />}
        />

        <LoadInfoItem
          label="وزن"
          value={`${toPersianDigits(load.weight)} تن`}
        />

        <LoadInfoItem
          label="نوع خودرو"
          value={<VehicleLabel value={load.vehicle_type} />}
        />

        <LoadInfoItem
          label="نوع معامله"
          value={<TradeTypeLabel value={load.trade_type} />}
        />

        <LoadInfoItem
          label="مرز خروج"
          value={<BorderLabel value={getExitBorderLabels(load.exit_borders)} />}
        />

        <LoadInfoItem
          label="تاریخ بارگیری"
          value={load.loading_date ? toPersianDate(load.loading_date) : "-"}
        />

        <LoadInfoItem label="کرایه" value={formatMoney(load.price, load.currency)} />

        <LoadInfoItem
          label="تاریخ ثبت"
          value={load.created_at ? toPersianDate(load.created_at) : "-"}
        />
      </div>
    </section>
  );
}
