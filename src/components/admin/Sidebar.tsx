"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LayoutDashboard, Inbox, Settings, LogOut } from "lucide-react";
import { logoutAction } from "@/app/actions/admin";

const items = [
  { href: "/admin", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/messages", label: "الرسائل", icon: Inbox },
  { href: "/admin/settings", label: "بيانات التواصل", icon: Settings },
];

export function Sidebar({ username, newCount }: { username: string; newCount: number }) {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-l border-navy-900/5 bg-white">
      <div className="p-5 border-b border-navy-900/5">
        <Link href="/admin">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 p-3">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`mb-1 flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-gold-50 text-gold-700"
                  : "text-navy-900/80 hover:bg-navy-50 hover:text-navy-900"
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                {label}
              </span>
              {href === "/admin/messages" && newCount > 0 && (
                <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {newCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-navy-900/5 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 text-sm font-bold text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-navy-900">{username}</div>
            <div className="text-xs text-muted">مدير النظام</div>
          </div>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-navy-900/10 px-3 py-2 text-sm font-medium text-navy-900 hover:bg-navy-50"
          >
            <LogOut size={16} />
            تسجيل الخروج
          </button>
        </form>
      </div>
    </aside>
  );
}
