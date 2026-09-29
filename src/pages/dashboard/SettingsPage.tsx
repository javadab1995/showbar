import {

  LogOut,
  Building2,

  UsersRound,
} from "lucide-react";


import { Button } from "../../components/buttons/Button";

import ThemeSettings from "../../components/ui/ThemeSettings";
import CompanyInfoForm from "../../components/forms/CompanyInfoForm";
import { useAuth } from "../../auth/AuthProvider";
import AccountSecurity from "../../components/features/settings/AccountSecurity";

export function SettingsPage() {
  const { user, signOut } = useAuth();

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="space-y-2 border-b border-border pb-6">
        <h2 className="text-3xl font-bold text-text">تنظیمات</h2>

        <p className="text-text-2">
          مدیریت اطلاعات شرکت، حساب کاربری و ظاهر پنل مدیریتی
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {user ? (
            <CompanyInfoForm adminId={user.id} />
          ) : (
            <div className="text-text-2">اطلاعات حساب در دسترس نیست.</div>
          )}

          <AccountSecurity />
        </div>

        <div className="space-y-6">
          <ThemeSettings />

          <section className="pt-4">
            <Button
              onClick={signOut}
              variant="danger"
              className="w-full bg-danger text-red-50 flex items-center justify-center py-3 rounded-xl text-lg shadow-lg shadow-red-500/10"
            >
              <LogOut className="ml-2 w-5 h-5" />
              خروج از حساب
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
