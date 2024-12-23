import React from "react";
import TextContent from "../TextContent";
import Card from "../Card";

const RemoteWorkExplain: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="relative text-right">
        <div className="mb-4 text-4xl font-bold">شرح العمل عن بعد</div>
        <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />
      </div>
      <div className="my-8 grid grid-cols-2 gap-6">
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

export default RemoteWorkExplain;
