// src/pages/public/about/AboutUs.tsx
import React from "react";
import AboutUsTitle from "./sections/AboutUsTitle";
import CeoMessage from "./sections/CeoMessage";
import AboutUsContent from "./sections/AboutUsContent";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto mt-16">
      <AboutUsTitle />
      <CeoMessage ceoName="عبد العزيز النهدي" ceoTitle="الرئيس التنفيذي" />
      <AboutUsContent />
    </div>
  );
};

export default AboutUs;
