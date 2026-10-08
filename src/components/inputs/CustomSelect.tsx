
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";

import {
  useRef,
  useState,
} from "react";

import { Check, ChevronDown } from "lucide-react";
import { useTheme } from "../../hooks/other/useTheme";



type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function CustomSelect({
  value,
  options,
  placeholder = "انتخاب کنید",
  onChange,
  className = "",
}: CustomSelectProps) {

  const { themeRoot } = useTheme();

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  const {
    refs,
    floatingStyles,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({
        padding: 8,
      }),
      shift({
        padding: 8,
      }),
      size({
        padding: 8,
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${Math.max(
              180,
              Math.min(280, availableHeight),
            )}px`,
          });
        },
      }),
    ],
  });

  const click = useClick(context);

  const dismiss = useDismiss(context);

  const role = useRole(context, {
    role: "listbox",
  });

  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    virtual: true,
  });

  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps,
  } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
  ]);

  const handleSelect = (option: SelectOption) => {
    onChange(option.value);
    setOpen(false);
    setActiveIndex(null);
  };


  console.log({
    value,
    options,
    selectedOption,
  });

  return (
    <div className={`relative shrink-0 ${className}`}>
      <button
        ref={refs.setReference}
        type="button"
        aria-expanded={open}
        {...getReferenceProps()}
        className={`
          flex
          h-9
          min-w-24
          items-center
          gap-2
          rounded-full
          border
          px-4
          text-xs
          transition
          outline-none
          ${
            value
              ? "border-primary bg-primary-radial text-surface"
              : "border-border bg-surface text-text-2 hover:text-text"
          }
          focus:border-primary
          focus:ring-2
          focus:ring-primary/10
        `}
      >
        <span className="min-w-0 flex-1 truncate text-right">
          {selectedOption?.label ?? placeholder}
        </span>

        <ChevronDown
          size={15}
          className={`
            shrink-0
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <FloatingPortal root={themeRoot}>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="
                z-50
                overflow-y-auto
                rounded-xl
                border
                border-border
                bg-surface
                p-1
                shadow-lg
                outline-none
              "
            >
              {options.map((option, index) => {
                const selected = option.value === value;
                const active = activeIndex === index;

                return (
                  <button
                    key={option.value}
                    ref={(node) => {
                      listRef.current[index] = node;
                    }}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    {...getItemProps({
                      onClick: () => handleSelect(option),
                    })}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-right
                      text-xs
                      transition
                      ${
                        active
                          ? "bg-surface-2"
                          : "hover:bg-surface-2"
                      }
                      ${
                        selected
                          ? "font-medium text-primary"
                          : "text-text"
                      }
                    `}
                  >
                    <span className="truncate">
                      {option.label}
                    </span>

                    {selected && (
                      <Check
                        size={15}
                        className="shrink-0 text-primary"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}

