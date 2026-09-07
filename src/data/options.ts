export type FilterOption = {
  value: string;
  label: string;
};

export const tradeTypeOptions: FilterOption[] = [
  {
    value: "export",
    label: "صادرات",
  },
  {
    value: "import",
    label: "واردات",
  },
];

export const cargoOptions: FilterOption[] = [
  {
    value: "food",
    label: "مواد غذایی",
  },
  {
    value: "industrial",
    label: "صنعتی",
  },
  {
    value: "chemical",
    label: "شیمیایی",
  },
  {
    value: "agricultural",
    label: "کشاورزی",
  },
  {
    value: "other",
    label: "سایر",
  },
];

export const tonnageOptions: FilterOption[] = [
  {
    value: "24-25",
    label: "۲۴ تا ۲۵ تن",
  },
  {
    value: "20-23",
    label: "۲۰ تا ۲۳ تن",
  },
  {
    value: "under-20",
    label: "زیر ۲۰ تن",
  },
  {
    value: "under-15",
    label: "زیر ۱۵ تن",
  },
  {
    value: "under-10",
    label: "زیر ۱۰ تن",
  },
];

export const fleetOptions: FilterOption[] = [
  {
    value: "tarpaulin",
    label: "چادری",
  },
  {
    value: "refrigerated",
    label: "یخچالی",
  },
  {
    value: "truck",
    label: "کامیونت",
  },
  {
    value: "tanker",
    label: "تانکر",
  },
  {
    value: "other",
    label: "سایر",
  },
];

export const borderOptions: FilterOption[] = [
  {
    value: "jolfa",
    label: "جلفا",
  },
  {
    value: "bazargan",
    label: "بازرگان",
  },
  {
    value: "razi",
    label: "رازی",
  },
  {
    value: "sarb",
    label: "سرو",
  },
  {
    value: "poldasht",
    label: "پلدشت",
  },
];

export const cityOptions: FilterOption[] = [
  {
    value: "تبریز",
    label: "تبریز",
  },
  {
    value: "ارومیه",
    label: "ارومیه",
  },
  {
    value: "تهران",
    label: "تهران",
  },
  {
    value: "مشهد",
    label: "مشهد",
  },
  {
    value: "اصفهان",
    label: "اصفهان",
  },
];



export const VEHICLE_OPTIONS = [
  { label: "تریلی", value: "trailer" },
  { label: "کامیون", value: "truck" },
];

export const STATUS_OPTIONS = [
  { label: "فعال", value: "active" },
  { label: "رزرو شده", value: "reserved" },
  { label: "تکمیل شده", value: "completed" },
];