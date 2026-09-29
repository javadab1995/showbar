


import { useState } from "react";
import {
  ChevronLeft,
  MoreVertical,
  type LucideIcon,
} from "lucide-react";

import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
  useInteractions,
  useClick,
  FloatingPortal,
} from "@floating-ui/react";
import { useTheme } from "../../hooks/other/useTheme";

interface DropdownItem {
  id?: string | number;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  danger?: boolean;
  warning?: boolean;
  disabled?: boolean;
  children?: DropdownItem[];
}

interface DropdownMenuProps {
  items: DropdownItem[];
}

export default function DropdownMenu({
  items = [],
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<DropdownItem | null>(null);
  const { themeRoot } = useTheme();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (value) => {
      setOpen(value);

      if (!value) {
        setSubmenu(null);
      }
    },
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } =
    useInteractions([click, dismiss]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;

    if (item.children?.length) {
      setSubmenu((current) =>
        current?.id === item.id ? null : item,
      );
      return;
    }

    item.onClick?.();
    setOpen(false);
    setSubmenu(null);
  };

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        className="
          flex size-9 items-center justify-center
          rounded-lg border border-border
          text-text/60 transition
          hover:bg-text/5
        "
        {...getReferenceProps()}
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <FloatingPortal root={themeRoot}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="
              z-50 min-w-48
              overflow-hidden rounded-xl
              border border-border
              bg-background p-1
              shadow-xl
            "
            {...getFloatingProps()}
          >
            {submenu ? (
              <>
                <button
                  type="button"
                  onClick={() => setSubmenu(null)}
                  className="
                    flex w-full items-center gap-2
                    rounded-lg px-3 py-2.5
                    text-sm text-text-2
                    transition hover:bg-text/5
                  "
                >
                  <ChevronLeft size={16} />
                  <span>{submenu.label}</span>
                </button>

                <div className="my-1 border-t border-border" />

                {submenu.children?.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id ?? item.label}
                      type="button"
                      disabled={item.disabled}
                      onClick={() => {
                        item.onClick?.();
                        setOpen(false);
                        setSubmenu(null);
                      }}
                      className={`
                        flex w-full items-center gap-2
                        rounded-lg px-3 py-2.5
                        text-sm transition

                        ${item.danger ? "text-danger hover:bg-danger/10" : ""}

                        ${
                          item.warning ? "text-warning hover:bg-warning/10" : ""
                        }

                        ${
                          !item.danger && !item.warning
                            ? "text-text hover:bg-primary/5"
                            : ""
                        }

                        disabled:pointer-events-none
                        disabled:opacity-50
                      `}
                    >
                      {Icon && <Icon size={16} />}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </>
            ) : (
              items.map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children?.length);

                return (
                  <button
                    key={item.id ?? item.label}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => handleItemClick(item)}
                    className={`
                      flex w-full items-center gap-2
                      rounded-lg px-3 py-2.5
                      text-sm transition

                      ${item.danger ? "text-danger hover:bg-danger/10" : ""}

                      ${item.warning ? "text-warning hover:bg-warning/10" : ""}

                      ${
                        !item.danger && !item.warning
                          ? "text-text hover:bg-primary/5"
                          : ""
                      }

                      disabled:pointer-events-none
                      disabled:opacity-50
                    `}
                  >
                    {Icon && <Icon size={16} />}

                    <span className="flex-1 text-right">{item.label}</span>

                    {hasChildren && (
                      <ChevronLeft size={15} className="text-text-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

