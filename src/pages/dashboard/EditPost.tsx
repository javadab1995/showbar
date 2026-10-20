import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdminPost } from "../../hooks/admin/useAdminPost";
import { useUpdatePost } from "../../hooks/admin/useUpdatePost";
import PostForm, {
  type PostFormValues,
} from "../../components/forms/PostForm";
import {
  deletePostCoverByUrl,
  uploadPostCover,
  type CreatePostInput,
} from "../../services/apiPosts";
import { optimizeImage } from "../../utils/optimizeImage";
import supabase from "../../services/supabase";

export default function EditPost() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const postQuery = useAdminPost(id);
  const updateMutation = useUpdatePost();

  const post = postQuery.data;

  useEffect(() => {
    if (post?.status === "archived") {
      // فرم فعلی از وضعیت archived پشتیبانی نمی‌کند.
      // از تغییر ناخواسته آن به draft جلوگیری می‌کنیم.
    }
  }, [post?.status]);

  async function handleUpdate(
    values: PostFormValues,
    coverFile: File | null,
    removeCurrentCover: boolean,
  ) {
    if (!post) {
      throw new Error("اطلاعات مطلب هنوز بارگذاری نشده است.");
    }

    if (post.status === "archived") {
      throw new Error(
        "ویرایش مطالب آرشیوشده با وضعیت فعلی فرم پشتیبانی نمی‌شود.",
      );
    }

    let uploadedPath: string | null = null;
    let updateSucceeded = false;

    const oldCoverUrl = post.cover_image;
    let coverUrl = removeCurrentCover ? "" : (post.cover_image ?? "");

    try {
      if (coverFile) {
        const optimizedFile = await optimizeImage(coverFile);
        const uploaded = await uploadPostCover(optimizedFile);

        uploadedPath = uploaded.path;
        coverUrl = uploaded.url;
      }

      const input: CreatePostInput = {
        title: values.title.trim(),
        slug: values.slug.trim(),
        summary: values.summary.trim(),
        content: values.content.trim(),
        cover_image: coverUrl,
        type: values.type,
        category: values.category.trim(),
        tags: [
          ...new Set(
            values.tags
              .split(/[,،]/)
              .map((tag) => tag.trim())
              .filter(Boolean),
          ),
        ],
        status: values.status,
        seo_title: values.seo_title.trim(),
        seo_description: values.seo_description.trim(),
      };

      await updateMutation.mutateAsync({
        id: post.id,
        input,
      });

      updateSucceeded = true;

      // فقط در صورت تغییر یا حذف تصویر، فایل قبلی را پاک می‌کنیم.
      if (
        oldCoverUrl &&
        (coverFile || removeCurrentCover) &&
        oldCoverUrl !== coverUrl
      ) {
        try {
          await deletePostCoverByUrl(oldCoverUrl);
        } catch (error) {
          // ذخیره مطلب موفق شده است؛ خطای پاک‌سازی نباید
          // به اشتباه به‌عنوان شکست ویرایش گزارش شود.
          console.error("Could not delete old post cover:", error);
        }
      }

      navigate("/admin/posts", {
        replace: true,
        state: { message: "تغییرات مطلب با موفقیت ذخیره شد." },
      });
    } catch (error) {
      // اگر ویرایش شکست خورد، تصویر جدید آپلودشده را پاک می‌کنیم.
      // تصویر قبلی تا زمانی که ذخیره موفق نشده دست‌نخورده می‌ماند.
      if (uploadedPath && !updateSucceeded) {
        const { error: cleanupError } = await supabase.storage
          .from("post-covers")
          .remove([uploadedPath]);

        if (cleanupError) {
          console.error(
            "Could not clean up uploaded post cover:",
            cleanupError,
          );
        }
      }

      throw error;
    }
  }

  if (postQuery.isPending) {
    return (
      <div dir="rtl" className="p-6 text-text-2">
        در حال دریافت اطلاعات مطلب...
      </div>
    );
  }

  if (postQuery.isError || !post) {
    return (
      <div dir="rtl" className="space-y-4 p-6">
        <p role="alert" className="text-danger">
          {postQuery.error instanceof Error
            ? postQuery.error.message
            : "دریافت اطلاعات مطلب ناموفق بود."}
        </p>

        <Link
          to="/admin/posts"
          className="text-sm text-primary hover:underline"
        >
          بازگشت به فهرست مطالب
        </Link>
      </div>
    );
  }

  if (post.status === "archived") {
    return (
      <div dir="rtl" className="space-y-4 p-6">
        <p className="text-text">
          این مطلب آرشیو شده است و فرم فعلی امکان ویرایش وضعیت آن را ندارد.
        </p>

        <Link
          to="/admin/posts"
          className="text-sm text-primary hover:underline"
        >
          بازگشت به فهرست مطالب
        </Link>
      </div>
    );
  }

  const initialValues: PostFormValues = {
    title: post.title,
    slug: post.slug,
    summary: post.summary ?? "",
    content: post.content,
    cover_image: post.cover_image ?? "",
    type: post.type,
    category: post.category ?? "",
    tags: (post.tags ?? []).join(", "),
    status: post.status,
    seo_title: post.seo_title ?? "",
    seo_description: post.seo_description ?? "",
  };

  return (
    <PostForm
      key={post.id}
      mode="edit"
      initialValues={initialValues}
      currentImageUrl={post.cover_image}
      onSubmit={handleUpdate}
      isPending={updateMutation.isPending}
    />
  );
}
