import z from "zod";

export const postSchema = z.object({
  title: z.string().trim().min(3, "عنوان باید حداقل ۳ حرف باشد."),
  slug: z
    .string()
    .trim()
    .min(1, "نشانی مطلب الزامی است.")
    .regex(
      /^[\p{L}\p{N}-]+$/u,
      "نشانی فقط می‌تواند شامل حروف، اعداد و خط تیره باشد.",
    ),
  summary: z.string().max(300, "خلاصه نباید بیشتر از ۳۰۰ حرف باشد."),
  content: z.string().trim().min(10, "محتوای مطلب خیلی کوتاه است."),
  cover_image: z
    .string()
    .refine(
      (value) => !value.trim() || /^https?:\/\/\S+$/i.test(value.trim()),
      "آدرس تصویر باید یک URL معتبر با http یا https باشد.",
    ),
  type: z.enum(["news", "article", "announcement"]),
  category: z.string().max(80, "نام دسته‌بندی بیش از حد طولانی است."),
  tags: z.string().max(300, "مجموع برچسب‌ها بیش از حد طولانی است."),
  status: z.enum(["draft", "published"]),
  seo_title: z.string().max(70, "عنوان سئو حداکثر ۷۰ حرف باشد."),
  seo_description: z.string().max(170, "توضیحات سئو حداکثر ۱۷۰ حرف باشد."),
});