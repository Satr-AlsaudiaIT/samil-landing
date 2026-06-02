import { Logo } from "./Logo";
import { Mail, Phone, MapPin } from "lucide-react";
import type { ContactInfo } from "@/lib/db";

export function Footer({ info }: { info: ContactInfo }) {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="light" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              منصة سعودية متخصصة في تقديم حلول عقارية رقمية متكاملة تساعد الأفراد والشركات على
              إدارة وبيع وتأجير العقارات بسهولة واحترافية.
            </p>
            {/* <div className="mt-5 flex items-center gap-3">
              {info.twitter && (
                <SocialLink href={info.twitter} label="Twitter">
                  <Twitter size={16} />
                </SocialLink>
              )}
              {info.instagram && (
                <SocialLink href={info.instagram} label="Instagram">
                  <Instagram size={16} />
                </SocialLink>
              )}
              {info.linkedin && (
                <SocialLink href={info.linkedin} label="LinkedIn">
                  <Linkedin size={16} />
                </SocialLink>
              )}
            </div> */}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">روابط سريعة</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href="#home" className="hover:text-gold-300">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-gold-300">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold-300">
                  خدماتنا
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-300">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">معلومات التواصل</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {info.phone && (
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-gold-300" />
                  <a href={`tel:${info.phone.replace(/\s/g, "")}`} className="hover:text-gold-300">
                    {info.phone}
                  </a>
                </li>
              )}
              {info.email && (
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-gold-300" />
                  <a href={`mailto:${info.email}`} className="hover:text-gold-300">
                    {info.email}
                  </a>
                </li>
              )}
              {info.address && (
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 text-gold-300" />
                  <span>{info.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} صامل للتسويق العقاري. جميع الحقوق محفوظة.
          </p>
        
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-gold-400 hover:bg-gold-500/20 hover:text-gold-300"
    >
      {children}
    </a>
  );
}
