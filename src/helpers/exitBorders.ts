import { BORDER_OPTIONS } from "../data/options";

export function normalizeExitBorders(
  value: string[] | null | undefined,
): string[] {
  return value ?? [];
}

export function getExitBorderLabels(
  value: string[] | null | undefined,
): string[] {
  return normalizeExitBorders(value)
    .map(
      (border) =>
        BORDER_OPTIONS.find((option) => option.value === border)?.label,
    )
    .filter((label): label is string => Boolean(label));
}

export function getExitBorderLabel(value: string[] | null | undefined): string {
  return getExitBorderLabels(value).join("، ");
}
