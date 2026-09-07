// pages/About.tsx
export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-text mb-8">داستان ما</h1>

      <div className="space-y-6 text-text-2 leading-relaxed">
        <p>
          ما در «شو‌بار» معتقدیم که حمل‌ونقل کالا نباید پیچیده باشد. هدف ما
          ایجاد بستری شفاف و مدرن برای اتصال مستقیم صاحبان کالا به رانندگان
          حرفه‌ای است.
        </p>
        <p>
          تیم ما متشکل از متخصصانی است که تکنولوژی را با نیازهای لجستیک ترکیب
          کرده‌اند تا تجربه‌ای سریع، امن و مقرون‌به‌صرفه را رقم بزنند.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-surface-2 rounded-2xl">
          <h3 className="font-bold text-lg mb-2">ماموریت</h3>
          <p className="text-text-2">
            ساده‌سازی زنجیره تامین برای کسب‌وکارهای ایرانی.
          </p>
        </div>
        <div className="p-6 bg-surface-2 rounded-2xl">
          <h3 className="font-bold text-lg mb-2">چشم‌انداز</h3>
          <p className="text-text-2">
            هوشمندسازی جاده‌های کشور با تکیه بر داده‌کاوی.
          </p>
        </div>
      </div>
    </div>
  );
}
