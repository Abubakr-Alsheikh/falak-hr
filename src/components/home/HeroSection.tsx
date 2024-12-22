import React from "react";
import TextContent from "../TextContent";
import Button from "../Button";
import { BsArrowLeft } from "react-icons/bs";

const HeroSection: React.FC = () => {
  return (
    <div className="relative text-right">
      <div className="mb-4 text-6xl font-bold">فلك للموارد البشرية</div>
      <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />
      <div className="absolute left-0 top-10">
        <Button icon={<BsArrowLeft />} text="أبدا معنا" />
      </div>
    </div>
  );
};

export default HeroSection;