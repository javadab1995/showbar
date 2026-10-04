import { X } from "lucide-react";
import { useState } from "react";


export default function BorderParkBanner() {
    const [isOpen, setIsOpen] = useState(true);
    
    function onClose() {
        setIsOpen(false)
    }
  

  return (
    <section className={`fixed overflow-hidden top-16  z-999 w-full transition-all duration-200 ease-in-out ${isOpen ? "bg-danger border border-danger/15" : "bg-transparent border-none"}`}>
      {isOpen && (
        <div className="relative flex justify-end p-2 max-w-7xl mx-right ">
          <a
            href="https://borderpark.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-54 h-8"
            aria-label="مشاهده پارکینگ مرزی"
          >
            <img
              src="/images/border-park-logo.png"
              alt=""
              className=" w-full object-cover h-full "
              loading="lazy"
            />
          </a>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن بنر"
            className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-gray-900"
          >
            <X />
          </button>

          <div className="absolute inset-y-0 right-10 flex items-center px-6">
            <div className="text-right">
              <h2 className="text-base font-bold text-primary ">
                سامانه مدیریت ترافیک و
              </h2>
              <p className="mt-1 text-xs text-white sm:text-sm">
                (نوبت دهی ناوگان در مرز)
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
