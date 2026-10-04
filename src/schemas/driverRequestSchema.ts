import { z } from "zod";

const nationalCodeSchema = z
  .string()
  .regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد")
  .refine((value) => {
    const digits = value.split("").map(Number);

    if (digits.every((digit) => digit === digits[0])) {
      return false;
    }

    const check = digits[9];

    const sum = digits
      .slice(0, 9)
      .reduce((acc, digit, index) => acc + digit * (10 - index), 0);

    const remainder = sum % 11;
    const result = remainder < 2 ? remainder : 11 - remainder;

    return check === result;
  }, "کد ملی معتبر نیست");

const iranPlateSchema = z
  .string()
  .trim()
  .regex(
    /^\d{2}\s?[آ-ی]\s?\d{3}\s?ایران\s?\d{2}$/,
    "فرمت پلاک ایرانی صحیح نیست",
  );

const foreignPlateSchema = z
  .string()
  .trim()
  .min(4, "پلاک معتبر نیست")
  .max(15, "پلاک معتبر نیست")
  .regex(/^[A-Z0-9\s-]+$/i, "فرمت پلاک صحیح نیست");

const transitCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(
    /^\d{2}[A-Z]{1,3}\d{3}$/,
    "شناسه ترانزیت باید مانند 50A601، 50AB601 یا 50ABC601 باشد",
  );

export const driverRequestSchema = z
  .object({
    tradeType: z.enum(["DOMESTIC", "IMPORT", "EXPORT"]),

    name: z.string().min(3, "نام حداقل ۳ کاراکتر باشد"),

    nationalID: nationalCodeSchema,

    phone: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

    vehicleType: z.string().min(1, "نوع خودرو را انتخاب کنید"),

    identifierType: z.enum(["TRANSIT", "PLATE"]),

    plateCountry: z.enum(["IR", "FOREIGN"]).optional(),

    plateFirst: z.string().optional(),
    plateLetter: z.string().optional(),
    plateNumber: z.string().optional(),
    plateCity: z.string().optional(),

    plate: z.string().optional(),

    transitCode: z.string().optional(),

    note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.identifierType === "PLATE") {
      if (!data.plate) {
        ctx.addIssue({
          code: "custom",
          path: ["plate"],
          message: "پلاک الزامی است",
        });

        return;
      }

      if (data.plateCountry === "IR") {
        const result = iranPlateSchema.safeParse(data.plate);

        if (!result.success) {
          ctx.addIssue({
            code: "custom",
            path: ["plate"],
            message: "فرمت پلاک ایرانی صحیح نیست",
          });
        }
      }

      if (data.plateCountry === "FOREIGN") {
        const result = foreignPlateSchema.safeParse(data.plate);

        if (!result.success) {
          ctx.addIssue({
            code: "custom",
            path: ["plate"],
            message: "فرمت پلاک خارجی صحیح نیست",
          });
        }
      }
    }

    if (data.identifierType === "TRANSIT") {
      if (!data.transitCode) {
        ctx.addIssue({
          code: "custom",
          path: ["transitCode"],
          message: "شناسه ترانزیت الزامی است",
        });

        return;
      }

      const result = transitCodeSchema.safeParse(data.transitCode);

      if (!result.success) {
        ctx.addIssue({
          code: "custom",
          path: ["transitCode"],
          message: "شناسه ترانزیت باید مانند 50AB601 باشد",
        });
      }
    }
  });

export type DriverRequestFormValues = z.infer<typeof driverRequestSchema>;
