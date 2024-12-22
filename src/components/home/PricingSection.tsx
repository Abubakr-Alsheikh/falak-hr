import React from "react";
import SectionTitle from "../SectionTitle";
import TextContent from "../TextContent";
import PlanCard from "../PlanCard";

const PricingSection: React.FC = () => {
  return (
    <div className="my-8">
      <SectionTitle title="أسعار باقات الإشتراك" />
      <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />
      <div className="my-8 grid grid-cols-3 gap-6">
        <PlanCard
          title="عنوان"
          price="$50/mo"
          features={[
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
          ]}
          buttonText="أشترك"
        />
        <PlanCard
          title="عنوان"
          price="$50/mo"
          features={[
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
          ]}
          buttonText="أشترك"
        />
        <PlanCard
          title="عنوان"
          price="$50/mo"
          features={[
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
            "عنصر القائمة",
          ]}
          buttonText="أشترك"
        />
      </div>
    </div>
  );
};

export default PricingSection;