import { CheckCircle2, Clock3, CircleX, CircleDot } from "lucide-react";
import { LoadStatus, RequestStatus, NotificationStatus } from "../types";

export function StatusBadge({
  status,
}: {
  status: LoadStatus | RequestStatus | NotificationStatus;
}) {
  // ۱. نگاشتِ استایل‌ها (کلاس‌های کاملِ Tailwind اینجا نوشته شده‌اند)
  const styles = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    muted: "text-muted",
    neutral: "text-text-2",
  };

  // ۲. تعیین دسته (Category) بر اساس وضعیت
  const category =
    status === "فعال" || status === "تأیید شده"
      ? "success"
      : status === "رزرو شده" || status === "در انتظار بررسی"
        ? "warning"
        : status === "رد شده" || status === "لغو شده"
          ? "danger"
          : status === "تکمیل شده" ||
              status === "اطلاع داده شد" ||
              status === "منقضی شده"
            ? "muted"
            : "neutral";

  // ۳. انتخاب آیکون و کلاس بر اساس دسته
  const Icon =
    category === "success"
      ? CheckCircle2
      : category === "warning"
        ? Clock3
        : category === "danger"
          ? CircleX
          : CircleDot;

  return (
    <span className={`flex items-center gap-1 ${styles[category]}`}>
      <Icon size={14} className={styles[category]} />
      {status}
    </span>
  );
}
