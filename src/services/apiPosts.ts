import supabase from "./supabase";

export const POSTS_PAGE_SIZE = 10;

export type PostStatus = "draft" | "published" | "archived";

export type PostType = "news" | "article" | "announcement";

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  type: PostType;
  category: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface GetPostsParams {
  page: number;
  pageSize: number;
  query: string;
  status: PostStatus | "";
  type: PostType | "";
  sort: "newest" | "oldest";
}

export interface AdminPostDetail extends Post {
  content: string;
  cover_image: string | null;
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  author_id: string | null;
}

const POST_DETAIL_COLUMNS = `
  id,
  title,
  slug,
  summary,
  content,
  cover_image,
  type,
  category,
  tags,
  status,
  published_at,
  seo_title,
  seo_description,
  author_id,
  created_at,
  updated_at
`;

export async function getAdminPost(id: string): Promise<AdminPostDetail> {
  const { data, error } = await supabase
    .from("posts")
    .select(POST_DETAIL_COLUMNS)
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      throw new Error("مطلب موردنظر پیدا نشد.");
    }

    throw new Error(error.message);
  }

  return data as AdminPostDetail;
}

export async function getAdminPosts({
  page,
  pageSize,
  query,
  status,
  type,
  sort,
}: GetPostsParams) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let request = supabase
    .from("posts")
    .select(
      "id, title, slug, summary, type, category, status, published_at, created_at, updated_at",
      { count: "exact" },
    );

  if (query.trim()) {
    const search = query.trim().replace(/[,%()]/g, " ");

    request = request.or(`title.ilike.%${search}%,slug.ilike.%${search}%`);
  }

  if (status) {
    request = request.eq("status", status);
  }

  if (type) {
    request = request.eq("type", type);
  }

  const { data, error, count } = await request
    .order("created_at", { ascending: sort === "oldest" })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data ?? []) as Post[],
    total: count ?? 0,
  };
}

export interface CreatePostInput {
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string;
  type: PostType;
  category: string;
  tags: string[];
  status: "draft" | "published";
  seo_title: string;
  seo_description: string;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("برای ایجاد مطلب باید وارد حساب کاربری شده باشی.");
  }

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title.trim(),
      slug: input.slug.trim(),
      summary: input.summary.trim() || null,
      content: input.content.trim(),
      cover_image: input.cover_image.trim() || null,
      type: input.type,
      category: input.category.trim() || null,
      tags: input.tags,
      status: input.status,
      published_at: input.status === "published" ? now : null,
      seo_title: input.seo_title.trim() || null,
      seo_description: input.seo_description.trim() || null,
      author_id: user.id,
    })
    .select(
      "id, title, slug, summary, type, category, status, published_at, created_at, updated_at",
    )
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        "این نشانی قبلاً استفاده شده است. یک slug دیگر انتخاب کن.",
      );
    }

    throw new Error(error.message);
  }

  return data as Post;
}

export interface UploadedPostCover {
  url: string;
  path: string;
}

export interface UploadedPostCover {
  url: string;
  path: string;
}

export async function uploadPostCover(file: File): Promise<UploadedPostCover> {
  if (file.type !== "image/webp") {
    throw new Error("تصویر باید پیش از آپلود به WebP تبدیل شود.");
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error("حجم تصویر بهینه‌شده نباید بیشتر از ۵ مگابایت باشد.");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("برای آپلود تصویر باید وارد حساب کاربری شده باشی.");
  }

  const path = `${user.id}/${crypto.randomUUID()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from("post-covers")
    .upload(path, file, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`آپلود تصویر ناموفق بود: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from("post-covers").getPublicUrl(path);

  return {
    url: data.publicUrl,
    path,
  };
}

export async function updatePost(
  id: string,
  input: CreatePostInput,
): Promise<Post> {
  const { data: existing, error: existingError } = await supabase
    .from("posts")
    .select("published_at")
    .eq("id", id)
    .single();

  if (existingError) {
    throw new Error(
      existingError.code === "PGRST116"
        ? "مطلب موردنظر پیدا نشد."
        : existingError.message,
    );
  }

  const now = new Date().toISOString();

  const publishedAt =
    input.status === "published" ? (existing.published_at ?? now) : null;

  const { data, error } = await supabase
    .from("posts")
    .update({
      title: input.title.trim(),
      slug: input.slug.trim(),
      summary: input.summary.trim() || null,
      content: input.content.trim(),
      cover_image: input.cover_image.trim() || null,
      type: input.type,
      category: input.category.trim() || null,
      tags: input.tags,
      status: input.status,
      published_at: publishedAt,
      seo_title: input.seo_title.trim() || null,
      seo_description: input.seo_description.trim() || null,
    })
    .eq("id", id)
    .select(
      `
      id,
      title,
      slug,
      summary,
      type,
      category,
      status,
      published_at,
      created_at,
      updated_at
    `,
    )
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        "این نشانی قبلاً استفاده شده است. یک slug دیگر انتخاب کن.",
      );
    }

    throw new Error(error.message);
  }

  return data as Post;
}

