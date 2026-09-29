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
      <div className="grid place-items-center ">
        <div className="rounded-lg  shadow-lg">
          <div className="flex w-full rounded-lg border-4 border-blue-700 bg-surface shadow">
            <label className="flex flex-col justify-center items-center bg-blue-700 rounded-l p-4 text-2xl font-bold text-white">
              <img
                className="h-8"
                src="/flags/ir.svg"
              />
              IR
            </label>
            <label className="flex items-center font-mono text-6xl font-medium ">
              <span className=" h-full flex font-bold items-center p-1">
                {parts?.suffix}
              </span>

              <span className="bg-red-500 font-bold text-white h-full flex items-center p-1">
                {parts?.letters}
              </span>
              <span className=" h-full font-bold flex items-center p-1">
                {parts?.prefix}
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="ltr"
      className="flex h-20 w-80 overflow-hidden rounded-lg border-4 border-black bg-yellow-400 shadow-lg font-sans"
    >
      <div className="flex w-10 flex-col items-center justify-between bg-blue-800 py-1 text-[10px] font-bold text-white">
        <span>IR</span>
        <span className="[writing-mode:vertical-lr] tracking-widest">IRAN</span>
      </div>

      <div className="flex flex-1 items-center justify-center gap-2 px-4 text-6xl font-extrabold text-black">
        <span>{toPersianDigits(Number(data?.prefix))}</span>
        <span className="text-rose-700 text-4xl">{data?.letter}</span>
        <span>{toPersianDigits(Number(data?.suffix))}</span>
      </div>

      {/* ۳. باکس کد شهر */}
      <div className="flex w-16 flex-col items-center justify-center border-l-4 border-black bg-yellow-400 px-1">
        <span className=" font-bold text-black">ایران</span>
        <span className="text-2xl font-extrabold text-black">
          {toPersianDigits(Number(data?.cityCode))}
        </span>
      </div>
    </div>
  );
}
