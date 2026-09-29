import {
  Bell,
  BellRing,
  Check,
  Clock3,
  Eye,
  EyeOff,
  Phone,
  RotateCcw,
  Truck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getLoadAvailabilityAlerts,
  getLoadNotifications,
  type LoadAvailabilityAlert,
  type LoadNotification,
} from "../../services/apiNotification-service";

type NotificationTab = "load_requests" | "availability_alerts";

type NotificationItem =
  | {
      type: "load_request";
      data: LoadNotification;
    }
  | {
      type: "availability_alert";
      data: LoadAvailabilityAlert;
    };

type Props = {
  onNotificationClick?: (notification: NotificationItem) => void;
};

type HiddenNotifications = {
  load_requests: string[];
  availability_alerts: string[];
};

const HIDDEN_NOTIFICATIONS_KEY = "showbar-hidden-notifications";

const emptyHiddenNotifications: HiddenNotifications = {
  load_requests: [],
  availability_alerts: [],
};

const requestStatusConfig = {
  active: {
    label: "جدید",
    className: "bg-primary-soft text-primary-dark",
  },
  notified: {
    label: "اطلاع داده شد",
    className: "bg-bg text-text-2",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-bg text-muted",
  },
} as const;

const alertStatusConfig = {
  pending: {
    label: "در انتظار",
    className: "bg-primary-soft text-primary-dark",
  },
  notified: {
    label: "اطلاع داده شد",
    className: "bg-bg text-text-2",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-bg text-muted",
  },
} as const;

function getHiddenNotifications(): HiddenNotifications {
  try {
    const stored = localStorage.getItem(HIDDEN_NOTIFICATIONS_KEY);

    if (!stored) {
      return emptyHiddenNotifications;
    }

    const parsed = JSON.parse(stored);

    return {
      load_requests: Array.isArray(parsed?.load_requests)
        ? parsed.load_requests
        : [],

      availability_alerts: Array.isArray(parsed?.availability_alerts)
        ? parsed.availability_alerts
        : [],
    };
  } catch {
    return emptyHiddenNotifications;
  }
}

function saveHiddenNotifications(notifications: HiddenNotifications) {
  localStorage.setItem(HIDDEN_NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
}

function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
  label: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      className="
        inline-flex
        cursor-pointer
        items-center
        justify-center
      "
      onClick={(event) => event.stopPropagation()}
    >
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="sr-only"
      />

      <span
        className={`
          flex size-5
          items-center justify-center
          rounded-md
          border
          transition-all
          ${
            checked || indeterminate
              ? "border-primary bg-primary text-surface"
              : "border-border bg-surface text-transparent hover:border-primary/50"
          }
        `}
      >
        {indeterminate ? (
          <span className="h-0.5 w-2.5 rounded-full bg-current" />
        ) : (
          <Check size={13} strokeWidth={3} />
        )}
      </span>
    </label>
  );
}

