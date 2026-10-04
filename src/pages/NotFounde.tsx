import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* آیکون مسیر اشتباه - می‌توانی از Lucide استفاده کنی */}
      <div className="mb-8 p-6 bg-[#39A889]/10 rounded-full animate-bounce">
        <svg
          className="w-24 h-24 text-[#0D674E]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 20l-5.48-5.48a6 6 0 118.48-8.48L12 7.05l1.04-1.04a6 6 0 118.48 8.48L15 20"
          />
        </svg>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-[#0D674E] mb-4">
        ۴۰۴
      </h1>

      <p className="text-xl text-[#39A889] font-medium mb-2">
        این مسیر باربری در سیستم تعریف نشده است!
      </p>

      <p className="text-[#041A14]/70 mb-8 max-w-md">
        شاید کامیون از جاده اشتباهی رفته یا صفحه مورد نظر شما حذف شده است.
        پیشنهاد می‌کنم به داشبورد یا لیست بارها برگردید.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-[#0D674E] text-white rounded-lg hover:bg-[#0D674E]/90 transition-colors shadow-md"
        >
          بازگشت به خانه
        </Link>
        <Link
          to="/loads"
          className="px-6 py-3 border border-[#39A889] text-[#39A889] rounded-lg hover:bg-[#39A889] hover:text-white transition-all"
        >
          مشاهده لیست بارها
        </Link>
      </div>
    </div>
  );
}
