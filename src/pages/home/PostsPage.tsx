import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  Clock3,
  FileText,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

import BackButton from "../../components/buttons/BackButton";
import {
  useFeaturedPost,
  usePublishedPosts,
} from "../../hooks/public/usePublicPosts";
import SEO from "../../components/seo/SEO";

type PostType = "news" | "article" | "announcement";
type CategoryFilter = PostType | "all";

const categories: {
  label: string;
  value: CategoryFilter;
}[] = [
  { label: "همه مطالب", value: "all" },
  { label: "اخبار", value: "news" },
  { label: "مقالات", value: "article" },
  { label: "اطلاعیه‌ها", value: "announcement" },
];

const typeLabels: Record<PostType, string> = {
  news: "خبر",
  article: "مقاله",
  announcement: "اطلاعیه",
};

const typeStyles: Record<PostType, string> = {
  news: "bg-blue-50 text-blue-700",
  article: "bg-primary/10 text-primary",
  announcement: "bg-amber-50 text-amber-800",
};

const PAGE_SIZE = 6;

function getTypeLabel(type: string) {
  return typeLabels[type as PostType] ?? "مطلب";
}

function getTypeStyle(type: string) {
  return typeStyles[type as PostType] ?? "bg-surface-2 text-text-2";
}

function formatPostDate(value: string | null) {
  if (!value) return "تاریخ نامشخص";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "تاریخ نامشخص";
  }

  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
  }).format(date);
}

