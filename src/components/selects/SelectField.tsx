import { forwardRef, SelectHTMLAttributes } from "react";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-text pl-1">{label}</label>
        )}
        <select
          ref={ref}
          className={`w-full px-3 py-2 bg-surface-2 border rounded-lg text-text outline-none transition
           ${error ? "border-danger ring-4 ring-danger/10" : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"}
            ${className}`}
          {...props}
        >
          <option value="" disabled>
            انتخاب کنید...
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="text-[10px] text-danger mt-0.5 pl-1">{error}</span>
        )}
      </div>
    );
  },
);

SelectField.displayName = "SelectField";
