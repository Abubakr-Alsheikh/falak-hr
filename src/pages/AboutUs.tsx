import React from "react";
import AboutUsTitle from "../components/about/AboutUsTitle";
import AboutUsContent from "../components/about/AboutUsContent";
import CeoMessage from "../components/about/CeoMessage";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto mt-32">
      <AboutUsTitle />
      <CeoMessage
        ceoName="اسم الرئيس التنفيذي"
        ceoTitle="الرئيس التنفيذي"
        message="مرحباً بكم في فلك للموارد البشرية. نفخر بالرحلة التي قطعناها والإنجازات التي حققناها. رؤيتنا واضحة وهدفنا ثابت نحو تقديم الأفضل دائماً."
      />
      <AboutUsContent />
    </div>
  );
};

export default AboutUs;
