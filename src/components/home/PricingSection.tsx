import React from "react";
import SectionTitle from "../SectionTitle";
import TextContent from "../TextContent";
import PricingCard from "../PlanCard";
const PricingSection: React.FC = () => {
  const plans = [
    {
      title: "عنوان 1",
      subtitle:
        "نص أساسي لأي شيء تود قوله.",
      price: "$50/mo",
      features: [
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
      ],
      buttonText: "أشترك",
    },
    {
      title: "عنوان 2",
      subtitle:
        "نص أساسي لأي شيء تود قوله.",
      price: "$50/mo",
      features: [
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
      ],
      buttonText: "أشترك",
    },
    {
      title: "عنوان 3",
      subtitle:
        "نص أساسي لأي شيء تود قوله.",
      price: "$50/mo",
      features: [
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
        "عنصر القائمة",
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
