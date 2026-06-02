# صامل — Landing Page + Admin Dashboard

Saudi real estate platform landing page built with **Next.js 14 (App Router)**, **TailwindCSS**, and **SQLite (better-sqlite3)**. Includes a protected admin dashboard for editing site contact info and replying to client messages via SMTP email.

---

## Tech Stack

- **Next.js 14** (App Router, Server Components, Server Actions)
- **TypeScript**
- **TailwindCSS** (RTL, gold + navy brand palette)
- **SQLite** via `better-sqlite3` (file: `data/samel.db`, auto-created on first run)
- **bcryptjs** for password hashing
- **nodemailer** for SMTP email replies
- **lucide-react** for icons

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env template (a working .env.local is already included for dev)
cp .env.example .env.local
# then edit .env.local — fill in SMTP_USER / SMTP_PASS to enable email replies

# 3. Run the dev server
npm run dev
```

Open <http://localhost:3000> for the landing page and <http://localhost:3000/admin/login> for the admin panel.

---

## Default Admin Credentials

These are seeded the **first time** the database is created (i.e., the first run). Change them immediately from the admin **Settings** page.

| Field    | Value         |
|----------|---------------|
| Username | `admin`       |
| Password | `Samel@2026`  |

> These come from `DEFAULT_ADMIN_USERNAME` / `DEFAULT_ADMIN_PASSWORD` in `.env.local`. If you want different initial credentials, change them before the first `npm run dev` (or delete `data/samel.db` to re-seed).

---

## Environment Variables

See `.env.example` for the full list.

| Variable                  | Required        | Description |
|---------------------------|-----------------|-------------|
| `SESSION_SECRET`          | ✅              | Used to sign the admin session cookie. Make it long and random in production. |
| `DEFAULT_ADMIN_USERNAME`  | only on seed    | Initial admin username (default: `admin`). |
| `DEFAULT_ADMIN_PASSWORD`  | only on seed    | Initial admin password (default: `Samel@2026`). |
| `SMTP_HOST`               | for email reply | e.g., `smtp.gmail.com`, `smtp.zoho.com`, etc. |
| `SMTP_PORT`               | for email reply | Usually `587` (STARTTLS) or `465` (SSL). |
| `SMTP_SECURE`             | for email reply | `true` for port 465, `false` for 587. |
| `SMTP_USER`               | for email reply | SMTP login. |
| `SMTP_PASS`               | for email reply | SMTP password / app password. |
| `SMTP_FROM`               | for email reply | Sender display name + email, e.g. `"Samel <no-reply@samel.sa>"`. |

### Gmail example
1. Enable 2-Step Verification on your Google account.
2. Create an **App Password** at <https://myaccount.google.com/apppasswords>.
3. Set:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-address@gmail.com
   SMTP_PASS=<the 16-char app password>
   SMTP_FROM="Samel <your-address@gmail.com>"
   ```

---

## Routes

### Public
- `/` — Landing page (Hero, About, Services, Vision, Contact, Footer)
- The contact form posts to a **server action** (`submitContactMessage`) and stores the message in SQLite.

### Admin (cookie-protected by middleware)
- `/admin/login` — login form
- `/admin` — dashboard with stats + recent messages
- `/admin/messages` — full inbox with filters (new/read/replied), per-message reply form
- `/admin/settings` — edit landing-page contact info + change admin password

All admin mutations are **server actions** (in `src/app/actions/admin.ts`). The landing page reads contact info **server-side** (`getContactInfo()` in `src/lib/db.ts`) on every request (`force-dynamic`), so edits in the admin panel show up immediately.

---

## Project Layout

```
samel-landing/
├── data/                     # SQLite db lives here (created at runtime)
├── public/logo.svg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx        # root (RTL, Arabic font)
│   │   ├── page.tsx          # landing page (server)
│   │   ├── actions/
│   │   │   ├── contact.ts    # public contact form action
│   │   │   └── admin.ts      # all admin server actions
│   │   └── admin/
│   │       ├── layout.tsx    # sidebar shell, renders only when authed
│   │       ├── login/page.tsx
│   │       ├── page.tsx
│   │       ├── messages/page.tsx
│   │       └── settings/page.tsx
│   ├── components/
│   │   ├── Logo.tsx, Navbar.tsx, Hero.tsx, About.tsx,
│   │   ├── Services.tsx, Vision.tsx, Contact.tsx, Footer.tsx
│   │   └── admin/
│   │       ├── Sidebar.tsx
│   │       ├── MessagesList.tsx
│   │       ├── ReplyForm.tsx
│   │       ├── SettingsForm.tsx
│   │       └── PasswordForm.tsx
│   ├── lib/
│   │   ├── db.ts             # better-sqlite3 + schema + helpers
│   │   ├── auth.ts           # cookie sessions + bcrypt
│   │   └── mailer.ts         # nodemailer SMTP
│   └── middleware.ts         # protects /admin/*
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## Database Schema

`data/samel.db` is created automatically with these tables:

- `admins` — username + bcrypt password hash
- `contact_info` — single-row (id=1) site contact fields
- `messages` — name, email, phone, subject, body, status (`new` / `read` / `replied`), reply_body, replied_at
- `sessions` — id, admin_id, expires_at (cookie sessions)

---

## Production Build

```bash
npm run build
npm run start
```

Set a strong `SESSION_SECRET` and real SMTP credentials in production. Persist the `data/` directory (SQLite file lives there).

---

## Notes

- The site is fully **RTL** and uses the **IBM Plex Sans Arabic** font.
- The landing page contact info is rendered server-side, so any change in `/admin/settings` is visible on the next request.
- Reply emails are sent via Nodemailer using the SMTP credentials in `.env.local`. If SMTP isn't configured, replying will show an Arabic error inline (the message itself is still saved).
