import { getExitBorderLabel } from "../../helpers/exitBorders";

type Props = {
  value: string[] | null | undefined;
};



export default function BorderLabel({ value }: Props) {

     const borderLabel = getExitBorderLabel(value);
  return (
    <span>{borderLabel}</span>
  );
}
