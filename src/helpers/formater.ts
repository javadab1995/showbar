
import { Currency } from "../types/load";


export const formatMoney = (
  value: number | null | undefined,
  currency: Currency,
) =>
  `${new Intl.NumberFormat("fa-IR").format(value ?? 0)} ${
    currency === "IRR" ? "تومان" : "دلار"
  }`;



type PlateParts = {
  prefix: string;
  letters: string;
  suffix: string;
};

export const parseTransitPlate = (
  plate: string,
): PlateParts | null => {
  const cleanPlate = plate
    .replace(/\s/g, "")
    .toUpperCase();

  const match = cleanPlate.match(/^(\d+)([A-Z]+)(\d+)$/);

  if (!match) return null;

  return {
    prefix: match[1],
    letters: match[2],
    suffix: match[3],
  };
};



type LicensePlateData = {
  prefix: string; // ۵۸
  letter: string; // پ
  suffix: string; // ۵۴۸
  cityCode: string; // ۱۰
};

export const parsePlate = (input: string): LicensePlateData | null => {
  // ۱. نرمال‌سازی: تبدیل اعداد فارسی به انگلیسی (اگر در دیتابیس فارسی ذخیره شده باشند)
  const normalized = input.replace(/[۰-۹]/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) - 1728),
  );

  // ۲. Regex جدید:
  // ^(\d+)       -> اعداد شروع (prefix)
  // ([\u0622-\u06CC]) -> حرف فارسی (letter)
  // (\d+)        -> اعداد وسط (suffix)
  // ایران         -> کلمه "ایران" به عنوان جداکننده
  // (\d+)$       -> اعداد پایان (cityCode)
  const regex = /^(\d+)([\u0622-\u06CC])(\d+)ایران(\d+)$/u;
  const match = normalized.match(regex);

  if (!match) return null;

  return {
    prefix: match[1],
    letter: match[2],
    suffix: match[3],
    cityCode: match[4],
  };
};





