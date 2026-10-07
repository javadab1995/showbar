
import { Headphones, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { useCompany } from "../../hooks/admin/useCompanies";
import { SiWhatsapp } from "react-icons/si";


export default function SupportButton() {
  const { data: company, isLoading } = useCompany()
  const whatsapp = company?.whatsapp ?? "";
  const phone = company?.phone;
  const [open, setOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;

  if(isLoading) return (
    <div className="relative flex w-64 animate-pulse gap-2 p-4">
      <div className="h-12 w-12 rounded-full bg-border"></div>
      <div className="flex-1">
        <div className="mb-1 h-5 w-3/5 rounded-lg bg-border text-lg"></div>
        <div className="h-5 w-[90%] rounded-lg bg-border text-sm"></div>
      </div>
      <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-border"></div>
    </div>
  );


  return (
    <div className="fixed bottom-24 right-5 z-50 md:bottom-6 md:right-6">
      {/* Support menu */}
      {open && (
        <div
          className="
            absolute bottom-14 right-0
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
                <SiWhatsapp size={18} />
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
