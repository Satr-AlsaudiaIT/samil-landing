import { Target, Eye, CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="badge">من نحن</span>
          <h2 className="section-title mt-4">منصة سعودية لحلول عقارية رقمية متكاملة</h2>
          <p className="section-subtitle">
            صامل منصة سعودية متخصصة في تقديم حلول عقارية رقمية متكاملة تساعد الأفراد والشركات على
            إدارة وبيع وتأجير العقارات بطريقة أكثر سهولة واحترافية.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="card">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
              <Eye size={22} />
            </div>
            <h3 className="text-xl font-bold text-navy-900">رؤيتنا</h3>
            <p className="mt-3 leading-relaxed text-muted">
              أن نعيد تعريف التجربة العقارية الرقمية في المملكة العربية السعودية عبر منصة موحدة
              تجمع جميع الخدمات العقارية في مكان واحد.
            </p>
          </article>

          <article className="card">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-navy-700">
              <Target size={22} />
            </div>
            <h3 className="text-xl font-bold text-navy-900">أهدافنا</h3>
            <ul className="mt-3 space-y-2 text-muted">
              {[
                "تسهيل إدارة العقارات",
                "تحسين تجربة المستخدم",
                "رفع كفاءة العمليات العقارية",
                "توفير حلول رقمية حديثة",
              ].map((g) => (
                <li key={g} className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-500" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
