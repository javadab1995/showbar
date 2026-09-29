import { ArrowLeft, Mail, MapPin, Phone, Headphones } from "lucide-react";

export default function Contact() {
  return (
    <main className="bg-surface">
      {/* Hero */}
      <section className="relative overflow-hidden bg-login-pattern">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-text/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-text/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3 text-text/70">
              <span className="h-px w-10 bg-green-50 " />

              <span className="text-sm font-bold text-green-100">
                در ارتباط باشیم
              </span>
            </div>

            <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
              ارتباط با شوبار
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 md:text-lg">
              اگر درباره حمل بار، همکاری یا خدمات شوبار سوالی دارید، می‌توانید
              مستقیماً با ما در ارتباط باشید.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Contact info */}
          <div className="space-y-5">
            <ContactItem
              icon={<Phone size={22} />}
              title="تلفن پشتیبانی"
              description="پاسخگویی مستقیم به سوالات شما"
              value="۰۲۱ - ۸۸۰۰۰۰۰۰"
              href="tel:+982188000000"
            />

            <ContactItem
              icon={<Mail size={22} />}
              title="ایمیل"
              description="برای درخواست‌ها و مکاتبات"
              value="support@showbar.ir"
              href="mailto:support@showbar.ir"
            />

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={22} />
              </div>

              <div>
                <h2 className="font-bold text-text">آدرس دفتر</h2>

                <p className="mt-2 leading-7 text-text-2">
                  تهران، خیابان ونک، برج فناوری، واحد ۱۰
                </p>
              </div>
            </div>
          </div>

          {/* Support panel */}
          <div className="relative overflow-hidden rounded-4xl bg-primary p-8 text-white md:p-12">
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Headphones size={28} />
              </div>

              <h2 className="mt-8 text-3xl font-black leading-tight">
                نیاز به راهنمایی دارید؟
              </h2>

              <p className="mt-5 max-w-lg leading-8 text-white/70">
                تیم پشتیبانی شوبار آماده پاسخگویی به سوالات شما درباره حمل‌ونقل،
                ثبت بار و نحوه استفاده از خدمات شوبار است.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="tel:+982188000000"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-bold text-primary transition hover:bg-white/90"
                >
                  تماس با پشتیبانی
                  <ArrowLeft
                    size={18}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                </a>

                <a
                  href="mailto:support@showbar.ir"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
                >
                  ارسال ایمیل
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-4xl bg-surface-2 p-8 md:p-10">
          <div className="relative z-10 max-w-xl">
            <span className="text-sm font-bold text-primary">شوبار</span>

            <h2 className="mt-3 text-2xl font-black text-text md:text-3xl">
              مسیر حمل‌ونقل، از اینجا شروع می‌شود.
            </h2>

            <p className="mt-4 leading-8 text-text-2">
              برای مشاهده بارهای موجود، به بخش بارها بروید و مسیر مورد نظر خود
              را پیدا کنید.
            </p>
          </div>

          <div className="absolute -left-20 -bottom-32 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        </div>
      </section>
    </main>
  );
}

function ContactItem({
  icon,
  title,
  description,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-start gap-4 rounded-2xl border border-border bg-surface p-6 transition hover:border-primary/30 hover:shadow-sm"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
        {icon}
      </div>

      <div className="min-w-0">
        <h2 className="font-bold text-text">{title}</h2>

        <p className="mt-1 text-sm text-text-2">{description}</p>

        <p className="mt-3 break-all font-medium text-primary">{value}</p>
      </div>
    </a>
  );
}
