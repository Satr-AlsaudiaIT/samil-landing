import { getContactInfo } from "@/lib/db";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { PasswordForm } from "@/components/admin/PasswordForm";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  const info = getContactInfo();
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy-900">إعدادات الموقع</h1>
        <p className="mt-1 text-sm text-muted">
          تحديث بيانات التواصل المعروضة في صفحة الهبوط وكلمة مرور الإدارة.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SettingsForm info={info} />
        </div>
        <div>
          <PasswordForm />
        </div>
      </div>
    </div>
  );
}
