"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateContactInfoAction, type SettingsState } from "@/app/actions/admin";
import type { ContactInfo } from "@/lib/db";
import { CheckCircle2, AlertCircle, Save } from "lucide-react";

const initial: SettingsState = { status: "idle" };

export function SettingsForm({ info }: { info: ContactInfo }) {
  const [state, action] = useFormState(updateContactInfoAction, initial);

  return (
    <form action={action} className="rounded-2xl border border-navy-900/5 bg-white p-6 md:p-8 shadow-soft">
      <h2 className="text-lg font-bold text-navy-900">بيانات التواصل</h2>
      <p className="mt-1 text-sm text-muted">
        تظهر هذه البيانات في صفحة الهبوط (سكشن "تواصل معنا" والفوتر).
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field name="phone" label="رقم الهاتف" defaultValue={info.phone} placeholder="+966 5X XXX XXXX" />
        <Field name="whatsapp" label="رقم الواتساب" defaultValue={info.whatsapp} placeholder="+9665XXXXXXXX" />
        <Field name="email" type="email" label="البريد الإلكتروني" defaultValue={info.email} placeholder="info@samel.sa" />
        <Field name="working_hours" label="ساعات العمل" defaultValue={info.working_hours} placeholder="الأحد - الخميس..." />
        <div className="md:col-span-2">
          <Field name="address" label="العنوان" defaultValue={info.address} placeholder="الرياض، المملكة العربية السعودية" />
        </div>
        <Field name="twitter" label="رابط تويتر / X" defaultValue={info.twitter} placeholder="https://twitter.com/..." />
        <Field name="instagram" label="رابط انستقرام" defaultValue={info.instagram} placeholder="https://instagram.com/..." />
        <div className="md:col-span-2">
          <Field name="linkedin" label="رابط لينكدإن" defaultValue={info.linkedin} placeholder="https://linkedin.com/..." />
        </div>
      </div>

      {state.status === "success" && (
        <Banner tone="success" icon={<CheckCircle2 size={18} />}>{state.message}</Banner>
      )}
      {state.status === "error" && (
        <Banner tone="error" icon={<AlertCircle size={18} />}>{state.message}</Banner>
      )}

      <div className="mt-6 flex justify-end">
        <SaveBtn />
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  defaultValue,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue: string | null;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue || ""}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}

function Banner({
  tone,
  children,
  icon,
}: {
  tone: "success" | "error";
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  const cls =
    tone === "success"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : "bg-red-50 text-red-800 border-red-200";
  return (
    <div className={`mt-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${cls}`}>
      <span className="mt-0.5">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function SaveBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "جاري الحفظ..." : "حفظ التغييرات"}
      <Save size={16} />
    </button>
  );
}
