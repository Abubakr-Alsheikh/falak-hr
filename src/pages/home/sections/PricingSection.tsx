import React from "react";
import PricingCard from "../../../components/PlanCard";
import HeaderSection from "../../../components/HeaderSection";
import FadeIn from "../../../components/animations/FadeIn";
import ScaleUp from "../../../components/animations/ScaleUp";

const PricingSection: React.FC = () => {
  const plans = [
    {
      title: "الباقة الاساسية",
      subtitle: "احتساب الموظفين في نطاقات",
      price: "99 ريال",
      features: [
        "احتساب الموظفين في نطاقات",
        "تقارير الحضور و الانصراف",
        "تقارير الاداء والمهام المنجزة",
      ],
      buttonText: "أشترك",
    },
    {
      title: "الباقة الفضية",
      subtitle: "كل تفاصيل الباقة الاساسية بالاضافة ل",
      price: "249 ريال",
      features: [
        "كل تفاصيل الباقة الاساسية",
        "تدريب تنمية القدرات",
        "تقارير ساعات تدريب القدرات",
      ],
      buttonText: "أشترك",
    },
    {
      title: "الباقة الذهبية",
      subtitle: "بالاضافة لخدمات الباقة الفضية",
      price: "499 ريال",
      features: [
        "بالاضافة لخدمات الباقة الفضية",
        "ادارة كاملة لعملية التوظيف",
        "تعيين مدير حساب المنشأة",
        "استشارات",
        "تنبيهات استباقية",
      ],
      buttonText: "أشترك",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto mb-16 max-w-screen-xl px-4 lg:px-6">
        <FadeIn direction="up">
          <HeaderSection
            title="أسعار باقات الإشتراك"
            text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
          />
        </FadeIn>
        <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-5">
          {plans.map((plan, index) => (
            <ScaleUp key={index} delay={index * 0.3}>
              <PricingCard
                key={index}
                title={plan.title}
                subtitle={plan.subtitle}
                price={plan.price}
                features={plan.features}
                buttonText={plan.buttonText}
              />
            </ScaleUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
