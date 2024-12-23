import React from "react";
import SectionTitle from "../SectionTitle";
import AboutCard from "../Card";
import TextContent from "../TextContent";

const AboutSection: React.FC = () => {
  const cards = [
    {
      title: "عنوان 1",
      description:
        "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
      imageUrl: "https://placehold.co/100x100",
      buttonText: "عرض المزيد",
    },
    {
      title: "عنوان 2",
      description:
        "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
      imageUrl: "https://placehold.co/100x100",
      buttonText: "عرض المزيد",
    },
    {
      title: "عنوان 3",
      description:
        "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
      imageUrl: "https://placehold.co/100x100",
      buttonText: "عرض المزيد",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <SectionTitle title="نبذة عن فلك للموارد البشرية" center={true} />
        <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا." center={true} />
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
    </section>
  );
};

export default AboutSection;
