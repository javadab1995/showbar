import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import GoToLoads from "../../components/buttons/GoToLoads";


export function RequestSuccess() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 text-center ">
      <div className="bg-success/10 text-success p-4 rounded-full mb-6 animate-bounce mt-20">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-2 mb-8">
        <h1 className="text-2xl font-bold text-text">
          درخواست شما با موفقیت ثبت شد.
        </h1>
        <p className="text-text-2 max-w-sm">
          درخواست شما توسط ادمین بررسی می‌شود و برای هماهنگی با شما تماس گرفته
          خواهد شد.
        </p>
      </div>

      <div className="bg-surface border border-border p-6 rounded-xl shadow-sm w-full max-w-sm space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-border/50">
          <span className="text-sm text-text-2">شماره درخواست</span>
          <b className="font-mono text-text">REQ-8F29A</b>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-2">وضعیت</span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium">
            در انتظار بررسی
          </span>
        </div>
      </div>

      <div className="mt-8">
       <GoToLoads />
      </div>
    </div>
  );
}
