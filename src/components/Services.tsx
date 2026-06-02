import {
  Building2,
  KeyRound,
  Wrench,
  Users,
  TrendingUp,
  Gavel,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "بيع وشراء",
    desc: "تجربة سلسة لعرض العقارات وإتمام عمليات البيع والشراء بسهولة.",
  },
  {
    icon: KeyRound,
    title: "التأجير",
    desc: "إدارة عمليات التأجير ومتابعة الطلبات والعقود.",
  },
  {
    icon: Wrench,
    title: "إدارة الأملاك",
    desc: "إدارة العقارات والصيانة والعقود والمستأجرين من مكان واحد.",
  },
  {
    icon: Users,
    title: "إدارة اتحاد ملاك",
    desc: "تنظيم أعمال اتحاد الملاك ومتابعة الاجتماعات والاشتراكات والخدمات.",
  },
  {
    icon: TrendingUp,
    title: "التطوير العقاري",
    desc: "متابعة المشاريع العقارية وتحليل الأداء وإدارة التنفيذ.",
  },
  {
    icon: Gavel,
    title: "إدارة المزايدات العقارية",
    desc: "إدارة المزايدات العقارية بشكل رقمي منظم وشفاف.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-cream">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="badge">خدماتنا</span>
          <h2 className="section-title mt-4">حلول عقارية شاملة في منصة واحدة</h2>
          <p className="section-subtitle">
            مجموعة متكاملة من الأدوات والخدمات لتلبية احتياجات الأفراد والشركات في القطاع العقاري.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="card group">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-100 to-gold-50 text-gold-600 group-hover:from-gold-500 group-hover:to-gold-400 group-hover:text-white transition">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
