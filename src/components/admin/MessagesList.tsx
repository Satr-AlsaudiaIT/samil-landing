"use client";

import { useState } from "react";
import type { MessageRow } from "@/lib/db";
import { Mail, Phone, Clock, ChevronDown, ChevronUp, Inbox } from "lucide-react";
import { markMessageReadAction } from "@/app/actions/admin";
import { ReplyForm } from "./ReplyForm";

type Filter = "all" | "new" | "read" | "replied";

export function MessagesList({ messages }: { messages: MessageRow[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<number | null>(messages.find((m) => m.status === "new")?.id ?? null);

  const counts = {
    all: messages.length,
    new: messages.filter((m) => m.status === "new").length,
    read: messages.filter((m) => m.status === "read").length,
    replied: messages.filter((m) => m.status === "replied").length,
  };

  const filtered = filter === "all" ? messages : messages.filter((m) => m.status === filter);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {(["all", "new", "read", "replied"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? "bg-navy-900 text-white"
                : "bg-white border border-navy-900/10 text-navy-900 hover:bg-navy-50"
            }`}
          >
            {labelFor(f)} <span className="opacity-60">({counts[f]})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="space-y-3">
          {filtered.map((m) => {
            const open = openId === m.id;
            return (
              <li
                key={m.id}
                id={`msg-${m.id}`}
                className="overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-soft"
              >
                <button
                  onClick={() => {
                    const next = open ? null : m.id;
                    setOpenId(next);
                    if (!open && m.status === "new") {
                      // Mark as read on open.
                      const fd = new FormData();
                      fd.set("id", String(m.id));
                      markMessageReadAction(fd);
                    }
                  }}
                  className="w-full text-right p-5 flex items-center gap-4 hover:bg-cream transition"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-700 font-bold">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold text-navy-900">{m.name}</span>
                      <StatusPill status={m.status} />
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted">
                      {m.subject || "بدون عنوان"} — {m.email}
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-muted">
                    <Clock size={12} />
                    {formatDate(m.created_at)}
                  </span>
                  {open ? <ChevronUp size={18} className="text-muted" /> : <ChevronDown size={18} className="text-muted" />}
                </button>

                {open && (
                  <div className="border-t border-navy-900/5 bg-cream/40 p-5 space-y-5">
                    <dl className="grid gap-3 sm:grid-cols-3 text-sm">
                      <Field icon={<Mail size={14} />} label="البريد">
                        <a className="text-gold-700 hover:underline" href={`mailto:${m.email}`}>
                          {m.email}
                        </a>
                      </Field>
                      {m.phone && (
                        <Field icon={<Phone size={14} />} label="الجوال">
                          <a className="text-navy-900" href={`tel:${m.phone}`}>
                            {m.phone}
                          </a>
                        </Field>
                      )}
                      <Field icon={<Clock size={14} />} label="تاريخ الإرسال">
                        <span className="text-navy-900">{formatDate(m.created_at)}</span>
                      </Field>
                    </dl>

                    <div>
                      <div className="text-xs font-medium uppercase tracking-wider text-muted">نص الرسالة</div>
                      <div className="mt-2 whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-relaxed text-navy-900 border border-navy-900/5">
                        {m.body}
                      </div>
                    </div>

                    {m.status === "replied" && m.reply_body && (
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-emerald-700">
                          الرد المُرسَل ({formatDate(m.replied_at || "")})
                        </div>
                        <div className="mt-2 whitespace-pre-wrap rounded-xl bg-emerald-50/50 p-4 text-sm leading-relaxed text-navy-900 border border-emerald-200/50">
                          {m.reply_body}
                        </div>
                      </div>
                    )}

                    <ReplyForm messageId={m.id} alreadyReplied={m.status === "replied"} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-navy-900/10 bg-white p-16 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-navy-50 text-navy-700">
        <Inbox size={22} />
      </div>
      <p className="mt-4 font-semibold text-navy-900">لا توجد رسائل ضمن هذا التصفية</p>
      <p className="mt-1 text-sm text-muted">ستظهر الرسائل هنا عند ورودها من نموذج التواصل.</p>
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
  return <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${m.cls}`}>{m.label}</span>;
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 text-sm">{children}</dd>
    </div>
  );
}

function labelFor(f: Filter) {
  return f === "all" ? "الكل" : f === "new" ? "جديد" : f === "read" ? "مقروء" : "تم الرد";
}

function formatDate(s: string) {
  if (!s) return "";
  try {
    const d = new Date(s.replace(" ", "T") + "Z");
    return d.toLocaleString("ar-SA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return s;
  }
}
