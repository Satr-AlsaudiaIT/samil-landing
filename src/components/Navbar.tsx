"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#about", label: "من نحن" },
  { href: "#services", label: "خدماتنا" },
  { href: "#contact", label: "تواصل معنا" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-navy-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="#home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="btn-ghost">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="btn-primary">
            ابدأ الآن
          </a>
        </div>

        <button
          aria-label="القائمة"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/10 bg-white text-navy-900"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-navy-900/5 bg-white">
          <div className="container-x py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-navy-900 hover:bg-navy-50"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary mt-2" onClick={() => setOpen(false)}>
              ابدأ الآن
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
