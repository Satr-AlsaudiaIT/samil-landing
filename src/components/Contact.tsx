"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { submitContactMessage, type ContactFormState } from "@/app/actions/contact";

type ContactInfo = {
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  working_hours: string | null;
};

const initial: ContactFormState = { status: "idle" };

export function Contact({ info }: { info: ContactInfo }) {
  const [state, formAction] = useFormState(submitContactMessage, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const wa = info.whatsapp ? `https://wa.me/${info.whatsapp.replace(/[^\d]/g, "")}` : "#";

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <section id="contact" className="py-20 md:py-28 bg-cream">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="badge">تواصل معنا</span>
          <h2 className="section-title mt-4">جاهزون للإجابة على استفساراتك</h2>
          <p className="section-subtitle">
            أرسل لنا رسالة وسيقوم فريق صامل بالتواصل معك في أقرب وقت ممكن.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <aside className="lg:col-span-2 space-y-3">
            <InfoCard
              icon={<Phone size={18} />}
              title="اتصل بنا"
              value={info.phone || "—"}
              href={info.phone ? `tel:${info.phone.replace(/\s/g, "")}` : undefined}
            />
            <InfoCard
              icon={<MessageCircle size={18} />}
              title="واتساب"
              value={info.whatsapp || "—"}
              href={info.whatsapp ? wa : undefined}
              external
            />
            <InfoCard
              icon={<Mail size={18} />}
              title="البريد الإلكتروني"
              value={info.email || "—"}
              href={info.email ? `mailto:${info.email}` : undefined}
            />
            <InfoCard icon={<MapPin size={18} />} title="العنوان" value={info.address || "—"} />
            <InfoCard
              icon={<Clock size={18} />}
              title="ساعات العمل"
              value={info.working_hours || "—"}
            />
          </aside>

          <div className="lg:col-span-3">
            <form
              ref={formRef}
              action={formAction}
              className="rounded-3xl border border-navy-900/5 bg-white p-6 md:p-8 shadow-soft"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field name="name" label="الاسم الكامل" placeholder="اسمك الكامل" required />
                <Field
                  name="email"
                  type="email"
                  label="البريد الإلكتروني"
                  placeholder="you@example.com"
                  required
                />
                <Field name="phone" label="رقم الجوال" placeholder="+966 5X XXX XXXX" />
                <Field name="subject" label="الموضوع" placeholder="موضوع رسالتك" />
              </div>
              <div className="mt-4">
                <label htmlFor="body" className="mb-1.5 block text-sm font-medium text-navy-900">
                  الرسالة <span className="text-gold-600">*</span>
                </label>
                <textarea
                  id="body"
                  name="body"
                  rows={5}
                  required
                  className="input resize-y"
                  placeholder="كيف يمكننا مساعدتك؟"
                />
              </div>

              {state.status === "success" && (
                <Banner tone="success" icon={<CheckCircle2 size={18} />}>
                  {state.message}
                </Banner>
              )}
              {state.status === "error" && (
                <Banner tone="error" icon={<AlertCircle size={18} />}>
                  {state.message}
                </Banner>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted">سيتم استخدام بياناتك للرد على استفسارك فقط.</p>
                <SubmitButton />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="input"
      />
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-navy-900/5 bg-white p-5 shadow-soft transition hover:border-gold-500/30">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-600">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium uppercase tracking-wider text-muted">{title}</div>
        <div className="mt-0.5 truncate text-sm font-semibold text-navy-900">{value}</div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="block"
      >
        {inner}
      </a>
    );
  }
  return inner;
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "جاري الإرسال..." : "إرسال الرسالة"}
      <Send size={16} />
    </button>
  );
}
