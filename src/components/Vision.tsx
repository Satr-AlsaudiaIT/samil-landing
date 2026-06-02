import { Sparkles } from "lucide-react";

export function Vision() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-navy-900/5 bg-white p-10 md:p-16 shadow-soft">
          <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-gold-100 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-navy-50 blur-3xl" aria-hidden />

          <div className="relative max-w-3xl">
            <span className="badge">
              <Sparkles size={14} />
              رؤيتنا
            </span>
            <h2 className="section-title mt-5 leading-snug">
              أن تكون <span className="text-gold-600">صامل</span> المنصة العقارية السعودية الرائدة
            </h2>
            <p className="section-subtitle">
              في تقديم حلول رقمية متكاملة للقطاع العقاري، عبر تجربة حديثة وموثوقة وسهلة الاستخدام.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
