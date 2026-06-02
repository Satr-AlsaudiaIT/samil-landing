"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { replyToMessageAction, type ReplyState } from "@/app/actions/admin";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const initial: ReplyState = { status: "idle" };

export function ReplyForm({ messageId, alreadyReplied }: { messageId: number; alreadyReplied: boolean }) {
  const [state, action] = useFormState(replyToMessageAction, initial);
  const [body, setBody] = useState("");

  useEffect(() => {
    if (state.status === "success") setBody("");
  }, [state.status]);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="id" value={messageId} />
      <div>
        <label htmlFor={`reply-${messageId}`} className="mb-1.5 block text-sm font-medium text-navy-900">
          {alreadyReplied ? "إرسال رد إضافي" : "كتابة الرد"}
        </label>
        <textarea
          id={`reply-${messageId}`}
          name="reply_body"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="input resize-y"
          placeholder="اكتب ردك هنا..."
          required
        />
      </div>

      {state.status === "success" && (
        <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}
      {state.status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5" />
          <span>{state.message}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">سيتم إرسال الرد عبر البريد الإلكتروني المُكوّن في SMTP.</p>
        <SubmitBtn />
      </div>
    </form>
  );
}

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
      {pending ? "جاري الإرسال..." : "إرسال الرد"}
      <Send size={14} />
    </button>
  );
}
