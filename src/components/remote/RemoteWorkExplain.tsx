import React from "react";
import TextContent from "../TextContent";
import AboutCard from "../AboutCard";

const RemoteWorkExplain: React.FC = () => {
  const cards = [
    {
      title: "عنوان 1",
      description:
        "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
      imageUrl: "https://placehold.co/700x700",
      buttonText: "عرض المزيد",
    },
    {
      title: "عنوان 2",
      description:
        "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
      imageUrl: "https://placehold.co/700x700",
      buttonText: "عرض المزيد",
    },
    {
      title: "عنوان 3",
      description:
        "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
      imageUrl: "https://placehold.co/700x700",
      buttonText: "عرض المزيد",
    },
  ];

  return (
    <div className="mt-8">
      <div className="relative text-right">
        <div className="mb-4 text-4xl font-bold">شرح العمل عن بعد</div>
        <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." />
      </div>
      {cards.map((card, index) => (
        <AboutCard
          key={index}
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
          buttonText={card.buttonText}
          isReversed={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

export default RemoteWorkExplain;
