import { z } from "zod";

const numberField = (requiredMessage: string, positiveMessage: string) =>
  z.preprocess(
    (value) => {
      if (value === "" || value === null) {
        return undefined;
      }

      return Number(value);
    },

    z
      .number({
        error: requiredMessage,
      })
      .positive(positiveMessage),
  );

export const loadSchema = z
  .object({
    origin: z.string().trim().min(2, "مبدأ باید حداقل ۲ کاراکتر باشد"),
    cargo: z.string().trim().min(2, "نوع بار باید حداقل ۲ کاراکتر باشد"),
    currency: z.enum(["IRR", "USD"]),
    origin_country_code: z.string().min(2, "کشور مبدأ را انتخاب کنید"),
    destination_country_code: z.string().min(2, "کشور مقصد را انتخاب کنید"),
    destination: z.string().trim().min(2, "مقصد باید حداقل ۲ کاراکتر باشد"),
    origin_city_geoname_id: z.number().nullable(),
    destination_city_geoname_id: z.number().nullable(),
    origin_location_url: z
      .string()
      .trim()
      .url("لینک موقعیت مبدأ معتبر نیست")
      .or(z.literal(""))
      .optional(),
    destination_location_url: z
      .string()
      .trim()
      .url("لینک موقعیت مقصد معتبر نیست")
      .or(z.literal(""))
      .optional(),
    origin_latitude: z.number().min(-90).max(90).nullable(),
    origin_longitude: z.number().min(-180).max(180).nullable(),
    destination_latitude: z.number().min(-90).max(90).nullable(),
    destination_longitude: z.number().min(-180).max(180).nullable(),
    cargo_type: z.string().min(1, "نوع بار را انتخاب کنید"),
    trade_type: z.string().min(1, "نوع تجارت را انتخاب کنید"),
    exit_borders: z.array(z.string()).default([]),
    vehicle_type: z.string().min(1, "نوع ناوگان را انتخاب کنید"),
    weight: numberField("وزن الزامی است", "وزن باید بیشتر از صفر باشد"),
    price: numberField("کرایه الزامی است", "کرایه باید بیشتر از صفر باشد"),
    loading_date: z.string().min(1, "تاریخ بارگیری الزامی است"),
    status: z
      .enum(["active", "reserved", "completed", "cancelled", "expired"])
      .default("active"),
    description: z
      .string()
      .trim()
      .max(2000, "توضیحات نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد")
      .optional(),
  })
  .superRefine((data, ctx) => {
    const requiresBorder =
      data.trade_type === "export" || data.trade_type === "import";

    if (requiresBorder && data.exit_borders.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["exit_border"],
        message: "حداقل یک مرز را انتخاب کنید",
      });
    }
  });
export type LoadFormInput = z.input<typeof loadSchema>;

export type LoadFormData = z.output<typeof loadSchema>;