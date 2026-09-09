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

export const loadSchema = z.object({
  origin: z.string().trim().min(2, "مبدأ باید حداقل ۲ کاراکتر باشد"),
  cargo: z.string().trim().min(2, "نوع بار باید حداقل ۲ کاراکتر باشد"),
  currency: z.enum(["IRR", "USD"]),

  destination: z.string().trim().min(2, "مقصد باید حداقل ۲ کاراکتر باشد"),

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
  trade_type: z.string().min(1, "نوع بار را انتخاب کنید"),
  exit_border: z.string().min(1, "نوع بار را انتخاب کنید"),

  vehicle_type: z.string().min(1, "نوع خودرو را انتخاب کنید"),

  weight: numberField("وزن الزامی است", "وزن باید بیشتر از صفر باشد"),

  price: numberField("کرایه الزامی است", "کرایه باید بیشتر از صفر باشد"),

  loading_date: z.string().min(1, "تاریخ بارگیری الزامی است"),

  status: z.enum(["active", "reserved", "completed", "cancelled"]),

  description: z
    .string()
    .trim()
    .max(2000, "توضیحات نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد")
    .optional(),
});

export type LoadFormInput = z.input<typeof loadSchema>;

export type LoadFormData = z.output<typeof loadSchema>;