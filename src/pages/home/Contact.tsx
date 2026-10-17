
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  Headphones,
  WifiOff,
  RefreshCw,
  MessageCircle,
  Instagram,
} from "lucide-react";

import { SiWhatsapp } from "react-icons/si";
import { useCompany } from "../../hooks/admin/useCompanies";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";
import SEO from "../../components/seo/SEO";

export default function Contact() {
  const isOnline = useOnlineStatus();

  const {
    data: company,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useCompany();

  const phone = company?.phone?.trim() || "";
  const email = company?.email?.trim() || "";
  const address = company?.address?.trim() || "";
 const whatsappImport = company?.whatsapp_import?.replace(/\D/g, "") ?? "";
  const whatsappExport = company?.whatsapp_export?.replace(/\D/g, "") ?? "";
  

 const whatsappImportUrl = whatsappImport
   ? `https://wa.me/${whatsappImport}`
   : undefined;

 const whatsappExportUrl = whatsappExport
   ? `https://wa.me/${whatsappExport}`
    : undefined;
  
  

const socialLinks = [
  {
    label: "اینستاگرام",
    href: company?.instagram,
    icon: <Instagram size={18} />,
  },
  {
    label: "روبیکا واردات",
    href: company?.rubika_import_url,
    icon: <MessageCircle size={18} />,
  },
  {
    label: "روبیکا صادرات",
    href: company?.rubika_export_url,
    icon: <MessageCircle size={18} />,
  },
  {
    label: "بله واردات",
    href: company?.bale_import_url,
    icon: <MessageCircle size={18} />,
  },
  {
    label: "بله صادرات",
    href: company?.bale_export_url,
    icon: <MessageCircle size={18} />,
  },
  {
    label: "ایتا واردات",
    href: company?.eitaa_import_url,
    icon: <MessageCircle size={18} />,
  },
  {
    label: "ایتا صادرات",
    href: company?.eitaa_export_url,
    icon: <MessageCircle size={18} />,
  },
]
  .map((item) => ({
    ...item,
    href: item.href ?? undefined,
  }))
  .filter((item) => item.href?.trim());

  if (isLoading && !company) {
    return (
      <main className="min-h-[50vh] bg-surface px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-5">
          <div className="h-10 w-56 animate-pulse rounded-md bg-border" />
          <div className="h-5 w-80 max-w-full animate-pulse rounded-md bg-border" />

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="h-48 animate-pulse rounded-2xl bg-surface-2" />
            <div className="h-48 animate-pulse rounded-2xl bg-surface-2" />
          </div>
        </div>
      </main>
    );
  }

  // خطای دریافت اطلاعات با ثبت نشدن شرکت یکی نیست.
  if (!company && isError) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-surface px-6 py-16">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <WifiOff className="h-10 w-10 text-text/50" />

          <h1 className="text-xl font-bold text-text">
            دریافت اطلاعات تماس ناموفق بود
          </h1>

          <p className="text-sm leading-7 text-text-2">
            {isOnline
              ? error instanceof Error
                ? error.message
                : "هنگام دریافت اطلاعات تماس مشکلی رخ داد."
              : "اتصال اینترنت برقرار نیست. پس از برقراری اتصال دوباره تلاش کنید."}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={!isOnline || isFetching}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={18}
              className={isFetching ? "animate-spin" : ""}
            />
            {isFetching ? "در حال دریافت..." : "تلاش مجدد"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-surface">
      <SEO
        title="تماس با شوبار | ارتباط با پشتیبانی"
        description="برای پرسش‌ها، پیشنهادها و پیگیری مسائل مربوط به خدمات شوبار، از طریق راه‌های ارتباطی درج‌شده با ما تماس بگیرید."
        path="/contact"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-soft">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-text/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-text/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-text/70">
              <span className="h-px w-10 bg-warning" />
              <span className="text-sm font-bold text-warning">
                در ارتباط باشیم
              </span>
            </div>

            <h1 className="text-4xl font-black leading-tight text-text md:text-6xl">
              ارتباط با شوبار
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-text/70 md:text-lg">
              اگر درباره حمل بار، همکاری یا خدمات شوبار سوالی دارید، می‌توانید
              مستقیماً با ما در ارتباط باشید.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        {!isOnline && (
          <div
            role="status"
            className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-4 text-sm text-text-2"
          >
            <WifiOff size={20} className="shrink-0" />
            <p>
              اتصال اینترنت برقرار نیست. ممکن است اطلاعات تماس به‌روز نباشند.
            </p>
          </div>
        )}

        {isError && company && (
          <div
            role="status"
            className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-sm leading-6 text-text-2">
              دریافت اطلاعات جدید ناموفق بود. اطلاعات موجود نمایش داده شده‌اند.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={!isOnline || isFetching}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition hover:bg-surface disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={isFetching ? "animate-spin" : ""}
              />
              تلاش مجدد
            </button>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Contact info */}
          <div className="space-y-5">
            <ContactItem
              icon={<Phone size={22} />}
              title="تلفن پشتیبانی"
              description="پاسخگویی مستقیم به سوالات شما"
              value={phone || "ثبت نشده"}
              href={phone ? `tel:${phone}` : undefined}
            />
            <ContactItem
              icon={<SiWhatsapp size={22} />}
              title="واتساپ صادرات"
              description="ارتباط با بخش صادرات"
              value={whatsappExport || "ثبت نشده"}
              href={whatsappExportUrl}
            />

            <ContactItem
              icon={<SiWhatsapp size={22} />}
              title="واتساپ واردات"
              description="ارتباط با بخش واردات"
              value={whatsappImport || "ثبت نشده"}
              href={whatsappImportUrl}
            />

            <ContactItem
              icon={<Mail size={22} />}
              title="ایمیل"
              description="برای درخواست‌ها و مکاتبات"
              value={email || "ثبت نشده"}
              href={email ? `mailto:${email}` : undefined}
            />

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={22} />
              </div>

              <div>
                <h2 className="font-bold text-text">آدرس دفتر</h2>
                <p className="mt-2 leading-7 text-text-2">
                  {address || "آدرس ثبت نشده است"}
                </p>
              </div>
            </div>
          </div>

          {/* Support panel */}
          <div className="relative overflow-hidden rounded-4xl bg-primary-soft p-8 text-primary-dark md:p-12">
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-surface-2 blur-2xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2">
                <Headphones size={28} />
              </div>

              <h2 className="mt-8 text-3xl font-black leading-tight">
                نیاز به راهنمایی دارید؟
              </h2>

              <p className="mt-5 max-w-lg leading-8 text-text">
                تیم پشتیبانی شوبار آماده پاسخگویی به سوالات شما درباره حمل‌ونقل،
                ثبت بار و نحوه استفاده از خدمات شوبار است.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="group inline-flex items-center justify-center gap-3 rounded-xl bg-surface px-6 py-3.5 font-bold text-primary transition hover:bg-surface-2"
                  >
                    تماس با پشتیبانی
                    <ArrowLeft
                      size={18}
                      className="transition-transform group-hover:-translate-x-1"
                    />
                  </a>
                )}

                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-primary/50 px-6 py-3.5 font-bold text-text transition hover:bg-primary/20"
                  >
                    ارسال ایمیل
                  </a>
                )}

                {!phone && !email && (
                  <p className="text-sm leading-7 text-surface-2">
                    اطلاعات تماس پشتیبانی هنوز ثبت نشده است.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-4xl border border-border bg-surface-2 p-8 md:p-10">
          <div className="relative z-10 max-w-2xl">
            <span className="text-sm font-bold text-primary">شوبار</span>

            <h2 className="mt-3 text-2xl font-black text-text md:text-3xl">
              مسیر حمل‌ونقل، از اینجا شروع می‌شود.
            </h2>

            <p className="mt-4 leading-8 text-text-2">
              برای مشاهده بارهای موجود، به بخش بارها بروید و مسیر مورد نظر خود
              را پیدا کنید. همچنین می‌توانید از طریق شبکه‌های اجتماعی با ما در
              ارتباط باشید.
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2  px-4 py-3 text-sm font-semibold  transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/10"
                  >
                    <span className="transition-transform duration-200 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    <span className="text-xs opacity-60">↗</span>
                  </a>
                ))}
              </div>
            )}

            <a
              href="/loads"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              مشاهده بارهای موجود
              <span>←</span>
            </a>
          </div>

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -top-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </section>
    </main>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  href?: string;
}

function ContactItem({
  icon,
  title,
  description,
  value,
  href,
}: ContactItemProps) {
  const content = (
    <>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <h2 className="font-bold text-text">{title}</h2>
        <p className="mt-1 text-sm text-text-2">{description}</p>
        <p className="mt-3 break-all font-medium text-primary">{value}</p>
      </div>
    </>
  );

  const className =
    "group flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/30 hover:shadow-sm";

  if (!href) {
    return (
      <div className={className}>
        {content}
      </div>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

