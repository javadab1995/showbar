export const formatMoney = (value, currency) =>
  new Intl.NumberFormat("fa-IR").format(value ?? 0) + `   ${currency === "IRR" ? "تومان" : "دلار"}`;

export function formatTime(timeString) {
  if (!timeString) return "";

  // فرض بر اینکه فرمت ورودی HH:mm:ss هست
  const [hours, minutes] = timeString.split(":");

  // تبدیل اعداد به ارقام فارسی
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  const toPersian = (num) =>
    num
      .toString()
      .split("")
      .map((n) => persianNumbers[n] || n)
      .join("");

  return `${toPersian(hours)}:${toPersian(minutes)}`;
}
