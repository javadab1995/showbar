import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  size,
} from "@floating-ui/react";
import { FilterOption } from "../../data/options";

type MultiSelectProps = {
  options: FilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "انتخاب کنید",
  disabled = false,
  className=""
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);



  // تنظیمات Floating UI
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(8),
      flip(),
      shift(),
      size({
        apply({ rects, elements }) {
          // این کار باعث می‌شود عرض dropdown دقیقاً برابر با دکمه باشد
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);


  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((item) => item !== optionValue));
  };

  const clearAll = () => {
    onChange([]);
    setOpen(false);
  };

  const selectedOptions = options.filter((option) =>
    value.includes(option.value),
  );

  return (
    <div className="w-full">
      {/* Trigger */}
      <button
        ref={refs.setReference}
        type="button"
        disabled={disabled}
        {...getReferenceProps()}
        className={`${className ? className : "flex min-h-9 w-full items-center justify-between gap-2 rounded-full border border-border px-3 py-1 text-sm text-text transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"}`}
         
      >
        <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {selectedOptions.length === 0 ? (
            <span className="text-text-2 truncate">{placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className="
                  flex
                  items-center
                  gap-1
                  rounded-md
                  bg-primary-soft
                  px-2
                  py-1
                  text-xs
                  text-primary
                "
              >
                {option.label}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeOption(option.value);
                  }}
                  className="cursor-pointer"
                >
                  <X size={13} />
                </span>
              </span>
            ))
          )}
        </div>

        <ChevronDown
          size={17}
          className={`shrink-0 text-text-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="
            z-50
            max-h-64
            overflow-y-auto
            rounded-lg
            border
            border-border
            bg-surface
            p-1
            shadow-lg
          "
        >
          {selectedOptions.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-md
                px-3
                py-2
                text-xs
                text-danger
                hover:bg-surface-2
              "
            >
              حذف همه
              <X size={14} />
            </button>
          )}

          {options.map((option) => {
            const selected = value.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleOption(option.value)}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-md
                  px-3
                  py-2.5
                  text-right
                  text-sm
                  text-text
                  transition
                  hover:bg-surface-2
                "
              >
                <span>{option.label}</span>
                <span
                  className={`
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded
                    border
                    ${
                      selected
                        ? "border-primary bg-primary text-surface"
                        : "border-border"
                    }
                  `}
                >
                  {selected && <Check size={14} />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
