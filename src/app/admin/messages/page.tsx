import { listMessages } from "@/lib/db";
import { MessagesList } from "@/components/admin/MessagesList";

export const dynamic = "force-dynamic";

export default function MessagesPage() {
  const messages = listMessages();
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-navy-900">رسائل العملاء</h1>
        <p className="mt-1 text-sm text-muted">
          عرض جميع الرسائل الواردة من نموذج التواصل والرد عليها عبر البريد الإلكتروني.
        </p>
      </header>
      <MessagesList messages={messages} />
    </div>
  );
}