export async function deletePostCoverByUrl(url: string): Promise<void> {
  const marker = "/storage/v1/object/public/post-covers/";
  const pathname = new URL(url).pathname;
  const markerIndex = pathname.indexOf(marker);

  // اگر URL متعلق به باکت موردنظر نیست، چیزی را حذف نکن.
  if (markerIndex === -1) return;

  const path = decodeURIComponent(pathname.slice(markerIndex + marker.length));

  if (!path) return;

  const { error } = await supabase.storage.from("post-covers").remove([path]);

  if (error) {
    throw new Error(`حذف تصویر قبلی ناموفق بود: ${error.message}`);
  }
}

export async function archivePost(id: string) {
  const { data, error } = await supabase
    .from("posts")
    .update({ status: "archived" })
    .eq("id", id)
    .select("id, status")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deletePost(id: string) {
  // ابتدا تصویر را پیدا می‌کنیم تا پس از حذف رکورد،
  // بتوانیم فایل ذخیره‌شده را هم پاک کنیم.
  const { data: post, error: findError } = await supabase
    .from("posts")
    .select("id, cover_image")
    .eq("id", id)
    .single();

  if (findError) {
    throw new Error(findError.message);
  }

  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  // حذف فایل کاور بعد از حذف موفق رکورد.
  // خطای Storage نباید باعث شود تصور کنیم خود مطلب حذف نشده است.
  if (post.cover_image) {
    const coverPath = getPostCoverPath(post.cover_image);

    if (coverPath) {
      const { error: storageError } = await supabase.storage
        .from("post-covers")
        .remove([coverPath]);

      if (storageError) {
        console.error(
          "مطلب حذف شد، اما حذف تصویر کاور ناموفق بود:",
          storageError.message,
        );
      }
    }
  }

  return { id: post.id };
}

function getPostCoverPath(url: string): string | null {
  const marker = "/storage/v1/object/public/post-covers/";
  const index = url.indexOf(marker);

  if (index === -1) {
    return null;
  }

  const encodedPath = url.slice(index + marker.length);

  try {
    return decodeURIComponent(encodedPath);
  } catch {
    return null;
  }
}



export type PublicPost = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  cover_image: string | null;
  type: "news" | "article" | "announcement" | string;
  category: string | null;
  published_at: string | null;
  updated_at: string | null;
};

export type GetPublishedPostsParams = {
  page: number;
  pageSize: number;
  query?: string;
  type?: string;
  excludeId?: string;
};

const PUBLIC_POST_COLUMNS =
  "id, title, slug, summary, content, cover_image, type, category, published_at, updated_at";

export async function getPublishedPosts({
  page,
  pageSize,
  query = "",
  type,
  excludeId,
}: GetPublishedPostsParams) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let request = supabase
    .from("posts")
    .select(PUBLIC_POST_COLUMNS, { count: "exact" })
    .eq("status", "published")
    .lte("published_at", new Date().toISOString());

  if (query.trim()) {
    const search = query.trim().replace(/[,%()]/g, " ");

    request = request.or(`title.ilike.%${search}%,slug.ilike.%${search}%`);
  }

  if (type) {
    request = request.eq("type", type);
  }

  if (excludeId) {
    request = request.neq("id", excludeId);
  }

  const { data, error, count } = await request
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    data: (data ?? []) as PublicPost[],
    total: count ?? 0,
  };
}

export async function getFeaturedPost(): Promise<PublicPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(PUBLIC_POST_COLUMNS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as PublicPost | null;
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<PublicPost | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(PUBLIC_POST_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as PublicPost | null;
}

export async function getRelatedPosts(
  category: string | null,
  excludeId: string,
): Promise<PublicPost[]> {
  let request = supabase
    .from("posts")
    .select(PUBLIC_POST_COLUMNS)
    .eq("status", "published")
    .lte("published_at", new Date().toISOString())
    .neq("id", excludeId);

  if (category) {
    request = request.eq("category", category);
  }

  const { data, error } = await request
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as PublicPost[];
}
