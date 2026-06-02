"use server";

import { insertMessage } from "@/lib/db";
import { revalidatePath } from "next/cache";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export async function submitContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const body = String(formData.get("body") || "").trim();

  if (!name || !email || !body) {
    return { status: "error", message: "يرجى تعبئة الاسم والبريد الإلكتروني والرسالة." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "البريد الإلكتروني غير صحيح." };
  }
  if (body.length > 5000) {
    return { status: "error", message: "الرسالة طويلة جداً (الحد الأقصى 5000 حرف)." };
  }

  try {
    insertMessage({ name, email, phone, subject, body });
    revalidatePath("/admin/messages");
    return { status: "success", message: "تم استلام رسالتك بنجاح. سنقوم بالتواصل معك قريباً." };
  } catch (err) {
    console.error(err);
    return { status: "error", message: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى." };
  }
}
