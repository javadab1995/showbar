import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, className = "", ...props }, ref) => (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-text">{label}</label>
      )}
      <textarea
        ref={ref}
        className={`w-full px-3 py-2 bg-surface-2 border rounded-lg text-text outline-none transition resize-none
         ${error ? "border-danger ring-4 ring-danger/10" : "border-border focus:border-primary focus:ring-4 focus:ring-primary/10"}
          ${className}`}
        {...props}
      />
      {error && <span className="text-[10px] text-danger mt-0.5">{error}</span>}
    </div>
  ),
);

TextAreaField.displayName = "TextAreaField";