function getReadingMinutes(content: string | null) {
  const plainText = (content ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim();

  const wordCount = plainText ? plainText.split(/\s+/).length : 0;

  return Math.max(1, Math.ceil(wordCount / 200));
}

function PostImage({
  src,
  alt,
  loading = "lazy",
  className = "",
}: {
  src: string | null;
  alt: string;
  loading?: "lazy" | "eager";
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-surface-2 text-text-2 ${className}`}
        aria-label={alt || "تصویر موجود نیست"}
      >
        <Newspaper size={32} strokeWidth={1.5} />
      </div>
    );
  }

  return <img src={src} alt={alt} loading={loading} className={className} />;
}

export default function PostsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

    const showFeatured = activeCategory === "all" && !search.trim();
   
  const {
    data: featuredPost,
    isLoading: isFeaturedLoading,
    isError: isFeaturedError,
  } = useFeaturedPost();

  const {
    data: postsResult,
    isLoading,
    isError,
    error,
  } = usePublishedPosts({
    page,
    pageSize: PAGE_SIZE,
    query: search,
    type: activeCategory === "all" ? undefined : activeCategory,
    
  });

  const visiblePosts = postsResult?.data ?? [];
  const totalPosts = postsResult?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalPosts / PAGE_SIZE));

  function changeCategory(category: CategoryFilter) {
    setActiveCategory(category);
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  const pageLoading = isLoading || (showFeatured && isFeaturedLoading);

  const pageError = isError || (showFeatured && isFeaturedError);

    return (
      <>  
    <SEO
      title="مطالب، مقالات و اخبار حمل‌ونقل | نمایش بار"
      description="مقالات آموزشی، اخبار و راهنماهای کاربردی حمل‌ونقل جاده‌ای، انتخاب بار و فعالیت در سامانه نمایش بار را بخوانید."
      path="/posts"
    />

    <main dir="rtl" className="min-h-screen">
      {/* معرفی صفحه */}
      <section className="border-b  border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
          <div className="mb-5 mt-5 flex items-center gap-2 text-xs text-text-2">
            <BackButton to="/" title="صفحه اصلی" icon={false} />
            <ChevronLeft size={14} />
            <span className="text-text">مطالب و اخبار</span>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
                <Newspaper size={18} />
                <span>مجله نمایش بار</span>
              </div>

              <h1 className="text-3xl font-extrabold leading-relaxed tracking-tight text-text sm:text-4xl">
                تازه‌های دنیای
                <span className="text-primary"> حمل‌ونقل</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-text-2 sm:text-base">
                اخبار، آموزش‌ها و مطالب کاربردی برای رانندگان و فعالان صنعت
                حمل‌ونقل جاده‌ای.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen size={20} />
              </span>

              <div>
                <p className="text-sm font-bold text-text">محتوای کاربردی</p>
                <p className="mt-1 text-xs text-text-2">
                  برای انتخاب و حمل بهتر بار
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">
        {/* مطلب منتخب */}
        {showFeatured && featuredPost && (
          <section className="mb-12">
            <div className="mb-5 flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <h2 className="text-base font-bold text-text">مطلب منتخب</h2>
            </div>

            <article className="grid overflow-hidden rounded-2xl border border-border bg-surface md:grid-cols-2">
              <div className="relative min-h-64 overflow-hidden bg-surface-2 md:min-h-85">
                <PostImage
                  src={featuredPost.cover_image}
                  alt={featuredPost.title}
                  loading="eager"
                  className="absolute inset-0 size-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-text/45 via-transparent to-transparent" />

                <span className="absolute bottom-5 right-5 rounded-lg bg-surface/95 px-3 py-2 text-xs font-semibold text-primary">
                  پیشنهاد سردبیر
                </span>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-md px-2.5 py-1.5 text-xs font-semibold ${getTypeStyle(featuredPost.type)}`}
                  >
                    {getTypeLabel(featuredPost.type)}
                  </span>

                  {featuredPost.category && (
                    <span className="text-xs text-text-2">
                      {featuredPost.category}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold leading-9 text-text sm:text-2xl">
                  {featuredPost.title}
                </h2>

                {featuredPost.summary && (
                  <p className="mt-4 text-sm leading-8 text-text-2">
                    {featuredPost.summary}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5 text-xs text-text-2">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    {formatPostDate(featuredPost.published_at)}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock3 size={15} />
                    {getReadingMinutes(featuredPost.content)} دقیقه مطالعه
                  </span>
                </div>

                <Link
                  to={`/posts/${featuredPost.slug}`}
                  className="mt-7 flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  ادامه مطلب
                  <ArrowLeft size={17} />
                </Link>
              </div>
            </article>
          </section>
        )}

        {/* فهرست مطالب */}
        <section>
          <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-xl font-bold text-text">آخرین مطالب</h2>
              <p className="mt-2 text-sm text-text-2">
                اخبار و مطالب موردنظرت را پیدا کن.
              </p>
            </div>

            <label className="flex h-11 w-full items-center gap-3 rounded-xl border border-border bg-surface px-3.5 transition focus-within:border-primary lg:max-w-sm">
              <Search size={18} className="shrink-0 text-text-2" />

              <input
                type="search"
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="جست‌وجو در مطالب..."
                className="min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-text-2"
              />

              {search && (
                <button
                  type="button"
                  aria-label="پاک کردن جست‌وجو"
                  onClick={() => handleSearch("")}
                  className="text-text-2 hover:text-text"
                >
                  <X size={16} />
                </button>
              )}
            </label>
          </div>

          {/* فیلتر دسته‌بندی */}
          <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive = activeCategory === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => changeCategory(category.value)}
                  aria-pressed={isActive}
                  className={`
                    shrink-0 rounded-lg border px-4 py-2.5
                    text-sm font-medium transition
                    ${
                      isActive
                        ? "border-primary bg-primary text-surface"
                        : "border-border bg-surface text-text-2 hover:border-primary/40 hover:text-primary"
                    }
                  `}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* وضعیت بارگذاری */}
          {pageLoading ? (
            <div
              className="py-16 text-center text-sm text-text-2"
              role="status"
            >
              در حال دریافت مطالب...
            </div>
          ) : pageError ? (
            <div
              className="rounded-xl border border-danger/30 px-5 py-12 text-center"
              role="alert"
            >
              <p className="text-sm font-semibold text-danger">
                دریافت مطالب ناموفق بود.
              </p>

              {error instanceof Error && (
                <p className="mt-2 wrap-break-word text-xs text-text-2">
                  {error.message}
                </p>
              )}
            </div>
          ) : visiblePosts.length > 0 ? (
            <>
              {/* کارت‌های مطالب */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visiblePosts.map((post) => (
                  <article
                    key={post.id}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-surface transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                  >
                    <Link
                      to={`/posts/${post.slug}`}
                      aria-label={`مطالعه ${post.title}`}
                      className="relative block aspect-16/10 overflow-hidden bg-surface-2"
                    >
                      <PostImage
                        src={post.cover_image}
                        alt={post.title}
                        className="size-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />

                      <span
                        className={`absolute right-3 top-3 rounded-md px-2.5 py-1.5 text-xs font-semibold ${getTypeStyle(post.type)}`}
                      >
                        {getTypeLabel(post.type)}
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col p-5">
                      {post.category && (
                        <div className="mb-3 flex items-center gap-2 text-xs text-text-2">
                          <FileText size={14} />
                          <span>{post.category}</span>
                        </div>
                      )}

                      <h3 className="text-base font-bold leading-7 text-text transition group-hover:text-primary">
                        <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                      </h3>

                      {post.summary && (
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-2">
                          {post.summary}
                        </p>
                      )}

                      <div className="mt-auto pt-5">
                        <div className="mb-4 flex items-center justify-between gap-3 border-t border-border pt-4 text-xs text-text-2">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {formatPostDate(post.published_at)}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <Clock3 size={14} />
                            {getReadingMinutes(post.content)} دقیقه
                          </span>
                        </div>

                        <Link
                          to={`/posts/${post.slug}`}
                          className="flex w-full items-center justify-between rounded-lg border border-border px-3.5 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-primary/5"
                        >
                          ادامه مطلب
                          <ArrowLeft size={17} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* صفحه‌بندی */}
              {totalPages > 1 && (
                <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    aria-label="صفحه قبلی"
                    disabled={page === 1}
                    onClick={() =>
                      setPage((current) => Math.max(1, current - 1))
                    }
                    className="flex size-10 items-center justify-center rounded-lg border border-border text-text-2 transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={18} className="rotate-180" />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      aria-current={page === pageNumber ? "page" : undefined}
                      onClick={() => setPage(pageNumber)}
                      className={`
                        flex size-10 items-center justify-center
                        rounded-lg border text-sm font-semibold
                        transition
                        ${
                          page === pageNumber
                            ? "border-primary bg-primary text-white"
                            : "border-border text-text-2 hover:bg-surface-2"
                        }
                      `}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    type="button"
                    aria-label="صفحه بعدی"
                    disabled={page === totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    className="flex size-10 items-center justify-center rounded-lg border border-border text-text-2 transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>
              )}

              <p className="mt-5 text-center text-xs text-text-2">
                نمایش {visiblePosts.length} مورد از {totalPosts} مطلب در فهرست
              </p>
            </>
          ) : (
            /* حالت بدون نتیجه */
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border px-5 py-16 text-center">
              <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-surface-2 text-text-2">
                <Search size={24} />
              </span>

              <h3 className="text-base font-bold text-text">مطلبی پیدا نشد</h3>

              <p className="mt-2 max-w-sm text-sm leading-7 text-text-2">
                عبارت جست‌وجو یا دسته‌بندی انتخاب‌شده را تغییر بده.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  changeCategory("all");
                }}
                className="mt-5 text-sm font-semibold text-primary hover:underline"
              >
                نمایش همه مطالب
              </button>
            </div>
          )}
        </section>
      </div>

      {/* پابرگ */}
      <footer className="mb-20 mt-10 border-t border-border bg-surface md:mb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-text-2 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>ShowBar | سامانه حمل‌ونقل بار</span>

          <Link
            to="/loads"
            className="flex items-center gap-2 transition hover:text-primary"
          >
            بازگشت به فهرست بارها
            <ArrowLeft size={14} />
          </Link>
        </div>
      </footer>
            </main>
    </>
  );
}
