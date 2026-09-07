"use client";

import { useState } from "react";
import { MoreVertical, type LucideIcon } from "lucide-react";
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


interface DropdownItem {
  id?: string | number; 
  label: string;
  icon?: LucideIcon; 
  onClick?: () => void;
  danger?: boolean;
  warning?: boolean;
  disabled?: boolean;
}


interface DropdownMenuProps {
  items: DropdownItem[];
}

export default function DropdownMenu({ items = [] }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        className="flex size-9 items-center justify-center rounded-lg border border-border text-text/60 transition hover:bg-text/5"
        {...getReferenceProps()}
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-50 min-w-48 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-xl"
            {...getFloatingProps()}
          >
            {items.map((item) => {
              // استفاده از آیکون به عنوان کامپوننت
              const Icon = item.icon;

              return (
                <button
                  key={item.id ?? item.label}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  className={` 
                    flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition
                    ${item.danger ? "text-danger hover:bg-danger/10" : ""}
                    ${item.warning ? "text-warning hover:bg-warning/10" : ""}
                    ${!item.danger && !item.warning ? "text-text hover:bg-primary/5" : ""}
                    disabled:pointer-events-none disabled:opacity-50
                  `}
                >
                  {Icon && <Icon size={16} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
