import { BORDER_OPTIONS } from "../data/options";


export function normalizeExitBorders(
  value: string | string[] | null | undefined,
): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // مقدار JSON نیست، پس یک مقدار معمولی است.
  }

  return [value];
}

export function getExitBorderLabels(
  value: string | string[] | null | undefined,
): string[] {
  return normalizeExitBorders(value)
    .map(
      (border) =>
        BORDER_OPTIONS.find((option) => option.value === border)?.label,
    )
    .filter((label): label is string => Boolean(label));
}

export function getExitBorderLabel(
  value: string | string[] | null | undefined,
): string {
  return getExitBorderLabels(value).join("، ");
}
