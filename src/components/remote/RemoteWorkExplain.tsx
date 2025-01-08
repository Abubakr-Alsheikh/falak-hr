import React from "react";
import AboutCard from "../AboutCard";
import HeaderSection from "../HeaderSection";

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
    <div className="mt-20">
      <HeaderSection
        title="شرح العمل عن بعد"
        text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
      />
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
