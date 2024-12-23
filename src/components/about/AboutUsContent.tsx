import React from "react";
import TextContent from "../TextContent";
import Card from "../Card";

const AboutUsContent: React.FC = () => {
  return (
    <div>
      <div className="relative text-right">
        <div className="mb-4 text-4xl font-bold">هدفنا وقصتنا</div>
        <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />
      </div>
      <div className="my-8 grid grid-cols-3 gap-6">
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
        />
      </div>
    </div>
  );
};

export default AboutUsContent;
