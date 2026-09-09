export function toPersianDigits(value) {
 
  return String(value ?? "").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

export const toEnglishDigits = (str) => {
  
  if (!str) return "";
  return String(str).replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
};
