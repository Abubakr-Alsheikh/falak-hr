import React from "react";
import SectionTitle from "@/components/common/public/SectionTitle";
import FadeIn from "@components/animations/FadeIn";

const RemoteWorkTitle: React.FC = () => {
  return (
    <FadeIn direction="up">
      <SectionTitle
        title="العمل عن بعد"
        center={true}
        isHeader={true}
        subtitle="نظام يوفر لك المرونة والإنتاجية، ويدعم تطورك الوظيفي."
      />
    </FadeIn>
  );
};

export default RemoteWorkTitle;
