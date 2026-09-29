
import {
  Bell,
  Car,
  CheckCircle,
  CheckCircle2,
  CircleDot,
  CircleX,
  Clock3,
  Link2,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

type GuideItem = {
  label: string;
  description: string;
  category: "success" | "warning" | "danger" | "muted";
  icon: LucideIcon;
};

type GuideSection = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: GuideItem[];
};

const categoryStyles = {
  success: {
    badge: "bg-success/10 text-success",
    icon: "text-success",
  },
  warning: {
    badge: "bg-warning/10 text-warning",
    icon: "text-warning",
  },
  danger: {
    badge: "bg-danger/10 text-danger",
    icon: "text-danger",
  },
  muted: {
    badge: "bg-surface-2 text-text-2",
    icon: "text-text-2",
  },
} as const;

const guideSections: GuideSection[] = [
  {
    title: "وضعیت بار",
    description:
      "وضعیت خود بار را نشان می‌دهد و مشخص می‌کند بار در چه مرحله‌ای قرار دارد.",
    icon: Truck,
    items: [
      {
        label: "فعال",
        description:
          "بار آزاد است و می‌تواند برای یک درخواست راننده تخصیص داده شود.",
        category: "success",
        icon: CheckCircle2,
      },
      {
        label: "رزرو شده",
        description:
          "بار برای یک درخواست راننده تأیید شده و دیگر برای درخواست جدید قابل تخصیص نیست.",
        category: "warning",
        icon: Clock3,
      },
      {
        label: "تکمیل شده",
        description:
          "فرآیند حمل این بار به پایان رسیده است.",
        category: "muted",
        icon: CheckCircle,
      },
      {
        label: "لغو شده",
        description:
          "این بار لغو شده و دیگر در فرآیند تخصیص قرار نمی‌گیرد.",
        category: "danger",
        icon: CircleX,
      },
      {
        label: "منقضی شده",
        description:
          "مهلت یا زمان اعتبار این بار به پایان رسیده است.",
        category: "muted",
        icon: CircleDot,
      },
    ],
  },

  {
    title: "وضعیت درخواست راننده",
    description:
      "وضعیت کلی درخواست راننده را نشان می‌دهد.",
    icon: Users,
    items: [
      {
        label: "در انتظار بررسی",
        description:
          "درخواست ثبت شده و هنوز توسط ادمین بررسی نشده است.",
        category: "warning",
        icon: Clock3,
      },
      {
        label: "تأیید شده",
        description:
          "حداقل یک بار از درخواست تأیید شده و درخواست وارد وضعیت تأیید شده است.",
        category: "success",
        icon: CheckCircle2,
      },
      {
        label: "رد شده",
        description:
          "درخواست قابل تخصیص نبوده و تمام بارهای مربوط به آن رد شده‌اند.",
        category: "danger",
        icon: CircleX,
      },
    ],
  },

  {
    title: "وضعیت هر بار در درخواست",
    description:
      "این وضعیت فقط مربوط به رابطه بین یک درخواست راننده و یک بار مشخص است.",
    icon: Truck,
    items: [
      {
        label: "در انتظار بررسی",
        description:
          "این بار در درخواست راننده قرار دارد اما هنوز درباره آن تصمیم گرفته نشده است.",
        category: "warning",
        icon: Clock3,
      },
      {
        label: "تأیید شده",
        description:
          "این بار برای همین درخواست تأیید و به راننده تخصیص داده شده است. وضعیت خود بار نیز «رزرو شده» می‌شود.",
        category: "success",
        icon: CheckCircle2,
      },
      {
        label: "رد شده",
        description:
          "این بار برای این درخواست تأیید نشده است.",
        category: "danger",
        icon: CircleX,
      },
    ],
  },

  {
    title: "وضعیت اعلان",
    description:
      "وضعیت ارسال و مدیریت اعلان‌ها را نشان می‌دهد.",
    icon: Bell,
    items: [
      {
        label: "فعال",
        description:
          "اعلان فعال است و در سیستم قابل پردازش است.",
        category: "success",
        icon: CheckCircle2,
      },
      {
        label: "اطلاع داده شد",
        description:
          "اعلان برای گیرنده ارسال یا اطلاع‌رسانی شده است.",
        category: "muted",
        icon: CircleDot,
      },
      {
        label: "لغو شده",
        description:
          "این اعلان لغو شده و دیگر پردازش نمی‌شود.",
        category: "danger",
        icon: CircleX,
      },
    ],
  },

  {
    title: "وضعیت هشدار دسترسی به بار",
    description:
      "وضعیت هشدارهایی را نشان می‌دهد که برای دسترسی یا اطلاع‌رسانی درباره بار ایجاد شده‌اند.",
    icon: Bell,
    items: [
      {
        label: "در انتظار بررسی",
        description:
          "هشدار ایجاد شده اما هنوز اطلاع‌رسانی آن انجام نشده است.",
        category: "warning",
        icon: Clock3,
      },
      {
        label: "اطلاع داده شد",
        description:
          "هشدار برای گیرنده مربوطه اطلاع‌رسانی شده است.",
        category: "muted",
        icon: CircleDot,
      },
      {
        label: "لغو شده",
        description:
          "این هشدار لغو شده و دیگر نیاز به پردازش ندارد.",
        category: "danger",
        icon: CircleX,
      },
    ],
  },

  {
    title: "وضعیت خودرو",
    description:
      "مشخص می‌کند خودرو در سیستم فعال است یا غیرفعال.",
    icon: Car,
    items: [
      {
        label: "فعال",
        description:
          "خودرو فعال است و می‌تواند در فرآیندهای سیستم استفاده شود.",
        category: "success",
        icon: CheckCircle2,
      },
      {
        label: "غیرفعال",
        description:
          "خودرو غیرفعال است و در فرآیندهای جدید استفاده نمی‌شود.",
        category: "muted",
        icon: CircleDot,
      },
    ],
  },

  {
    title: "وضعیت راننده",
    description:
      "وضعیت فعالیت راننده در سیستم را نشان می‌دهد.",
    icon: Users,
    items: [
      {
        label: "فعال",
        description:
          "راننده فعال است و می‌تواند در فرآیندهای سیستم استفاده شود.",
        category: "success",
        icon: CheckCircle2,
      },
      {
        label: "غیرفعال",
        description:
          "راننده غیرفعال است و در فرآیندهای جدید استفاده نمی‌شود.",
        category: "muted",
        icon: CircleDot,
      },
    ],
  },

  {
    title: "وضعیت ارتباط خودرو و راننده",
    description:
      "وضعیت ارتباط ثبت‌شده بین یک خودرو و یک راننده را نشان می‌دهد.",
    icon: Link2,
    items: [
      {
        label: "فعال",
        description:
          "ارتباط خودرو و راننده فعال است.",
        category: "success",
        icon: CheckCircle2,
      },
      {
        label: "غیرفعال",
        description:
          "ارتباط خودرو و راننده غیرفعال شده است.",
        category: "muted",
        icon: CircleDot,
      },
    ],
  },
];

