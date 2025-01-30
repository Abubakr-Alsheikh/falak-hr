import React from "react";
import PricingCard from "@/components/public/PlanCard";
import HeaderSection from "@/components/public/HeaderSection";
import FadeIn from "@components/animations/FadeIn";
import ScaleUp from "@components/animations/ScaleUp";

const PricingSection: React.FC = () => {
  const plans = [
    {
      title: "الباقة الأساسية",
      subtitle: "ابدأ رحلتك في إدارة الموارد البشرية بكفاءة وايجاد الحلول.",
      price: "99/ريال",
      features: [
        "احتساب الموظفين في نطاقات",
        "تقارير الحضور و الانصراف",
        "تقارير الاداء والمهام المنجزة",
      ],
      buttonText: "أشترك",
    },
    {
      title: "الباقة الفضية",
      subtitle: "عزز قدرات فريقك مع تدريب متخصص وتطوير الأداء.",
      price: "249/ريال",
      features: [
        "كل تفاصيل الباقة الاساسية",
        "تدريب تنمية القدرات",
        "تقارير ساعات تدريب القدرات",
      ],
      buttonText: "أشترك",
    },
    {
      title: "الباقة الذهبية",
      subtitle: "حلول شاملة لإدارة الموارد البشرية مع دعم متكامل.",
      price: "499/ريال",
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
            text="اختر الباقة التي تناسب احتياجاتك. نقدم لك مجموعة متنوعة من الخيارات المصممة خصيصًا لدعم نمو أعمالك وتحقيق أهدافك في إدارة الموارد البشرية."
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
