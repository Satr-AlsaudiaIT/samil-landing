import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { getDb } from "./db";

const COOKIE_NAME = "samel_session";
const SESSION_TTL_DAYS = 7;

type SessionRow = { id: string; admin_id: number; expires_at: string };
type AdminRow = { id: number; username: string; password_hash: string };

export async function login(username: string, password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const db = getDb();
  const admin = db
    .prepare("SELECT id, username, password_hash FROM admins WHERE username = ?")
    .get(username.trim()) as AdminRow | undefined;
  if (!admin) return { ok: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
  const valid = bcrypt.compareSync(password, admin.password_hash);
  if (!valid) return { ok: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };

  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
  db.prepare("INSERT INTO sessions (id, admin_id, expires_at) VALUES (?, ?, ?)").run(sessionId, admin.id, expiresAt);

  cookies().set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
  return { ok: true };
}

export async function logout() {
  const sid = cookies().get(COOKIE_NAME)?.value;
  if (sid) {
    getDb().prepare("DELETE FROM sessions WHERE id = ?").run(sid);
    cookies().delete(COOKIE_NAME);
  }
}

export async function getCurrentAdmin(): Promise<{ id: number; username: string } | null> {
  const sid = cookies().get(COOKIE_NAME)?.value;
  if (!sid) return null;
  const db = getDb();
  const session = db.prepare("SELECT id, admin_id, expires_at FROM sessions WHERE id = ?").get(sid) as
    | SessionRow
    | undefined;
  if (!session) return null;
  if (new Date(session.expires_at).getTime() < Date.now()) {
    db.prepare("DELETE FROM sessions WHERE id = ?").run(sid);
    return null;
  }
  const admin = db
    .prepare("SELECT id, username FROM admins WHERE id = ?")
    .get(session.admin_id) as { id: number; username: string } | undefined;
  return admin || null;
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("UNAUTHENTICATED");
  return admin;
}

export async function changePassword(username: string, newPassword: string) {
  const hash = bcrypt.hashSync(newPassword, 10);
  getDb().prepare("UPDATE admins SET password_hash = ? WHERE username = ?").run(hash, username);
}
