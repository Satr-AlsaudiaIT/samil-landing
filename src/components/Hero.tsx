import { ArrowLeft, MessageCircle, Sparkles } from "lucide-react";

export function Hero({ whatsapp }: { whatsapp: string | null }) {
  const wa = whatsapp ? `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}` : "#contact";
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/30" />


      <div className="container-x relative pt-24 pb-28 md:pt-32 md:pb-36">
        <div className="relative z-10 max-w-3xl">
          <span className="badge bg-white/10 text-white border-white/20">
            <Sparkles size={14} />
            منصة سعودية رقمية متكاملة
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
            صامل
          </h1>

          <p className="mt-4 text-lg md:text-xl font-semibold text-slate-200/90 leading-relaxed">
            منصة سعودية توحد خدمات القطاع العقاري للأفراد والشركات تحت نظام رقمي متكامل
          </p>

          <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed max-w-xl">
            نوفر تجربة موحدة تشمل بيع وشراء وتأجير وإدارة العقارات وتقييمها بدقة، من خلال أدوات
            متقدمة لإدارة المشاريع ومتابعة الصيانة وتحليل الأداء العقاري.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary shadow-glow">
              ابدأ الآن
              <ArrowLeft size={16} />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary bg-transparent text-white border-white/20 hover:bg-white/15 hover:border-white/30"
            >
              <MessageCircle size={16} />
              تواصل واتساب
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat value="+6" label="خدمات عقارية" />
            <Stat value="24/7" label="دعم متواصل" />
            <Stat value="100%" label="رقمي ومتكامل" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-cyan-900/30 p-5">
      <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm md:text-base text-slate-300">{label}</div>
    </div>
  );
}
