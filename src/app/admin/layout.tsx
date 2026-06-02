import { getCurrentAdmin } from "@/lib/auth";
import { countNewMessages } from "@/lib/db";
import { Sidebar } from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

/**
 * Admin layout strategy:
 * - Middleware already redirects unauthenticated visits to /admin/* (except /admin/login)
 *   to /admin/login, and redirects authenticated visits to /admin/login → /admin.
 * - So when this layout runs:
 *     • If admin === null, the request is for /admin/login → render children only.
 *     • If admin !== null, wrap with the sidebar shell.
 *   This avoids any pathname inspection and prevents redirect loops.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();

  if (!admin) return <>{children}</>;

  const newCount = countNewMessages();
  return (
    <div dir="rtl" className="min-h-screen bg-cream flex">
      <Sidebar username={admin.username} newCount={newCount} />
      <div className="flex-1 min-w-0">
        <div className="container-x py-8 md:py-10">{children}</div>
      </div>
    </div>
  );
}
