import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FileText, Save } from "lucide-react";

import { postSchema } from "../../schemas/postSchema";
import { createSlug } from "../../utils/createSlug";
import { FormInput } from "../inputs/FormInput";
import { TextAreaField } from "../textarea/TextAreaField";
import { SelectField } from "../selects/SelectField";
import PostCoverField from "../upload/PostCoverField";

export type PostFormValues = z.infer<typeof postSchema>;

export const defaultPostValues: PostFormValues = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  cover_image: "",
  type: "article",
  category: "",
  tags: "",
  status: "draft",
  seo_title: "",
  seo_description: "",
};

type PostFormProps = {
  onSubmit: (
    values: PostFormValues,
    coverFile: File | null,
    removeCurrentCover: boolean,
  ) => Promise<void>;
  isPending: boolean;
  initialValues?: PostFormValues;
  currentImageUrl?: string | null;
  mode?: "create" | "edit";
};

const inputClass =
  "mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary";

export default function PostForm({
  onSubmit,
  isPending,
  initialValues = defaultPostValues,
  currentImageUrl = null,
  mode = "create",
}: PostFormProps) {
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [showSeo, setShowSeo] = useState(false);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [removeCurrentCover, setRemoveCurrentCover] = useState(false);
  const [coverError, setCoverError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: initialValues,
  });

  const title = watch("title");
  const status = watch("status");
  const summary = watch("summary");

  function handleTitleChange(value: string) {
    setValue("title", value, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (!slugEdited) {
      setValue("slug", createSlug(value), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }

  async function handleFormSubmit(values: PostFormValues) {
    setSubmitError("");

    try {
      await onSubmit(values, coverFile, removeCurrentCover);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "ذخیره مطلب ناموفق بود.",
      );
    }
  }

  return (
    <section dir="rtl" className="mx-auto max-w-6xl space-y-6 text-text">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold">
            <FileText size={22} className="text-primary" />
            {mode === "edit" ? "ویرایش مطلب" : "ایجاد مطلب جدید"}
          </h1>

          <p className="mt-2 text-sm text-text-2">
            {mode === "edit"
              ? "اطلاعات مطلب را ویرایش و تغییرات را ذخیره کن."
              : "خبر، مقاله یا اطلاعیه‌ی جدید شوبار را ثبت کن."}
          </p>
        </div>

        <span className="w-fit rounded-full bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-600">
          {status === "published" ? "منتشرشده / آماده انتشار" : "پیش‌نویس"}
        </span>
      </header>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <section className="space-y-5 rounded-xl border border-border bg-surface p-4 sm:p-6">
              <div>
                <FormInput
                  label="عنوان مطلب *"
                  id="title"
                  {...register("title")}
                  onChange={(event) => handleTitleChange(event.target.value)}
                  placeholder="عنوان مطلب را وارد کن"
                  error={errors.title?.message}
                />
              </div>

              <div>
                <FormInput
                  label="نشانی مطلب (Slug) *"
                  id="slug"
                  dir="ltr"
                  {...register("slug", {
                    onChange: () => setSlugEdited(true),
                  })}
                  placeholder="example-article"
                  error={errors.slug?.message}
                />

                <p className="mt-2 text-xs leading-5 text-muted">
                  این نشانی در URL مطلب استفاده می‌شود. پس از انتشار، تغییر آن
                  می‌تواند لینک‌های قبلی را خراب کند.
                </p>
              </div>

              <div>
                <TextAreaField
                  label="خلاصه مطلب"
                  id="summary"
                  rows={3}
                  {...register("summary")}
                  placeholder="خلاصه‌ای کوتاه برای نمایش در فهرست مطالب..."
                  error={errors.summary?.message}
                />

                <p className="mt-2 text-left text-xs text-muted" dir="ltr">
                  {(summary || "").length}/300
                </p>
              </div>

              <div>
                <TextAreaField
                  label="محتوای مطلب *"
                  id="content"
                  rows={16}
                  {...register("content")}
                  placeholder="متن کامل مطلب را وارد کن..."
                  className={`${inputClass} min-h-80 resize-y leading-8`}
                  error={errors.content?.message}
                />

                <p className="mt-2 text-xs leading-5 text-muted">
                  این نسخه محتوای متنی ساده ذخیره می‌کند؛ ویرایشگر غنی برای
                  تیترها، تصاویر داخل متن و قالب‌بندی را بعداً می‌توان اضافه
                  کرد.
                </p>
              </div>
            </section>

            <section className="space-y-5 rounded-xl border border-border bg-surface p-4 sm:p-6">
              <div>
                <h2 className="font-semibold">اطلاعات تکمیلی</h2>
                <p className="mt-1 text-sm text-text-2">
                  نوع مطلب، دسته‌بندی و برچسب‌ها
                </p>
              </div>

              <div>
                <SelectField
                  id="type"
                  {...register("type")}
                  label="نوع مطلب"
                  options={[
                    { label: "مقاله", value: "article" },
                    { label: "خبر", value: "news" },
                    { label: "اطلاعیه", value: "announcement" },
                  ]}
                  error={errors.type?.message}
                />
              </div>

              <div>
                <FormInput
                  label="دسته‌بندی"
                  {...register("category")}
                  placeholder="مثلاً حمل‌ونقل، تجارت، راهنمای رانندگان"
                  error={errors.category?.message}
                />
              </div>

              <div>
                <FormInput
                  label="برچسب‌ها"
                  {...register("tags")}
                  placeholder="حمل‌ونقل, باربری, رانندگان"
                  error={errors.tags?.message}
                />

                <p className="mt-2 text-xs text-muted">
                  برچسب‌ها را با ویرگول انگلیسی یا فارسی جدا کن.
                </p>
              </div>
            </section>

            <section className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-6">
              <button
                type="button"
                onClick={() => setShowSeo((value) => !value)}
                className="flex w-full items-center justify-between text-right"
                aria-expanded={showSeo}
              >
                <div>
                  <h2 className="font-semibold">تنظیمات سئو</h2>
                  <p className="mt-1 text-sm text-text-2">
                    عنوان و توضیحات مخصوص موتورهای جست‌وجو
                  </p>
                </div>

                <span className="text-sm text-primary">
                  {showSeo ? "بستن" : "نمایش"}
                </span>
              </button>

              {showSeo && (
                <div className="space-y-5 border-t border-border pt-4">
                  <div>
                    <FormInput
                      label="عنوان سئو"
                      {...register("seo_title")}
                      placeholder={title || "عنوان مناسب برای موتور جست‌وجو"}
                      error={errors.seo_title?.message}
                    />
                  </div>

                  <div>
                    <TextAreaField
                      label="توضیحات سئو"
                      id="seo_description"
                      rows={3}
                      {...register("seo_description")}
                      placeholder="توضیح کوتاهی که ممکن است در نتایج جست‌وجو نمایش داده شود..."
                      error={errors.seo_description?.message}
                    />
                  </div>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <section className="space-y-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
              <h2 className="font-semibold">انتشار</h2>

              <div>
                <label
                  className="block text-sm font-medium text-text"
                  htmlFor="status"
                >
                  وضعیت مطلب
                </label>

                <select
                  id="status"
                  {...register("status")}
                  className={inputClass}
                >
                  <option value="draft">ذخیره به‌صورت پیش‌نویس</option>
                  <option value="published">انتشار مطلب</option>
                </select>

                <p className="mt-2 text-xs leading-5 text-text-2">
                  {status === "published"
                    ? "مطلب پس از ذخیره منتشر خواهد بود."
                    : "مطلب ذخیره می‌شود، اما برای عموم قابل مشاهده نیست."}
                </p>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={17} />

                {isPending
                  ? "در حال ذخیره..."
                  : mode === "edit"
                    ? "ذخیره تغییرات"
                    : status === "published"
                      ? "ذخیره و انتشار"
                      : "ذخیره پیش‌نویس"}
              </button>

              {submitError && (
                <p role="alert" className="text-sm leading-6 text-danger">
                  {submitError}
                </p>
              )}
            </section>

            <PostCoverField
              currentImageUrl={currentImageUrl}
              file={coverFile}
              onFileChange={setCoverFile}
              removeCurrent={removeCurrentCover}
              onRemoveCurrentChange={setRemoveCurrentCover}
              error={coverError}
              onError={setCoverError}
              disabled={isPending}
            />
          </aside>
        </div>
      </form>
    </section>
  );
}
