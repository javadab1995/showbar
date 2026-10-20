import { useState } from "react";
import { Headphones, LoaderCircle, Phone, WifiOff, X } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import { useCompany } from "../../hooks/admin/useCompanies";
import { useOnlineStatus } from "../../hooks/other/useOnlineStatus";
import { toPersianDigits } from "../../helpers/number";

export default function SupportButton() {
  const isOnline = useOnlineStatus();
  const [open, setOpen] = useState(false);

  const { data: company, isLoading, isError, error } = useCompany();

  const phone = company?.phone ?? "";
  const whatsappExport = company?.whatsapp_export ?? "";
  const whatsappImport = company?.whatsapp_import ?? "";

  const getWhatsappUrl = (number: string) => {
    const normalizedNumber = number.replace(/\D/g, "");

    return `https://wa.me/${normalizedNumber}`;
  };

  const hasContactInfo = Boolean(phone || whatsappExport || whatsappImport);

  return (
    <div className="fixed bottom-24 right-5 z-50 md:bottom-6 md:right-6">
      {/* Support menu */}
      {open && (
        <div
          className="
            absolute bottom-14 right-0
            w-72 overflow-hidden
            rounded-2xl border border-border
            bg-primary-soft/95
            shadow-xl backdrop-blur-md
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
              <p className="text-sm font-semibold text-text">پشتیبانی شوبار</p>

              <p className="mt-0.5 text-xs text-text-2">
                ارتباط با بخش واردات و صادرات
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="بستن منوی پشتیبانی"
              className="
                flex size-7 items-center justify-center
                rounded-lg text-text-2 transition
                hover:bg-surface hover:text-text
              "
            >
              <X size={16} />
            </button>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center gap-3 px-4 py-8">
              <LoaderCircle className="animate-spin text-primary" size={26} />

              <p className="text-sm text-text-2">
                در حال دریافت اطلاعات تماس...
              </p>
            </div>
          )}

          {/* Error */}
          {!isLoading && isError && !company && (
            <div className="flex flex-col items-center gap-3 px-4 py-6 text-center">
              <WifiOff size={26} className="text-text-2" />

              <p className="text-sm font-medium text-text">
                دریافت اطلاعات تماس ناموفق بود
              </p>

              <p className="text-xs leading-6 text-text-2">
                {!isOnline
                  ? "اتصال اینترنت خود را بررسی کنید."
                  : "لطفاً کمی بعد دوباره تلاش کنید."}
              </p>
            </div>
          )}

          {/* Contact actions */}
          {!isLoading && !isError && company && (
            <div className="p-2">
              {/* Phone */}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="
                    flex items-center gap-3
                    rounded-xl px-3 py-3
                    transition hover:bg-primary-soft
                  "
                >
                  <span
                    className="
                      flex size-9 shrink-0 items-center justify-center
                      rounded-lg bg-primary/10 text-primary
                    "
                  >
                    <Phone size={18} />
                  </span>

                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-text">
                      تماس با پشتیبانی
                    </span>

                    <span className="text-xs text-text-2">{toPersianDigits(phone)}</span>
                  </span>
                </a>
              )}

              {/* Export WhatsApp */}
              {whatsappExport && (
                <a
                  href={getWhatsappUrl(whatsappExport)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-3
                    rounded-xl px-3 py-3
                    transition hover:bg-primary-soft
                  "
                >
                  <span
                    className="
                      flex size-9 shrink-0 items-center justify-center
                      rounded-lg bg-primary/10 text-primary
                    "
                  >
                    <SiWhatsapp size={18} />
                  </span>

                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-text">
                      واتساپ صادرات
                    </span>

                    <span className="text-xs text-text-2" dir="ltr">
                      {toPersianDigits(whatsappExport)}
                    </span>
                  </span>
                </a>
              )}

              {/* Import WhatsApp */}
              {whatsappImport && (
                <a
                  href={getWhatsappUrl(whatsappImport)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-3
                    rounded-xl px-3 py-3
                    transition hover:bg-primary-soft
                  "
                >
                  <span
                    className="
                      flex size-9 shrink-0 items-center justify-center
                      rounded-lg bg-primary/10 text-primary
                    "
                  >
                    <SiWhatsapp size={18} />
                  </span>

                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-text">
                      واتساپ واردات
                    </span>

                    <span className="text-xs text-text-2" dir="ltr">
                      {toPersianDigits(whatsappImport)}
                    </span>
                  </span>
                </a>
              )}

              {!hasContactInfo && (
                <p className="px-3 py-5 text-center text-sm text-text-2">
                  اطلاعات تماس ثبت نشده است.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Floating button: always visible */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "بستن پشتیبانی" : "پشتیبانی"}
        aria-expanded={open}
        className="
          flex size-12 items-center justify-center
          rounded-full bg-warning text-amber-50
          shadow-lg transition-all duration-200
          hover:bg-warning/95 hover:shadow-xl
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
