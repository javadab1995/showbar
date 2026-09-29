
type Props = {
  value: string[] | null | undefined;
};

export default function BorderLabel({ value }: Props) {
  return (
    <span>{value}</span>
  );
}
