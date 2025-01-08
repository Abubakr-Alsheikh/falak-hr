import React from "react";
import AboutCard from "../Card";
import remoteWorkImage from '../../assets/AboutSection/remote work.jpg'
import workSectionImage from '../../assets/AboutSection/work section.jpg'
import HeaderSection from "../HeaderSection";

const AboutSection: React.FC = () => {
  const cards = [
    {
      title: "العمل عن بعد",
      description:
        "برنامج العمل عن بعد هو أحد المبادرات الوطنية المهمة التي اطلقتها وزارة الموارد البشرية والتنمية الاجتماعية والذي يهدف الى خلق ثقافة جديدة داخل السوق السعودي و ويسهم في تخفيض نسبة البطالة بفرص وظيفية لا تعترف بالحدود الجغرافية و تتجاوز حواجز الزمان والمكان",
      imageUrl: remoteWorkImage,
      buttonText: "عرض المزيد",
    },
    {
      title: "مساحات العمل المشتركة",
      description:
        "ستحقق أقصى استفادة من وقتك في قلب مجتمع بسيط، عملي، ومتفرّد. إن أقل مانقدمه لك عند اختيارك مساحاتنا للعمل هو إحساسك بالرضا، حين تعرف متى وأين يصبح عملك ذا إنتاجية ونمو أعلى. أهلاً بك في مكاتبنا، المكان الذي ستتمنى لو أنك عرفته من قبل خصوصية للعمل الفردي والمستقل بيئة تعاونية لفرق العمل والقادة مواقع استراتيجية في المدن الكبرى باقات مرنة لمختلف الاحتياجات المكتبية",
      imageUrl: workSectionImage,
      buttonText: "عرض المزيد",
    },
    // {
    //   title: "عنوان 3",
    //   description:
    //     "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
    //   imageUrl: "https://placehold.co/100x100",
    //   buttonText: "عرض المزيد",
    // },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto mb-16">
        <HeaderSection
          title="نبذة عن فلك للموارد البشرية"
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
    </section>
  );
};

export default AboutSection;
