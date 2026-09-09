
import { Headphones, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";

interface SupportButtonProps {
  phone: string;
  whatsapp: string;
}

export default function SupportButton({
  phone,
  whatsapp,
}: SupportButtonProps) {
  const [open, setOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="fixed bottom-24 left-5 z-50 md:bottom-6 md:left-6">
      {/* Support menu */}
      {open && (
        <div
          className="
            absolute bottom-14 left-0
            w-64
            overflow-hidden
            rounded-2xl
            border border-border
            bg-primary-soft/95
            shadow-xl
            backdrop-blur-md
          "
        >
          {/* Header */}
          <div
            className="
              flex items-center justify-between
              border-b border-border
              px-4 py-3
            "
          >
            <div>
              <p className="text-sm font-semibold text-text">
                پشتیبانی ShowBar
              </p>

              <p className="mt-0.5 text-xs text-text-2">
                چطور می‌توانیم کمکتان کنیم؟
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن"
              className="
                flex size-7 items-center justify-center
                rounded-lg
                text-text-2
                transition
                hover:bg-surface
                hover:text-text
              "
            >
              <X size={16} />
            </button>
          </div>

          {/* Actions */}
          <div className="p-2">
            {/* Phone */}
            <a
              href={`tel:${phone}`}
              className="
                flex items-center gap-3
                rounded-xl
                px-3 py-3
                transition
                hover:bg-primary-soft
              "
            >
              <span
                className="
                  flex size-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-primary/10
                  text-primary
                "
              >
                <Phone size={18} />
              </span>

              <span className="flex flex-col">
                <span className="text-sm font-medium text-text">
                  تماس با پشتیبانی
                </span>

                <span className="text-xs text-text-2">
                  {phone}
                </span>
              </span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-3
                rounded-xl
                px-3 py-3
                transition
                hover:bg-primary-soft
              "
            >
              <span
                className="
                  flex size-9 shrink-0
                  items-center justify-center
                  rounded-lg
                  bg-primary/10
                  text-primary
                "
              >
                <MessageCircle size={18} />
              </span>

              <span className="flex flex-col">
                <span className="text-sm font-medium text-text">
                  پیام در واتساپ
                </span>

                <span className="text-xs text-text-2">
                  ارسال پیام
                </span>
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "بستن پشتیبانی" : "پشتیبانی"}
        aria-expanded={open}
        className="
          flex size-12 items-center justify-center
          rounded-full
          bg-warning
          text-amber-50
          shadow-lg
          transition-all duration-200
          hover:bg-warning/95
          hover:shadow-xl
          active:scale-95
        "
      >
        {open ? (
          <X size={21} strokeWidth={2} />
        ) : (
          <Headphones size={21} strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
