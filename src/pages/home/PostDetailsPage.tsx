import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  List,
  Newspaper,
  Share2,
  Truck,
} from "lucide-react";

import {
  usePublishedPost,
  useRelatedPosts,
} from "../../hooks/public/usePublicPosts";
import { toPersianDigits } from "../../helpers/number";
import SEO from "../../components/seo/SEO";

type PostSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

type ContentBlock = {
  title?: string;
  paragraphs: string[];
};

function formatPostDate(value?: string | null) {
  if (!value) return "تاریخ نامشخص";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "تاریخ نامشخص";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getReadingMinutes(content?: string | null) {
  if (!content?.trim()) return 1;

  const wordCount = content.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(wordCount / 200));
}

function createSectionId(title: string, index: number) {
  const normalized = title
    .trim()
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return normalized ? `section-${normalized}-${index}` : `section-${index}`;
}

/**
 * پشتیبانی از متن ساده و تیترهای Markdown مانند:
 *
 * ## عنوان بخش
 * متن بخش
 *
 * ### عنوان بخش فرعی
 * متن بخش فرعی
 */
function parsePostContent(content?: string | null): PostSection[] {
  if (!content?.trim()) return [];

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ContentBlock[] = [];
  let currentBlock: ContentBlock = { paragraphs: [] };
  let currentParagraph: string[] = [];

  function flushParagraph() {
    const paragraph = currentParagraph.join("\n").trim();

    if (paragraph) {
      currentBlock.paragraphs.push(paragraph);
    }

    currentParagraph = [];
  }

  function flushBlock() {
    flushParagraph();

    if (currentBlock.title || currentBlock.paragraphs.length) {
      blocks.push(currentBlock);
    }
  }

  for (const line of lines) {
    const heading = line.match(/^#{2,3}\s+(.+?)\s*#*\s*$/);

    if (heading) {
      flushBlock();

      currentBlock = {
        title: heading[1].trim(),
        paragraphs: [],
      };

      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      continue;
    }

    currentParagraph.push(line.trim());
  }

  flushBlock();

  return blocks.map((block, index) => ({
    id: createSectionId(block.title ?? "content", index + 1),
    title: block.title ?? "",
    paragraphs: block.paragraphs,
  }));
}

function getPostTypeLabel(type?: string | null) {
  const labels: Record<string, string> = {
    article: "مقاله",
    news: "خبر",
    post: "مطلب",
    guide: "راهنما",
  };

  return type ? (labels[type.toLowerCase()] ?? "مطلب") : "مطلب";
}

export default function PostDetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  const [showContents, setShowContents] = useState(true);
  const [copied, setCopied] = useState(false);

  const { data: post, isLoading, isError } = usePublishedPost(slug);

  const { data: relatedPosts, isLoading: isRelatedLoading } = useRelatedPosts(
    post?.category ?? null,
    post?.id,
  );

  const sections = useMemo(
    () => parsePostContent(post?.content),
    [post?.content],
  );

  const readingMinutes = useMemo(
    () => getReadingMinutes(post?.content),
    [post?.content],
  );

  const hasTableOfContents = sections.some((section) => section.title);

  async function handleShare() {
    if (!post) return;

    const shareData = {
      title: post.title,
      text: post.summary ?? post.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ممکن است کاربر پنجره اشتراک‌گذاری را ببندد.
    }
  }

  if (isLoading) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-surface"
      >
        <p className="text-sm text-text-2" role="status">
          در حال دریافت مطلب...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-surface px-5"
      >
        <div className="text-center">
          <Newspaper size={32} className="mx-auto text-text-2" />

          <h1 className="mt-4 text-lg font-bold text-text">
            دریافت مطلب ناموفق بود
          </h1>

          <p className="mt-2 text-sm leading-7 text-text-2">
            هنگام دریافت اطلاعات مشکلی پیش آمد. لطفاً دوباره تلاش کنید.
          </p>

          <Link
            to="/posts"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowRight size={16} />
            بازگشت به مطالب
          </Link>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen flex-col items-center justify-center bg-surface px-5 text-center"
      >
        <Newspaper size={32} className="text-text-2" />

        <h1 className="mt-5 text-xl font-bold text-text">
          مطلب موردنظر پیدا نشد
        </h1>

        <p className="mt-2 max-w-md text-sm leading-7 text-text-2">
          این مطلب وجود ندارد، منتشر نشده یا هنوز زمان انتشار آن نرسیده است.
        </p>

        <Link
          to="/posts"
          className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-surface transition hover:bg-primary/90"
        >
          بازگشت به مطالب
        </Link>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} | نمایش بار`}
        description={
          post.summary?.trim() ||
          `مطلب ${post.title} در مجله نمایش بار؛ مطالب و راهنماهای کاربردی حوزه حمل‌ونقل بار.`
        }
        path={`/posts/${post.slug}`}
      />

      <main dir="rtl" className="min-h-screen ">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-7 ">
          <nav
            aria-label="مسیر صفحه"
            className="flex flex-wrap items-center gap-2 text-xs text-text-2 mt-16"
          >
            <Link to="/" className="hover:text-primary">
              صفحه اصلی
            </Link>
            <ArrowLeft size={13} />
            <Link to="/posts" className="hover:text-primary">
              مطالب و اخبار
            </Link>
            <ArrowLeft size={13} />
            <span className="max-w-64 truncate text-text">{post.title}</span>
          </nav>
        </div>

        {/* Article header */}
        <section className="mx-auto max-w-7xl px-6 pb-8 pt-8 lg:pt-12">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {post.category && (
              <span className="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                {post.category}
              </span>
            )}

            <span className="text-xs text-text-2">
              {getPostTypeLabel(post.type)}
            </span>
          </div>

          <h1 className="text-2xl font-extrabold leading-[1.8] tracking-tight text-text sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          {post.summary && (
            <p className="mt-5 text-base leading-8 text-text-2 sm:text-lg sm:leading-9">
              {post.summary}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Newspaper size={17} />
                </span>

                <span className="text-xs font-medium text-text">
                  تحریریه نمایش بار
                </span>
              </div>

              <span className="hidden h-8 w-px bg-border sm:block" />

              <div className="flex items-center gap-2 text-xs text-text-2">
                <CalendarDays size={16} />
                <span>{formatPostDate(post.published_at)}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-text-2">
                <Clock3 size={16} />
                <span>
                  {toPersianDigits(String(readingMinutes))} دقیقه مطالعه
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-2 rounded-lg border border-border px-3.5 py-2.5 text-sm font-medium text-text-2 transition hover:bg-surface-2 hover:text-primary"
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              {copied ? "لینک کپی شد" : "اشتراک‌گذاری"}
            </button>
          </div>
        </section>

        {/* Cover */}
        {post.cover_image && (
          <section className="mx-auto max-w-7xl px-6">
            <figure className="overflow-hidden rounded-2xl border border-border bg-surface-2">
              <img
                src={post.cover_image}
                alt={post.title}
                className="aspect-video w-full object-cover"
              />
            </figure>
          </section>
        )}

        {/* Article body and sidebar */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14 lg:px-8 lg:py-14">
          <article className="min-w-0">
            {post.summary && (
              <div className="mb-8 rounded-xl border border-border bg-surface-2/50 p-5 sm:p-6">
                <p className="text-sm font-bold text-text">خلاصه مطلب</p>
                <p className="mt-2 text-sm leading-8 text-text-2">
                  {post.summary}
                </p>
              </div>
            )}

            {sections.length > 0 ? (
              <div className="space-y-10">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-8"
                  >
                    {section.title && (
                      <h2 className="flex items-start gap-3 text-xl font-bold leading-8 text-text sm:text-2xl">
                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                          {toPersianDigits(String(index + 1))}
                        </span>
                        {section.title}
                      </h2>
                    )}

                    <div
                      className={section.title ? "mt-4 space-y-4" : "space-y-4"}
                    >
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={`${section.id}-${paragraphIndex}`}
                          className="whitespace-pre-line text-sm leading-9 text-text-2 sm:text-base sm:leading-10"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <p className="text-sm leading-9 text-text-2">
                محتوایی برای این مطلب ثبت نشده است.
              </p>
            )}

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div>
                <p className="text-sm font-bold text-text">
                  مطالب بیشتری بخوانید
                </p>
                <p className="mt-1 text-xs text-text-2">
                  تازه‌ترین مطالب و اخبار حوزه حمل‌ونقل را دنبال کنید.
                </p>
              </div>

              <Link
                to="/posts"
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/5"
              >
                همه مطالب
                <ArrowLeft size={16} />
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {hasTableOfContents && (
              <section className="rounded-xl border border-border bg-surface p-5">
                <button
                  type="button"
                  onClick={() => setShowContents((current) => !current)}
                  aria-expanded={showContents}
                  className="flex w-full items-center justify-between gap-3 text-right"
                >
                  <span className="flex items-center gap-2 text-sm font-bold text-text">
                    <List size={18} className="text-primary" />
                    فهرست مطالب
                  </span>

                  <span className="text-xs text-text-2">
                    {showContents ? "بستن" : "نمایش"}
                  </span>
                </button>

                {showContents && (
                  <nav className="mt-4 border-t border-border pt-3">
                    <ol className="space-y-1">
                      {sections
                        .filter((section) => section.title)
                        .map((section, index) => (
                          <li key={section.id}>
                            <a
                              href={`#${section.id}`}
                              className="flex items-start gap-3 rounded-lg px-2.5 py-2.5 text-sm leading-6 text-text-2 transition hover:bg-surface-2 hover:text-primary"
                            >
                              <span className="text-xs text-text-2">
                                {toPersianDigits(String(index + 1))}.
                              </span>
                              <span>{section.title}</span>
                            </a>
                          </li>
                        ))}
                    </ol>
                  </nav>
                )}
              </section>
            )}

            <section className="rounded-xl bg-primary p-5 text-surface">
              <Truck size={25} />

              <h2 className="mt-4 text-lg font-bold leading-8">
                دنبال بار مناسب هستید؟
              </h2>

              <p className="mt-2 text-sm leading-7 text-surface/80">
                بارهای موجود را بررسی کنید و اطلاعات هر محموله را پیش از انتخاب
                بخوانید.
              </p>

              <Link
                to="/loads"
                className="mt-5 flex items-center justify-between rounded-lg bg-surface px-4 py-3 text-sm font-semibold text-primary transition hover:bg-surface/90"
              >
                مشاهده بارها
                <ArrowLeft size={17} />
              </Link>
            </section>

            <section className="rounded-xl border border-border bg-surface p-5">
              <div className="mb-4 flex items-center gap-2">
                <Newspaper size={18} className="text-primary" />
                <h2 className="text-sm font-bold text-text">مطالب مرتبط</h2>
              </div>

              {isRelatedLoading ? (
                <p className="text-xs leading-6 text-text-2" role="status">
                  در حال دریافت مطالب مرتبط...
                </p>
              ) : relatedPosts?.length ? (
                <div className="space-y-4">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.id}
                      to={`/posts/${related.slug}`}
                      className="group flex gap-3"
                    >
                      {related.cover_image && (
                        <img
                          src={related.cover_image}
                          alt=""
                          loading="lazy"
                          className="size-19 shrink-0 rounded-lg bg-surface-2 object-cover"
                        />
                      )}

                      <span className="min-w-0">
                        {related.category && (
                          <span className="block text-[11px] text-text-2">
                            {related.category}
                          </span>
                        )}

                        <span className="mt-1 block text-sm font-semibold leading-6 text-text transition group-hover:text-primary">
                          {related.title}
                        </span>

                        <span className="mt-1 block text-[11px] text-text-2">
                          {formatPostDate(related.published_at)}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs leading-6 text-text-2">
                  در حال حاضر مطلب مرتبطی وجود ندارد.
                </p>
              )}
            </section>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mb-20 border-t border-border bg-surface md:mb-0">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-text-2 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>ShowBar | سامانه حمل‌ونقل بار</span>

            <Link
              to="/posts"
              className="flex items-center gap-2 transition hover:text-primary"
            >
              <ArrowRight size={14} />
              بازگشت به مطالب
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
