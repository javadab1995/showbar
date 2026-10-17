import { parsePlate, parseTransitPlate } from "../../helpers/formater";
import { toPersianDigits } from "../../helpers/number";

type Props = {
  type: "PLATE" | "TRANSIT";
  value: string;
};

export default function VehiclePlate({ type, value }: Props) {
  const parts = parseTransitPlate(value);
  const data = parsePlate(value);

  if (type === "TRANSIT") {
    return (
      <div className="grid w-full min-w-0 place-items-center">
        <div className="w-full min-w-0 max-w-full rounded-lg shadow-lg">
          <div className="flex min-w-0 w-full overflow-hidden rounded-lg border-2 sm:border-4 border-blue-700 bg-surface shadow">
            <label className="flex shrink-0 flex-col items-center justify-center rounded-l bg-blue-700 p-2 sm:p-4 text-lg sm:text-2xl font-bold text-white">
              <img className="h-6 sm:h-8" src="/flags/ir.svg" alt="Iran" />
              IR
            </label>

            <div className="flex min-w-0 flex-1 items-stretch justify-around font-mono text-2xl sm:text-4xl md:text-6xl font-medium">
              <span className="flex min-w-0 items-center p-1 font-bold">
                {parts?.suffix}
              </span>

              <span className="flex min-w-0 items-center bg-red-500 p-1 font-bold text-white">
                {parts?.letters}
              </span>

              <span className="flex min-w-0 items-center p-1 font-bold">
                {parts?.prefix}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="flex h-14 sm:h-20 w-full min-w-0 max-w-80 overflow-hidden rounded-lg border-2 sm:border-4 border-black bg-yellow-400 font-sans shadow-lg"
    >
      <div className="flex w-7 sm:w-10 shrink-0 flex-col items-center justify-between bg-blue-800 py-1 text-[8px] sm:text-[10px] font-bold text-white">
        <span>IR</span>
        <span className="[writing-mode:vertical-lr] tracking-widest">IRAN</span>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-evenly gap-0.5 sm:gap-2 px-1 sm:px-3 text-2xl sm:text-4xl md:text-6xl font-extrabold text-black">
        <span>{toPersianDigits(Number(data?.prefix))}</span>
        <span className="text-rose-700 text-xl sm:text-3xl md:text-4xl">
          {data?.letter}
        </span>
        <span>{toPersianDigits(Number(data?.suffix))}</span>
      </div>

      <div className="flex w-12 sm:w-16 shrink-0 flex-col items-center justify-center border-l-2 sm:border-l-4 border-black bg-yellow-400 px-0.5 sm:px-1">
        <span className="text-xs sm:text-base font-bold text-black">ایران</span>
        <span className="text-lg sm:text-2xl font-extrabold text-black">
          {toPersianDigits(Number(data?.cityCode))}
        </span>
      </div>
    </div>
  );
}
