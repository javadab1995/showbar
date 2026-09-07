import { forwardRef, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium text-text/80 pl-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`h-12 w-full rounded-xl border px-4 text-sm text-text outline-none transition
            placeholder:text-text/40
            ${error ? "border-danger ring-4 ring-danger/10" : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"}
            ${className}`}
          {...props}
        />
        {error && (
          <span className="text-[10px] text-danger mt-0.5 pl-1">{error}</span>
        )}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
