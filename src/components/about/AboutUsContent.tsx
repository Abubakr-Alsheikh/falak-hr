import React from "react";
import TextContent from "../TextContent";
import AboutCard from "../AboutCard";
import SectionTitle from "../SectionTitle";

const AboutUsContent: React.FC = () => {
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
    <div>
      <div className="relative text-right">
        <SectionTitle title="هدفنا وقصتنا" center={true} />
        <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." center={true} />
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

export default AboutUsContent;
