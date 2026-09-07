import { X } from "lucide-react";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-text/40
        p-4
        backdrop-blur-[2px]
      "
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="
          w-full max-w-lg
          overflow-hidden
          rounded-xl
          border border-border
          bg-surface
          shadow-xl
        "
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            border-b border-border
            px-5 py-4
          "
        >
          <h3
            id="modal-title"
            className="
              text-base
              font-semibold
              text-text
            "
          >
            {title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن"
            className="
              flex size-8
              items-center justify-center
              rounded-lg
              text-text-2
              transition-colors
              hover:bg-primary-soft
              hover:text-text
              focus:outline-none
              focus:ring-2
              focus:ring-primary/30
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
