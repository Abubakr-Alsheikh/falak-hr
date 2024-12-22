import React from "react";
import SectionTitle from "../SectionTitle";
import TextContent from "../TextContent";
import Card from "../Card";
const AboutSection: React.FC = () => {
  return (
    <div className="my-8">
      <SectionTitle title="نبذة عن فلك للموارد البشرية" />
      <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />
      <div className="my-8 grid grid-cols-3 gap-6">
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          buttonText="عرض المزيد"
          imageUrl={"https://placehold.co/400x300"}
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          buttonText="عرض المزيد"
          imageUrl={"https://placehold.co/400x300"}
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          buttonText="عرض المزيد"
          imageUrl={"https://placehold.co/400x300"}
        />
      </div>
    </div>
  );
};

export default AboutSection;