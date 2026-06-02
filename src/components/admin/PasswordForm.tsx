"use client";

import { useFormState, useFormStatus } from "react-dom";
import { changePasswordAction, type PasswordState } from "@/app/actions/admin";
import { CheckCircle2, AlertCircle, KeyRound } from "lucide-react";

const initial: PasswordState = { status: "idle" };

export function PasswordForm() {
  const [state, action] = useFormState(changePasswordAction, initial);
  return (
    <form action={action} className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-soft">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-50 text-gold-700">
          <KeyRound size={18} />
        </div>
        <div>
          <h2 className="font-bold text-navy-900">تغيير كلمة المرور</h2>
          <p className="text-xs text-muted">8 أحرف على الأقل.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="new_password" className="mb-1.5 block text-sm font-medium text-navy-900">
            كلمة المرور الجديدة
          </label>
          <input id="new_password" name="new_password" type="password" required className="input" />
        </div>
        <div>
          <label htmlFor="confirm_password" className="mb-1.5 block text-sm font-medium text-navy-900">
            تأكيد كلمة المرور
          </label>
          <input id="confirm_password" name="confirm_password" type="password" required className="input" />
        </div>
      </div>

      {state.status === "success" && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}
      {state.status === "error" && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="mt-5">
        <SubmitBtn />
      </div>
    </form>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
      {pending ? "جاري الحفظ..." : "تحديث كلمة المرور"}
    </button>
  );
}
