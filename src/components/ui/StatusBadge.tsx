
import {
  CheckCircle,
  CheckCircle2,
  CircleDot,
  CircleX,
  Clock3,
  type LucideIcon,
} from "lucide-react";

import type {
  DriverRequestLoadStatus,
  DriverRequestStatus,
  DriverStatus,
  LoadNotificationStatus,
  LoadStatus,
  VehicleStatus,
} from "../../types/status";

type Status =
  | LoadStatus
  | DriverRequestStatus
  | DriverRequestLoadStatus
  | LoadNotificationStatus
  | VehicleStatus
  | DriverStatus;

type StatusBadgeProps = {
  status: Status;
};

type StatusConfig = {
  label: string;
  category: "success" | "warning" | "danger" | "muted";
  icon: LucideIcon;
};

const statusConfig = {
  active: {
    label: "فعال",
    category: "success",
    icon: CheckCircle2,
  },

  inactive: {
    label: "غیرفعال",
    category: "muted",
    icon: CircleDot,
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

  confirmed: {
    label: "تأیید شده",
    category: "success",
    icon: CheckCircle,
  },

  notified: {
    label: "اطلاع داده شد",
    category: "muted",
    icon: CircleDot,
  },
} satisfies Record<Status, StatusConfig>;

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
      <Icon size={14} />
      {config.label}
    </span>
  );
}

