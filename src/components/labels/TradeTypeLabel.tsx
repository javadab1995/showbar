import { TRADE_TYPE_OPTIONS } from "../../data/options";


type Props = {
  value: string | null | undefined;
};

export default function TradeTypeLabel({ value }: Props) {
  return (
    <>
      {TRADE_TYPE_OPTIONS.find((option) => option.value === value)?.label ??
        "-"}
    </>
  );
}
