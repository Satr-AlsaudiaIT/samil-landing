import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "صامل | حلول عقارية رقمية متكاملة",
  description:
    "منصة سعودية متخصصة في تقديم حلول عقارية رقمية متكاملة لإدارة وبيع وتأجير العقارات بسهولة واحترافية.",
  keywords: [
    "صامل",
    "عقارات",
    "السعودية",
    "إدارة عقارات",
    "تأجير",
    "بيع وشراء",
    "نفاذ",
  ],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
