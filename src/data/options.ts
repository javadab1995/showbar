export type FilterOption = {
  value: string;
  label: string;
};

export const TRADE_TYPE_OPTIONS = [
  {
    label: "صادرات",
    value: "export",
  },
  {
    label: "واردات",
    value: "import",
  },
  {
    label: "داخلی",
    value: "transit",
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
  { label: "چادری", value: "curtain_side" },
  { label: "تانکر", value: "tanker" },
  { label: "یخچالی", value: "refrigerated" },
  { label: "کامیونت", value: "light_truck" },
  { label: "سایر", value: "other" },
];

export const BORDER_OPTIONS: FilterOption[] = [
  // --- مرزهای ترکیه ---
  { value: "bazargan", label: "بازرگان" }, // مقابل گوربلاک
  { value: "razi", label: "رازی" }, // مقابل کاپیکوی
  { value: "sero", label: "سرو" }, // مقابل اسندره

  // --- مرزهای عراق ---
  { value: "mehran", label: "مهران" },
  { value: "khosravi", label: "خسروی" },
  { value: "parvizkhan", label: "پرویزخان" },
  { value: "bashmaq", label: "باشماق" },
  { value: "tamarchin", label: "تمرچین" },
  { value: "shalamcheh", label: "شلمچه" },
  { value: "chazzabeh", label: "چذابه" },

  // --- مرزهای آذربایجان (و نخجوان) ---
  { value: "astara", label: "آستارا" },
  { value: "bileh-savar", label: "بیله‌سوار" },
  { value: "jolfa", label: "جلفا" },
  { value: "poldasht", label: "پلدشت" },

  // --- مرزهای ارمنستان ---
  { value: "nourdouz", label: "نوردوز" },

  // --- مرزهای ترکمنستان ---
  { value: "sarakhs", label: "سرخس" },
  { value: "lotfabad", label: "لطف‌آباد" },
  { value: "bajgiran", label: "باجگیران" },
  { value: "incheh-borun", label: "اینچه‌برون" },

  // --- مرزهای پاکستان ---
  { value: "mirjaveh", label: "میرجاوه" },
  { value: "rimdan", label: "ریمدان" },
  { value: "pishin", label: "پیشین" },

  // --- مرزهای افغانستان ---
  { value: "dogharoon", label: "دوغارون" },
  { value: "mahirud", label: "ماهیرود" },
  { value: "milak", label: "میلک" },
];




export const countryOptions = [
  { value: "IR", label: "ایران" },
  { value: "TR", label: "ترکیه" },
  { value: "IQ", label: "عراق" },
  { value: "AM", label: "ارمنستان" },
  { value: "AZ", label: "جمهوری آذربایجان" },
  { value: "GE", label: "گرجستان" },
  { value: "TM", label: "ترکمنستان" },
  { value: "AF", label: "افغانستان" },
  { value: "PK", label: "پاکستان" },
  { value: "AE", label: "امارات متحده عربی" },
  { value: "RU", label: "روسیه" },
  { value: "BG", label: "بلغارستان" },
];


export const VEHICLE_OPTIONS = [
  { label: "چادری", value: "curtain_side" },
  { label: "تانکر", value: "tanker" },
  { label: "یخچالی", value: "refrigerated" },
  { label: "کامیونت", value: "light_truck" },
  { label: "سایر", value: "other" },
] ;

export const STATUS_OPTIONS = [
  { label: "فعال", value: "active" },
  { label: "رزرو شده", value: "reserved" },
  { label: "تکمیل شده", value: "completed" },
  { label: "لغو شده", value: "cancelled" },
  { label: "منقضی شده", value: "expired" },
];

export const CURRENCY_OPTIONS = [
  { value: "IRR", label: "تومان" },
  { value: "USD", label: "دلار" },
];


