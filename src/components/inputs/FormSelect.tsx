import { forwardRef, type SelectHTMLAttributes } from "react";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
};

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label,
      options,
      error,
      placeholder = "انتخاب کنید",
      className = "",
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const selectId = id ?? props.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-xs font-medium text-text">
          {label}
        </label>

        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          className={`
            h-12
            w-full
            rounded-xl
            border
            bg-bg
            px-4
            text-sm
            text-text
            outline-none
            transition
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${
              error
                ? "border-danger focus:ring-danger/10"
                : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
            }
            ${className}
          `}
          {...props}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  },
);

FormSelect.displayName = "FormSelect";
