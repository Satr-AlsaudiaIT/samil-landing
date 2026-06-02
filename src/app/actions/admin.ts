"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { login, logout, requireAdmin, changePassword } from "@/lib/auth";
import {
  getMessage,
  markMessageRead,
  saveReply,
  updateContactInfo,
} from "@/lib/db";
import { sendReplyEmail } from "@/lib/mailer";

// -------- Auth --------
export type LoginState = { status: "idle" } | { status: "error"; message: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  if (!username || !password) return { status: "error", message: "يرجى إدخال اسم المستخدم وكلمة المرور." };
  const res = await login(username, password);
  if (!res.ok) return { status: "error", message: res.error };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// -------- Contact info --------
export type SettingsState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function updateContactInfoAction(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  try {
    updateContactInfo({
      phone: String(formData.get("phone") || "").trim() || null,
      whatsapp: String(formData.get("whatsapp") || "").trim() || null,
      email: String(formData.get("email") || "").trim() || null,
      address: String(formData.get("address") || "").trim() || null,
      working_hours: String(formData.get("working_hours") || "").trim() || null,
      twitter: String(formData.get("twitter") || "").trim() || null,
      instagram: String(formData.get("instagram") || "").trim() || null,
      linkedin: String(formData.get("linkedin") || "").trim() || null,
    });
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { status: "success", message: "تم حفظ بيانات التواصل بنجاح." };
  } catch (err) {
    console.error(err);
    return { status: "error", message: "تعذّر حفظ البيانات. حاول مجدداً." };
  }
}

// -------- Messages --------
export async function markMessageReadAction(formData: FormData) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    markMessageRead(id);
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
  }
}

export type ReplyState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function replyToMessageAction(
  _prev: ReplyState,
  formData: FormData,
): Promise<ReplyState> {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }

  const id = Number(formData.get("id"));
  const replyBody = String(formData.get("reply_body") || "").trim();
  if (!Number.isFinite(id) || !replyBody) {
    return { status: "error", message: "يرجى كتابة نص الرد." };
  }

  const msg = getMessage(id);
  if (!msg) return { status: "error", message: "الرسالة غير موجودة." };

  try {
    await sendReplyEmail({
      to: msg.email,
      subject: msg.subject ? `Re: ${msg.subject}` : "رد من فريق صامل",
      text: replyBody,
      inReplyToBody: msg.body,
    });
    saveReply(id, replyBody);
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
    return { status: "success", message: `تم إرسال الرد إلى ${msg.email}.` };
  } catch (err) {
    console.error(err);
    const message =
      err instanceof Error ? err.message : "تعذّر إرسال البريد الإلكتروني.";
    return { status: "error", message };
  }
}

// -------- Password --------
export type PasswordState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function changePasswordAction(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  let admin: { id: number; username: string };
  try {
    admin = await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  const newPassword = String(formData.get("new_password") || "");
  const confirm = String(formData.get("confirm_password") || "");
  if (newPassword.length < 8) return { status: "error", message: "يجب أن لا تقل كلمة المرور عن 8 أحرف." };
  if (newPassword !== confirm) return { status: "error", message: "كلمتا المرور غير متطابقتين." };

  await changePassword(admin.username, newPassword);
  return { status: "success", message: "تم تحديث كلمة المرور." };
}