export default function NotificationList({ onNotificationClick }: Props) {
  const [activeTab, setActiveTab] = useState<NotificationTab>("load_requests");

  const [hiddenNotifications, setHiddenNotifications] =
    useState<HiddenNotifications>(getHiddenNotifications);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    data: loadNotifications = [],
    isLoading: isLoadNotificationsLoading,
    isError: isLoadNotificationsError,
  } = useQuery({
    queryKey: ["load-notifications"],
    queryFn: getLoadNotifications,
    staleTime: 30 * 1000,
  });

  const {
    data: availabilityAlerts = [],
    isLoading: isAvailabilityAlertsLoading,
    isError: isAvailabilityAlertsError,
  } = useQuery({
    queryKey: ["load-availability-alerts"],
    queryFn: getLoadAvailabilityAlerts,
    staleTime: 30 * 1000,
  });

  const isLoading = isLoadNotificationsLoading || isAvailabilityAlertsLoading;

  const isError = isLoadNotificationsError || isAvailabilityAlertsError;

  const visibleLoadNotifications = loadNotifications.filter(
    (item) => !hiddenNotifications.load_requests.includes(item.id),
  );

  const visibleAvailabilityAlerts = availabilityAlerts.filter(
    (item) => !hiddenNotifications.availability_alerts.includes(item.id),
  );

  const visibleItems =
    activeTab === "load_requests"
      ? visibleLoadNotifications
      : visibleAvailabilityAlerts;

  const hiddenCount =
    activeTab === "load_requests"
      ? hiddenNotifications.load_requests.length
      : hiddenNotifications.availability_alerts.length;

  const visibleIds = visibleItems.map((item) => item.id);

  const selectedVisibleIds = selectedIds.filter((id) =>
    visibleIds.includes(id),
  );

  const allSelected =
    visibleIds.length > 0 && selectedVisibleIds.length === visibleIds.length;

  const partiallySelected =
    selectedVisibleIds.length > 0 &&
    selectedVisibleIds.length < visibleIds.length;

  const hasSelection = selectedVisibleIds.length > 0;

  function toggleSelection(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    );
  }

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id)),
      );

      return;
    }

    setSelectedIds((current) => [
      ...current.filter((id) => !visibleIds.includes(id)),
      ...visibleIds,
    ]);
  }

  function hideSelected() {
    if (!selectedVisibleIds.length) {
      return;
    }

    setHiddenNotifications((current) => {
      const updated = {
        ...current,
        [activeTab]: Array.from(
          new Set([...current[activeTab], ...selectedVisibleIds]),
        ),
      };

      saveHiddenNotifications(updated);

      return updated;
    });

    setSelectedIds((current) =>
      current.filter((id) => !selectedVisibleIds.includes(id)),
    );
  }

  function restoreNotifications() {
    setHiddenNotifications((current) => {
      const updated = {
        ...current,
        [activeTab]: [],
      };

      saveHiddenNotifications(updated);

      return updated;
    });

    setSelectedIds([]);
  }

  function changeTab(tab: NotificationTab) {
    setActiveTab(tab);
    setSelectedIds([]);
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex border-b border-border">
          <div className="h-12 w-36 animate-pulse rounded-t-xl bg-border" />
          <div className="h-12 w-36 animate-pulse rounded-t-xl bg-border" />
        </div>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-24 animate-pulse rounded-2xl bg-border"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 text-center">
        <p className="text-sm text-danger">دریافت اعلان‌ها با خطا مواجه شد.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center justify-between gap-4 border-b border-border">
        <div className="flex min-w-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => changeTab("load_requests")}
            className={`
              relative flex shrink-0 items-center gap-2
              px-4 py-3
              text-sm font-medium
              transition-colors
              ${
                activeTab === "load_requests"
                  ? "text-primary"
                  : "text-text-2 hover:text-text"
              }
            `}
          >
            <Truck size={17} />

            <span>درخواست‌های بار</span>

            {visibleLoadNotifications.length > 0 && (
              <span
                className="
                  flex min-w-5 h-5
                  items-center justify-center
                  rounded-full
                  bg-primary/10
                  px-1.5
                  text-[11px]
                  font-semibold
                  text-primary
                "
              >
                {visibleLoadNotifications.length}
              </span>
            )}

            {activeTab === "load_requests" && (
              <span
                className="
                  absolute
                  right-0
                  bottom-0
                  left-0
                  h-0.5
                  bg-primary
                "
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => changeTab("availability_alerts")}
            className={`
              relative flex shrink-0 items-center gap-2
              px-4 py-3
              text-sm font-medium
              transition-colors
              ${
                activeTab === "availability_alerts"
                  ? "text-primary"
                  : "text-text-2 hover:text-text"
              }
            `}
          >
            <BellRing size={17} />

            <span>درخواست‌های اطلاع‌رسانی</span>

            {visibleAvailabilityAlerts.length > 0 && (
              <span
                className="
                  flex min-w-5 h-5
                  items-center justify-center
                  rounded-full
                  bg-primary/10
                  px-1.5
                  text-[11px]
                  font-semibold
                  text-primary
                "
              >
                {visibleAvailabilityAlerts.length}
              </span>
            )}

            {activeTab === "availability_alerts" && (
              <span
                className="
                  absolute
                  right-0
                  bottom-0
                  left-0
                  h-0.5
                  bg-primary
                "
              />
            )}
          </button>
        </div>

        {/* Restore */}
        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={restoreNotifications}
            className="
              flex shrink-0
              items-center gap-1.5
              rounded-lg
              px-3 py-2
              text-xs
              font-medium
              text-text-2
              transition
              hover:bg-bg
              hover:text-primary
            "
            title="نمایش اعلان‌های پنهان"
          >
            <RotateCcw size={14} />

            <span>نمایش پنهان‌ها</span>

            <span
              className="
                flex size-5
                items-center justify-center
                rounded-full
                bg-bg
                text-[10px]
              "
            >
              {hiddenCount}
            </span>
          </button>
        )}
      </div>

      {/* Selection toolbar */}
      {visibleItems.length > 0 && (
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            rounded-xl
            border border-border
            bg-surface-2
            px-3 py-2.5
          "
        >
          <div className="flex items-center gap-3">
            <Checkbox
              checked={allSelected}
              indeterminate={partiallySelected}
              onChange={toggleSelectAll}
              label="انتخاب همه اعلان‌ها"
            />

            <span className="text-xs text-text-2">
              {hasSelection
                ? `${selectedVisibleIds.length} اعلان انتخاب شده`
                : "انتخاب همه"}
            </span>
          </div>

          {hasSelection && (
            <button
              type="button"
              onClick={hideSelected}
              className="
                flex items-center gap-1.5
                rounded-lg
                bg-primary
                px-3 py-2
                text-xs
                font-medium
                text-surface
                transition
                hover:opacity-90
              "
            >
              <EyeOff size={14} />

              <span>پنهان کردن انتخاب‌شده‌ها</span>
            </button>
          )}
        </div>
      )}

      {/* Empty state */}
      {!visibleItems.length && (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <div
            className="
              mx-auto
              flex size-12
              items-center justify-center
              rounded-2xl
              bg-bg
              text-muted
            "
          >
            {activeTab === "load_requests" ? (
              <Truck size={22} />
            ) : (
              <BellRing size={22} />
            )}
          </div>

          <p className="mt-4 text-sm font-medium text-text">
            {hiddenCount > 0
              ? "همه اعلان‌های این بخش پنهان شده‌اند"
              : activeTab === "load_requests"
                ? "درخواستی برای بار وجود ندارد"
                : "درخواست اطلاع‌رسانی وجود ندارد"}
          </p>

          <p className="mt-1 text-xs text-text-2">
            {hiddenCount > 0
              ? "اعلان‌های پنهان‌شده از دیتابیس حذف نشده‌اند."
              : activeTab === "load_requests"
                ? "درخواست‌های ثبت‌شده برای بارها اینجا نمایش داده می‌شوند."
                : "درخواست‌های اطلاع‌رسانی برای بارهای غیرفعال اینجا نمایش داده می‌شوند."}
          </p>

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={restoreNotifications}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-primary
                px-4 py-2
                text-xs
                font-medium
                text-surface
                transition
                hover:opacity-90
              "
            >
              <RotateCcw size={14} />
              نمایش همه
            </button>
          )}
        </div>
      )}

      {/* Load requests */}
      {activeTab === "load_requests" && visibleLoadNotifications.length > 0 && (
        <div className="space-y-3">
          {visibleLoadNotifications.map((item) => {
            const status = requestStatusConfig[item.status];

            const notification: NotificationItem = {
              type: "load_request",
              data: item,
            };

            const isSelected = selectedVisibleIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`
                    group
                    relative
                    w-full
                    rounded-2xl
                    border
                    bg-surface
                    p-4
                    transition
                    ${
                      isSelected
                        ? "border-primary/40 bg-primary/5"
                        : "border-border hover:border-primary/30 hover:shadow-sm"
                    }
                  `}
              >
                <div className="flex items-start gap-3">
                  <div className="pt-1">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleSelection(item.id)}
                      label={`انتخاب درخواست ${item.name}`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => onNotificationClick?.(notification)}
                    className="
                        min-w-0
                        flex-1
                        text-right
                      "
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="
                            flex size-10 shrink-0
                            items-center justify-center
                            rounded-xl
                            bg-primary-soft
                            text-primary
                          "
                      >
                        <Truck size={19} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-semibold text-text">
                            درخواست بار جدید
                          </p>

                          <span
                            className={`
                                shrink-0
                                rounded-full
                                px-2 py-1
                                text-[11px]
                                font-medium
                                ${status.className}
                              `}
                          >
                            {status.label}
                          </span>
                        </div>

                        <p className="mt-1 text-sm text-text">{item.name}</p>

                        {item.load?.[0] && (
                          <p className="mt-1 truncate text-xs text-text-2">
                            {item.load[0].origin}

                            <span className="mx-1 text-muted">←</span>

                            {item.load[0].destination}
                          </p>
                        )}

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <Phone size={13} />
                            {item.phone}
                          </span>

                          <span className="flex items-center gap-1">
                            <Clock3 size={13} />
                            {formatDate(item.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Availability alerts */}
      {activeTab === "availability_alerts" &&
        visibleAvailabilityAlerts.length > 0 && (
          <div className="space-y-3">
            {visibleAvailabilityAlerts.map((item) => {
              const status = alertStatusConfig[item.status];

              const notification: NotificationItem = {
                type: "availability_alert",
                data: item,
              };

              const isSelected = selectedVisibleIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`
                    group
                    relative
                    w-full
                    rounded-2xl
                    border
                    bg-surface
                    p-4
                    transition
                    ${
                      isSelected
                        ? "border-primary/40 bg-primary/5"
                        : "border-border hover:border-primary/30 hover:shadow-sm"
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-1">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleSelection(item.id)}
                        label={`انتخاب درخواست ${item.name}`}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => onNotificationClick?.(notification)}
                      className="
                        min-w-0
                        flex-1
                        text-right
                      "
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="
                            flex size-10 shrink-0
                            items-center justify-center
                            rounded-xl
                            bg-primary-soft
                            text-primary
                          "
                        >
                          <BellRing size={19} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-sm font-semibold text-text">
                              درخواست اطلاع‌رسانی
                            </p>

                            <span
                              className={`
                                shrink-0
                                rounded-full
                                px-2 py-1
                                text-[11px]
                                font-medium
                                ${status.className}
                              `}
                            >
                              {status.label}
                            </span>
                          </div>

                          <p className="mt-1 text-sm text-text">{item.name}</p>

                          {item.load?.[0] && (
                            <p className="mt-1 truncate text-xs text-text-2">
                              {item.load[0].origin}

                              <span className="mx-1 text-muted">←</span>

                              {item.load[0].destination}
                            </p>
                          )}

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                            <span className="flex items-center gap-1">
                              <Phone size={13} />
                              {item.mobile}
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock3 size={13} />
                              {formatDate(item.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
