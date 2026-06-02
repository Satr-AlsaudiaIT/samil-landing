import Link from "next/link";
import { listMessages, getContactInfo, countNewMessages } from "@/lib/db";
import { Inbox, MailCheck, Mail, Settings, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const msgs = listMessages();
  const newCount = countNewMessages();
  const repliedCount = msgs.filter((m) => m.status === "replied").length;
  const info = getContactInfo();
  const recent = msgs.slice(0, 5);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy-900">نظرة عامة</h1>
        <p className="mt-1 text-sm text-muted">ملخص رسائل العملاء وحالة المنصة.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<Mail size={20} />} value={msgs.length} label="إجمالي الرسائل" tone="navy" />
        <StatCard icon={<Inbox size={20} />} value={newCount} label="رسائل جديدة" tone="gold" />
        <StatCard
          icon={<MailCheck size={20} />}
          value={repliedCount}
          label="تم الرد عليها"
          tone="emerald"
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-navy-900/5 bg-white p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-navy-900">أحدث الرسائل</h2>
            <Link
              href="/admin/messages"
              className="inline-flex items-center gap-1 text-sm font-medium text-gold-700 hover:text-gold-600"
            >
              عرض الكل <ArrowLeft size={14} />
            </Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-muted">لا توجد رسائل بعد.</p>
          ) : (
            <ul className="divide-y divide-navy-900/5">
              {recent.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/admin/messages#msg-${m.id}`}
                    className="flex items-center justify-between gap-3 py-3 hover:bg-cream rounded-lg px-2"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-navy-900">{m.name}</div>
                      <div className="truncate text-xs text-muted">
                        {m.subject || "بدون عنوان"} — {m.email}
                      </div>
                    </div>
                    <StatusPill status={m.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gold-50 text-gold-600">
              <Settings size={18} />
            </div>
            <h2 className="text-lg font-bold text-navy-900">بيانات التواصل الحالية</h2>
          </div>
          <dl className="space-y-2 text-sm">
            <Row label="الهاتف" value={info.phone} />
            <Row label="واتساب" value={info.whatsapp} />
            <Row label="البريد" value={info.email} />
            <Row label="العنوان" value={info.address} />
          </dl>
          <Link
            href="/admin/settings"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gold-700 hover:text-gold-600"
          >
            تحديث البيانات <ArrowLeft size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  tone: "navy" | "gold" | "emerald";
}) {
  const map = {
    navy: "bg-navy-50 text-navy-700",
    gold: "bg-gold-50 text-gold-700",
    emerald: "bg-emerald-50 text-emerald-700",
  } as const;
  return (
    <div className="rounded-2xl border border-navy-900/5 bg-white p-5 shadow-soft">
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${map[tone]}`}>{icon}</div>
        <div>
          <div className="text-2xl font-bold text-navy-900">{value}</div>
          <div className="text-xs text-muted">{label}</div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "new" | "read" | "replied" }) {
  const map = {
    new: { label: "جديد", cls: "bg-gold-100 text-gold-700" },
    read: { label: "مقروء", cls: "bg-navy-50 text-navy-700" },
    replied: { label: "تم الرد", cls: "bg-emerald-50 text-emerald-700" },
  } as const;
  const m = map[status];
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${m.cls}`}>
      {m.label}
    </span>
  );
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="truncate font-medium text-navy-900">{value || "—"}</dd>
    </div>
  );
}
