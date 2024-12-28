import React from "react";
import SectionTitle from "../SectionTitle";
import TextContent from "../TextContent";
import PricingCard from "../PlanCard";

const PricingSection: React.FC = () => {
  const plans = [
    {
      title: "الباقة الاساسية",
      subtitle: "احتساب الموظفين في نطاقات",
      price: "99 ريال",
      features: [
        "احتساب الموظفين في نطاقات",
        "تقارير الحضور و الانصراف",
        "تقارير الاداء والمهام المنجزة",
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
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <SectionTitle title="أسعار باقات الإشتراك" center={true} />
        <TextContent
          text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
          center={true}
        />
        <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-5">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