export default function StatusGuide() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-text">
          راهنمای وضعیت‌ها
        </h2>

        <p className="mt-1 text-sm leading-6 text-text-2">
          هر وضعیت مربوط به بخش مشخصی از سیستم است. برای جلوگیری از
          اشتباه، وضعیت بار، درخواست و رابطه بین آن‌ها را جداگانه بررسی
          کنید.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {guideSections.map((section) => {
          const SectionIcon = section.icon;

          return (
            <div
              key={section.title}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <SectionIcon size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-text">
                    {section.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-text-2">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 divide-y divide-border">
                {section.items.map((item) => {
                  const ItemIcon = item.icon;
                  const styles = categoryStyles[item.category];

                  return (
                    <div
                      key={`${section.title}-${item.label}`}
                      className="flex gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${styles.badge}`}
                      >
                        <ItemIcon
                          size={16}
                          className={styles.icon}
                        />
                      </div>

                      <div className="min-w-0">
                        <span className="text-sm font-medium text-text">
                          {item.label}
                        </span>

                        <p className="mt-1 text-xs leading-5 text-text-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text">
              نکته مهم درباره تخصیص بار
            </h3>

            <p className="mt-1 text-xs leading-6 text-text-2">
              وقتی یک بار برای یک درخواست راننده تأیید می‌شود، وضعیت
              رابطه آن بار با درخواست به «تأیید شده» تغییر می‌کند و
              وضعیت خود بار به «رزرو شده» تغییر خواهد کرد. بارهای
              دیگری که در همان درخواست در انتظار بررسی بوده‌اند،
              رد می‌شوند. بنابراین بار تأییدشده دیگر برای درخواست‌های
              جدید قابل تخصیص نیست.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

