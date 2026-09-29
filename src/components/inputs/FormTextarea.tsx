import { forwardRef, type TextareaHTMLAttributes } from "react";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor={textareaId} className="text-sm font-medium text-text">
            {label}
          </label>

          {hint && <span className="text-xs text-text-2">{hint}</span>}
        </div>

        <textarea
          ref={ref}
          id={textareaId}
          className={`
            min-h-28
            w-full
            resize-y
            rounded-xl
            border
            bg-bg
            px-4
            py-3
            text-sm
            text-text
            outline-none
            transition
            placeholder:text-muted
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${
              error
                ? "border-danger focus:ring-2 focus:ring-danger/10"
                : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
            }
            ${className}
          `}
          {...props}
        />

        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  },
);

FormTextarea.displayName = "FormTextarea";
