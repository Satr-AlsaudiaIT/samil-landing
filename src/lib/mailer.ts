import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  if (!host || !user || !pass) {
    throw new Error("SMTP غير مُعد. يرجى ضبط SMTP_HOST, SMTP_USER, SMTP_PASS في ملف .env.local");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
  return transporter;
}

export async function sendReplyEmail(opts: {
  to: string;
  subject: string;
  text: string;
  inReplyToBody?: string;
}) {
  const t = getTransporter();
  const from = process.env.SMTP_FROM || `Samel <${process.env.SMTP_USER}>`;

  const html = `
    <div dir="rtl" style="font-family: -apple-system, Segoe UI, Tahoma, sans-serif; color:#0f172a; line-height:1.7;">
      <p style="white-space:pre-wrap;">${escapeHtml(opts.text)}</p>
      ${
        opts.inReplyToBody
          ? `<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
             <p style="color:#6b7280;font-size:13px;margin:0 0 6px;">— رسالتك الأصلية —</p>
             <blockquote style="margin:0;padding:8px 12px;border-right:3px solid #b8854a;background:#fbfaf7;color:#374151;white-space:pre-wrap;">${escapeHtml(
               opts.inReplyToBody,
             )}</blockquote>`
          : ""
      }
      <p style="margin-top:32px;color:#6b7280;font-size:13px;">— فريق صامل</p>
    </div>
  `;

  await t.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text + (opts.inReplyToBody ? `\n\n— رسالتك الأصلية —\n${opts.inReplyToBody}` : ""),
    html,
  });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
