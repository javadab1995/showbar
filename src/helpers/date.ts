import { differenceInDays, format, parseISO } from "date-fns-jalali";

import { toPersianDigits } from "./number";

type DateInput = string | Date | null | undefined;

function toDate(date: string | Date): Date {
  return typeof date === "string" ? parseISO(date) : date;
}

export function toPersianDate(date: DateInput): string {
  if (!date) return "";

  return toPersianDigits(format(toDate(date), "yyyy/MM/dd"));
}

export function daysBetween(
  startDate: DateInput,
  endDate: DateInput,
): number | null {
  if (!startDate || !endDate) return null;

  return differenceInDays(toDate(endDate), toDate(startDate));
}

export function calculateAge(birthDateString: string | Date): number {
  const today = new Date();
  const birthDate = toDate(birthDateString);

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function formatDate(date: DateInput): string | null {
  if (!date) return null;

  return format(toDate(date), "yyyy-MM-dd");
}

export function calculateDurationDays(
  startDate: string | Date,
  endDate: string | Date,
): number {
  return differenceInDays(toDate(endDate), toDate(startDate)) + 1;
}
