import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import bcrypt from "bcryptjs";

// SQLite lives at <repo>/src/data/samel.db
const DATA_DIR = path.join(process.cwd(), "src", "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, "samel.db");

// Singleton — Next.js dev hot-reloads modules, so cache on globalThis.
declare global {
  // eslint-disable-next-line no-var
  var __samelDb: Database.Database | undefined;
}

function createDb(): Database.Database {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contact_info (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      phone TEXT,
      whatsapp TEXT,
      email TEXT,
      address TEXT,
      working_hours TEXT,
      twitter TEXT,
      instagram TEXT,
      linkedin TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new', -- new | read | replied
      reply_body TEXT,
      replied_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed default admin if none exists.
  const count = (db.prepare("SELECT COUNT(*) as c FROM admins").get() as { c: number }).c;
  if (count === 0) {
    const username = process.env.DEFAULT_ADMIN_USERNAME || "admin";
    const password = process.env.DEFAULT_ADMIN_PASSWORD || "Samel@2026";
    const hash = bcrypt.hashSync(password, 10);
    db.prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)").run(username, hash);
    // eslint-disable-next-line no-console
    console.log(`[samel] Seeded default admin user "${username}". Change the password from the admin panel.`);
  }

  // Seed contact_info row.
  const info = db.prepare("SELECT id FROM contact_info WHERE id = 1").get();
  if (!info) {
    db.prepare(
      `INSERT INTO contact_info (id, phone, whatsapp, email, address, working_hours, twitter, instagram, linkedin)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      "+966 5X XXX XXXX",
      "+966 5X XXX XXXX",
      "info@samel.sa",
      "الرياض، المملكة العربية السعودية",
      "الأحد - الخميس: 9:00 ص - 6:00 م",
      "https://twitter.com/",
      "https://instagram.com/",
      "https://linkedin.com/",
    );
  }

  return db;
}

export function getDb(): Database.Database {
  if (!globalThis.__samelDb) globalThis.__samelDb = createDb();
  return globalThis.__samelDb;
}

// ---------- Typed helpers ----------
export type ContactInfo = {
  id: number;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  working_hours: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  updated_at: string;
};

export type MessageRow = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  body: string;
  status: "new" | "read" | "replied";
  reply_body: string | null;
  replied_at: string | null;
  created_at: string;
};

export function getContactInfo(): ContactInfo {
  return getDb().prepare("SELECT * FROM contact_info WHERE id = 1").get() as ContactInfo;
}

export function updateContactInfo(input: Partial<Omit<ContactInfo, "id" | "updated_at">>) {
  const db = getDb();
  const current = getContactInfo();
  const merged = { ...current, ...input };
  db.prepare(
    `UPDATE contact_info SET
       phone = ?, whatsapp = ?, email = ?, address = ?, working_hours = ?,
       twitter = ?, instagram = ?, linkedin = ?, updated_at = datetime('now')
     WHERE id = 1`,
  ).run(
    merged.phone,
    merged.whatsapp,
    merged.email,
    merged.address,
    merged.working_hours,
    merged.twitter,
    merged.instagram,
    merged.linkedin,
  );
}

export function listMessages(): MessageRow[] {
  return getDb().prepare("SELECT * FROM messages ORDER BY created_at DESC").all() as MessageRow[];
}

export function getMessage(id: number): MessageRow | undefined {
  return getDb().prepare("SELECT * FROM messages WHERE id = ?").get(id) as MessageRow | undefined;
}

export function insertMessage(input: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  body: string;
}) {
  return getDb()
    .prepare(
      `INSERT INTO messages (name, email, phone, subject, body) VALUES (?, ?, ?, ?, ?)`,
    )
    .run(input.name, input.email, input.phone || null, input.subject || null, input.body);
}

export function markMessageRead(id: number) {
  getDb().prepare(`UPDATE messages SET status = 'read' WHERE id = ? AND status = 'new'`).run(id);
}

export function saveReply(id: number, replyBody: string) {
  getDb()
    .prepare(
      `UPDATE messages SET status = 'replied', reply_body = ?, replied_at = datetime('now') WHERE id = ?`,
    )
    .run(replyBody, id);
}

export function countNewMessages(): number {
  return (getDb().prepare(`SELECT COUNT(*) AS c FROM messages WHERE status = 'new'`).get() as { c: number }).c;
}
