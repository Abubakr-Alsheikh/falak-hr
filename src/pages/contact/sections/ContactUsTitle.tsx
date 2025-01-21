import React from "react";
import SectionTitle from "../../../components/SectionTitle";
import FadeIn from "../../../components/animations/FadeIn";

const ContactUsTitle: React.FC = () => {
  return (
    <FadeIn direction="up">
      <SectionTitle
        title="اتصل بنا"
        center={true}
        isHeader={true}
        subtitle="يسعدنا تواصلك معنا."
      />
    </FadeIn>
  );
};

export default ContactUsTitle;
