import {
  ArrowLeft,
  Eye,
  Route,
  ShieldCheck,
  Target,
  Truck,
  UsersRound,
  Zap,
} from "lucide-react";

export default function About() {
  return (
    <main className="bg-surface text-text" >
      {/* Hero */}
      <section className="relative min-h-155 overflow-hidden">
        <img
          src="/images/about.png"
          alt="Showbar truck on the road"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-l from-primary/50 via-primary-dark/20 to-transparent" />

        <div className="relative mx-auto flex min-h-155 max-w-7xl items-center px-6 py-20">
          <div className="mr-auto max-w-2xl text-right">
            <div className="mb-5 flex items-center justify-start gap-3 text-primary-soft">
              <span className="h-px w-10 bg-white " />
              <span className="text-sm font-bold text-warning">درباره شوبار</span>
            </div>

            <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
              داستان ما
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/80 md:text-lg">
              ما در «شوبار» معتقدیم حمل‌ونقل کالا نباید پیچیده باشد. هدف ما
              ایجاد بستری شفاف و مدرن برای اتصال مستقیم صاحبان کالا به رانندگان
              حرفه‌ای است.
            </p>

            <div className="mt-9 flex justify-end">
              <a
                href="/loads"
                className="group inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-3.5 font-bold text-white transition hover:bg-primary-dark"
              >
                مشاهده بارهای فعال
                <ArrowLeft
                  size={18}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-primary">
              <span className="h-px w-10 bg-current" />
              <span className="text-sm font-bold">ما کی هستیم؟</span>
            </div>

            <h2 className="max-w-xl text-3xl font-black leading-tight md:text-5xl">
              تکنولوژی در خدمت
              <span className="text-primary"> یک زنجیره مطمئن</span>
            </h2>

            <p className="mt-7 max-w-xl leading-8 text-text-2">
              شوبار حاصل ترکیب تکنولوژی و نیازهای واقعی صنعت حمل‌ونقل است. ما
              تلاش می‌کنیم فرآیند پیدا کردن بار و راننده را ساده‌تر، شفاف‌تر و
              سریع‌تر کنیم.
            </p>

            <p className="mt-4 max-w-xl leading-8 text-text-2">
              تمرکز ما روی ساختن تجربه‌ای است که هم برای صاحب کالا قابل اعتماد
              باشد و هم برای راننده حرفه‌ای، ساده و قابل استفاده.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-4xl">
              <img
                src="/images/about-2.png"
                alt="Showbar transportation"
                className="h-105 w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl border border-border bg-surface p-5 shadow-xl md:block">
              <Truck className="text-primary" size={30} />

              <p className="mt-3 text-sm font-bold">مسیر ساده‌تر،</p>

              <p className="text-sm text-text-2">حمل‌ونقل مطمئن‌تر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-surface-2 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 flex items-center gap-3 text-primary">
              <span className="h-px w-10 bg-current" />
              <span className="text-sm font-bold">مسیر ما</span>
            </div>

            <h2 className="text-3xl font-black md:text-4xl">
              برای چه چیزی ساخته شده‌ایم؟
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Target size={27} />
              </div>

              <h3 className="mt-7 text-2xl font-black">ماموریت</h3>

              <p className="mt-4 leading-8 text-text-2">
                ساده‌سازی زنجیره تأمین و ایجاد ارتباطی مستقیم، شفاف و قابل
                اعتماد میان صاحبان کالا و رانندگان حرفه‌ای.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-8 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Eye size={27} />
              </div>

              <h3 className="mt-7 text-2xl font-black">چشم‌انداز</h3>

              <p className="mt-4 leading-8 text-text-2">
                ساختن تجربه‌ای مدرن برای حمل‌ونقل جاده‌ای؛ تجربه‌ای که
                تصمیم‌گیری را سریع‌تر و مسیر جابه‌جایی کالا را هوشمندتر کند.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Showbar */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="overflow-hidden rounded-4xl bg-primary">
          <div className="grid lg:grid-cols-[1.05fr_1fr]">
            <div className="relative min-h-105">
              <img
                src="/images/about-3.png"
                alt="Showbar route"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-primary/20" />
            </div>

            <div className="p-8 text-white md:p-12 lg:p-14">
              <div className="mb-5 flex items-center gap-3 text-white/70">
                <span className="h-px w-10 bg-current" />
                <span className="text-sm font-bold">چرا شوبار؟</span>
              </div>

              <h2 className="text-3xl font-black leading-tight md:text-4xl">
                جاده‌ای مطمئن برای
                <br />
                کسب‌وکار شما
              </h2>

              <p className="mt-6 leading-8 text-white/75">
                شوبار تلاش می‌کند فاصله میان صاحب کالا و راننده را کمتر کند؛ با
                ارتباط مستقیم‌تر، اطلاعات شفاف‌تر و تجربه‌ای ساده‌تر.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
                <Feature
                  icon={<ShieldCheck size={21} />}
                  title="امنیت بالا"
                  text="توجه به سلامت کالا"
                />

                <Feature
                  icon={<Zap size={21} />}
                  title="سرعت بیشتر"
                  text="ارتباط مستقیم و بی‌واسطه"
                />

                <Feature
                  icon={<Route size={21} />}
                  title="هزینه کمتر"
                  text="حذف واسطه‌های غیرضروری"
                />

                <Feature
                  icon={<UsersRound size={21} />}
                  title="رانندگان حرفه‌ای"
                  text="تجربه و تعهد در مسیر"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 shrink-0">{icon}</div>

      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="mt-1 text-sm text-white/60">{text}</p>
      </div>
    </div>
  );
}
