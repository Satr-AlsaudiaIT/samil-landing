"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/app/actions/admin";
import { Logo } from "@/components/Logo";
import { Lock, User, AlertCircle } from "lucide-react";

const initial: LoginState = { status: "idle" };

export default function LoginPage() {
  const [state, action] = useFormState(loginAction, initial);

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-cream bg-hero-radial flex items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl border border-navy-900/5 bg-white p-8 shadow-soft">
          <h1 className="text-2xl font-bold text-navy-900">تسجيل دخول الإدارة</h1>
          <p className="mt-1 text-sm text-muted">
            أدخل اسم المستخدم وكلمة المرور للوصول إلى لوحة التحكم.
          </p>

          <form action={action} className="mt-6 space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-navy-900">
                اسم المستخدم
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="username"
                  name="username"
                  required
                  className="input pr-10"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-900">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input pr-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {state.status === "error" && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                <AlertCircle size={18} className="mt-0.5" />
                <span>{state.message}</span>
              </div>
            )}

            <SubmitBtn />
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-muted">
          صامل للتسويق العقاري — لوحة الإدارة
        </p>
      </div>
    </main>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-60">
      {pending ? "جاري الدخول..." : "تسجيل الدخول"}
    </button>
  );
}
