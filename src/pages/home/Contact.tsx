// pages/Contact.tsx
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../../components/buttons/Button";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold text-text mb-12">ارتباط با ما</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* اطلاعات تماس */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-bold">تلفن پشتیبانی</h3>
              <p className="text-text-2 mt-1">۰۲۱ - ۸۸۰۰۰۰۰۰</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold">ایمیل</h3>
              <p className="text-text-2 mt-1">support@showbar.ir</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold">آدرس دفتر</h3>
              <p className="text-text-2 mt-1">
                تهران، خیابان ونک، برج فناوری، واحد ۱۰
              </p>
            </div>
          </div>
        </div>

        {/* فرم کوتاه (اختیاری) */}
        <div className="bg-surface-2 p-8 rounded-3xl">
          <h3 className="font-bold mb-6">ارسال پیام</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="نام شما"
              className="h-12 w-full rounded-xl
                      border border-border
                      bg-surface
                      px-4 text-sm
                      text-text
                      outline-none
                      placeholder:text-text/40
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-primary/10"
            />
            <textarea
              placeholder="پیام شما..."
              rows={4}
              className="h-24 w-full rounded-xl
                      border border-border
                      bg-surface
                      px-4 text-sm
                      text-text
                      outline-none
                      placeholder:text-text/40
                      transition
                      focus:border-primary
                      focus:ring-4
                      focus:ring-primary/10"
            />
            <Button className="w-full py-3 bg-primary-radial text-surface rounded-xl font-medium hover:opacity-90 transition-opacity">
              ارسال پیام
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
