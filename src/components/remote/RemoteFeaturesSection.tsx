import React from "react";
import Card from "../Card";
import TextContent from "../TextContent";
const RemoteFeaturesSection: React.FC = () => {
  return (
    <div>
      <div className="relative text-right">
        <div className="mb-4 text-4xl font-bold">ماذا يميزنا</div>
        <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />
      </div>
      <div className="my-8 grid grid-cols-3 gap-6">
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
          buttonText="عرض المزيد"
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
          buttonText="عرض المزيد"
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
          buttonText="عرض المزيد"
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
          buttonText="عرض المزيد"
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
          buttonText="عرض المزيد"
        />
        <Card
          title="عنوان"
          description="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا."
          imageUrl={"https://placehold.co/400x300"}
          buttonText="عرض المزيد"
        />
      </div>
    </div>
  );
};

export default RemoteFeaturesSection;
