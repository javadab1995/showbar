import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import PostForm, {
  type PostFormValues,
} from "../../components/forms/PostForm";

import { uploadPostCover } from "../../services/apiPosts";
import { useCreatePost } from "../../hooks/admin/useCreatePost";
import { optimizeImage } from "../../utils/optimizeImage";
import supabase from "../../services/supabase";

export default function AdminPostForm() {
  const navigate = useNavigate();
  const createPost = useCreatePost();

  const [isProcessingCover, setIsProcessingCover] = useState(false);

  async function handleCreatePost(
    values: PostFormValues,
    coverFile: File | null,
  ) {
    let uploadedPath: string | null = null;

    try {
      let coverUrl = "";

      if (coverFile) {
        setIsProcessingCover(true);

        const optimizedFile = await optimizeImage(coverFile);
        const uploaded = await uploadPostCover(optimizedFile);

        coverUrl = uploaded.url;
        uploadedPath = uploaded.path;
      }

      const input = {
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

      await createPost.mutateAsync(input);

      navigate("/admin/posts", {
        replace: true,
        state: { message: "مطلب با موفقیت ایجاد شد." },
      });
    } catch (error) {
      if (uploadedPath) {
        try {
          const { error: cleanupError } = await supabase.storage
            .from("post-covers")
            .remove([uploadedPath]);

          if (cleanupError) {
            console.error("پاک‌سازی تصویر ناموفق بود:", cleanupError.message);
          }
        } catch (cleanupError) {
          console.error("خطا در پاک‌سازی تصویر:", cleanupError);
        }
      }

      throw error;
    } finally {
      setIsProcessingCover(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-4">
        <Link
          to="/admin/posts"
          className="text-sm text-text-2 hover:text-primary"
        >
          بازگشت به مطالب
        </Link>
      </div>

      <PostForm
        onSubmit={handleCreatePost}
        isPending={createPost.isPending || isProcessingCover}
      />
    </div>
  );
}
