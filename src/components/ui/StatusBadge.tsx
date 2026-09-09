import {
  CheckCircle2,
  Clock3,
  CircleX,
  CircleDot,
  CheckCircle,
} from "lucide-react";

import type {
  LoadStatus,
  NotificationStatus,
  RequestStatus,
} from "../../types";

type Status = LoadStatus | RequestStatus | NotificationStatus;

type StatusBadgeProps = {
  status: Status;
};

const statusConfig = {
  active: {
    label: "فعال",
    category: "success",
    icon: CheckCircle2,
  },

  reserved: {
    label: "رزرو شده",
    category: "warning",
    icon: Clock3,
  },

  completed: {
    label: "تکمیل شده",
    category: "muted",
    icon: CheckCircle,
  },

  cancelled: {
    label: "لغو شده",
    category: "danger",
    icon: CircleX,
  },

  expired: {
    label: "منقضی شده",
    category: "muted",
    icon: CircleDot,
  },

  approved: {
    label: "تأیید شده",
    category: "success",
    icon: CheckCircle2,
  },

  pending: {
    label: "در انتظار بررسی",
    category: "warning",
    icon: Clock3,
  },

  rejected: {
    label: "رد شده",
    category: "danger",
    icon: CircleX,
  },

  notified: {
    label: "اطلاع داده شد",
    category: "muted",
    icon: CircleDot,
  },
} as const satisfies Record<
  Status,
  {
    label: string;
    category: "success" | "warning" | "danger" | "muted";
    icon: typeof CircleDot;
  }
>;

const categoryStyles = {
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
  muted: "text-muted",
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  const Icon = config.icon;
  const colorClass = categoryStyles[config.category];

  return (
    <span className={`flex items-center gap-1 ${colorClass}`}>
      <Icon size={14} className={colorClass} />

      {config.label}
    </span>
  );
}
