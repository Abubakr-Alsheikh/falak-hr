import React from "react";
import SectionTitle from "@/components/public/SectionTitle";
import FadeIn from "@components/animations/FadeIn";

const AboutUsTitle: React.FC = () => {
  return (
    <FadeIn direction="up">
      <SectionTitle
        title="من نحن"
        center={true}
        isHeader={true}
        subtitle="شريكك في تمكين العمل عن بعد."
      />
    </FadeIn>
  );
};

export default AboutUsTitle;
