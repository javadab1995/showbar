import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Newspaper,
  Plus,
  Search,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  ExternalLink,
} from "lucide-react";

import {
  POSTS_PAGE_SIZE,
  type Post,
  type PostStatus,
  type PostType,
} from "../../services/apiPosts";
import { useAdminPosts } from "../../hooks/admin/useAdminPosts";
import PostActions from "../../components/features/posts/PostActions";

const statusOptions: {
  label: string;
  value: PostStatus | "";
}[] = [
  { label: "همه مطالب", value: "" },
  { label: "منتشرشده", value: "published" },
  { label: "پیش‌نویس", value: "draft" },
  { label: "بایگانی‌شده", value: "archived" },
];

const typeOptions: {
  label: string;
  value: PostType | "";
}[] = [
  { label: "همه نوع‌ها", value: "" },
  { label: "مقاله", value: "article" },
  { label: "خبر", value: "news" },
  { label: "اطلاعیه", value: "announcement" },
];

const statusStyles: Record<PostStatus, string> = {
  published: "bg-emerald-500/10 text-emerald-600",
  draft: "bg-amber-500/10 text-amber-600",
  archived: "bg-surface-2 text-muted",
};

const statusLabels: Record<PostStatus, string> = {
  published: "منتشرشده",
  draft: "پیش‌نویس",
  archived: "بایگانی‌شده",
};

const typeLabels: Record<PostType, string> = {
  article: "مقاله",
  news: "خبر",
  announcement: "اطلاعیه",
};

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function PostRow({ post }: { post: Post }) {
  return (
    <article className="flex flex-col gap-4 border-b border-border px-4 py-5 last:border-b-0 sm:flex-row sm:items-center sm:px-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <FileText size={22} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="truncate font-semibold text-text">{post.title}</h3>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[post.status]}`}
          >
            {statusLabels[post.status]}
          </span>
        </div>

        <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-2">
          {post.summary || "برای این مطلب خلاصه‌ای ثبت نشده است."}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span>{typeLabels[post.type]}</span>
          {post.category && (
            <>
              <span aria-hidden="true">•</span>
              <span>{post.category}</span>
            </>
          )}
          <span aria-hidden="true">•</span>
          <span>
            {post.status === "published"
              ? `انتشار: ${formatDate(post.published_at)}`
              : `ایجاد: ${formatDate(post.created_at)}`}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {post.status === "published" && (
          <Link
            to={`/posts/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            title="مشاهده مطلب"
            aria-label={`مشاهده ${post.title}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-2 transition hover:bg-surface-2"
          >
            <ExternalLink size={16} />
          </Link>
        )}

        <PostActions id={post.id} title={post.title} status={post.status} />
      </div>
    </article>
  );
}

export default function AdminPosts() {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<PostStatus | "">("");
  const [type, setType] = useState<PostType | "">("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  // تأخیر کوتاه برای جلوگیری از درخواست در هر ضربه‌ی صفحه‌کلید.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setQuery(searchInput.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  const { data, isPending, isError, error, isFetching } = useAdminPosts({
    page,
    pageSize: POSTS_PAGE_SIZE,
    query,
    status,
    type,
    sort,
  });

  const posts = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PAGE_SIZE));

  function changeStatus(value: PostStatus | "") {
    setStatus(value);
    setPage(1);
  }

  function changeType(value: PostType | "") {
    setType(value);
    setPage(1);
  }

  function changeSort() {
    setSort((current) => (current === "newest" ? "oldest" : "newest"));
    setPage(1);
  }

  return (
    <section dir="rtl" className="space-y-6 text-text">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Newspaper size={23} className="text-primary" />
            <h1 className="text-xl font-bold">مدیریت مطالب</h1>
          </div>
          <p className="mt-2 text-sm text-text-2">
            مدیریت اخبار، مقاله‌ها و اطلاعیه‌های شوبار
          </p>
        </div>

        <Link
          to="/admin/posts/new"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          مطلب جدید
        </Link>
      </header>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex flex-col gap-4 border-b border-border p-4">
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const active = status === option.value;

              return (
                <button
                  key={option.value || "all"}
                  type="button"
                  onClick={() => changeStatus(option.value)}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-text-2 hover:bg-surface-2"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="جست‌وجوی عنوان یا نشانی مطلب..."
                className="h-11 w-full rounded-lg border border-border bg-surface px-10 text-sm text-text outline-none transition placeholder:text-muted focus:border-primary"
              />
            </label>

            <select
              value={type}
              onChange={(event) =>
                changeType(event.target.value as PostType | "")
              }
              aria-label="فیلتر نوع مطلب"
              className="h-11 rounded-lg border border-border bg-surface px-3 text-sm text-text outline-none focus:border-primary"
            >
              {typeOptions.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={changeSort}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-3 text-sm text-text-2 transition hover:bg-surface-2"
            >
              <ArrowUpDown size={16} />
              {sort === "newest" ? "جدیدترین" : "قدیمی‌ترین"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-text-2 sm:px-5">
          <span>{total.toLocaleString("fa-IR")} مطلب</span>
          {isFetching && !isPending && (
            <span className="text-xs text-muted">در حال به‌روزرسانی...</span>
          )}
        </div>

        {isPending ? (
          <div className="space-y-4 p-5" aria-label="در حال بارگذاری مطالب">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex animate-pulse gap-4 py-3">
                <div className="h-12 w-12 rounded-xl bg-surface-2" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/3 rounded bg-surface-2" />
                  <div className="h-3 w-2/3 rounded bg-surface-2" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="px-5 py-12 text-center">
            <p className="font-medium text-danger">دریافت مطالب ناموفق بود.</p>
            <p className="mt-2 text-sm text-text-2">
              {error instanceof Error
                ? error.message
                : "خطای نامشخصی رخ داده است."}
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-muted">
              <FileText size={25} />
            </div>
            <h2 className="mt-4 font-semibold">مطلبی پیدا نشد</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-text-2">
              با این فیلترها مطلبی وجود ندارد. فیلترها را تغییر بده یا مطلب
              تازه‌ای ایجاد کن.
            </p>
            <Link
              to="/admin/posts/new"
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              ایجاد مطلب جدید
            </Link>
          </div>
        ) : (
          <div>
            {posts.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </div>
        )}

        {!isPending && !isError && total > 0 && (
          <footer className="flex flex-col gap-3 border-t border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-text-2">
              نمایش {fromFa(page, POSTS_PAGE_SIZE, total)} از{" "}
              {total.toLocaleString("fa-IR")} مطلب
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} />
                قبلی
              </button>

              <span className="px-2 text-sm text-text-2">
                صفحه {page.toLocaleString("fa-IR")} از{" "}
                {totalPages.toLocaleString("fa-IR")}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                بعدی
                <ChevronLeft size={16} />
              </button>
            </div>
          </footer>
        )}
      </div>
    </section>
  );
}

function fromFa(page: number, pageSize: number, total: number) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return `${start.toLocaleString("fa-IR")} تا ${end.toLocaleString("fa-IR")}`;
}
