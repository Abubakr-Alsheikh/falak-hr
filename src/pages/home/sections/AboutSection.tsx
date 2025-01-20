import React from "react";
import AboutCard from "../../../components/Card";
import remoteWorkImage from "../../../assets/AboutSection/remote work.jpg";
import workSectionImage from "../../../assets/AboutSection/work section.jpg";
import trainingSessionImage from "../../../assets/AboutSection/training session.png";
import HeaderSection from "../../../components/HeaderSection";
import FadeIn from "../../../components/animations/FadeIn";
import SlideIn from "../../../components/animations/SlideIn";

const AboutSection: React.FC = () => {
  const cards = [
    {
      title: "العمل عن بعد",
      description:
        "برنامج العمل عن بعد هو أحد المبادرات الوطنية المهمة التي اطلقتها وزارة الموارد البشرية والتنمية الاجتماعية والذي يهدف الى خلق ثقافة جديدة داخل السوق السعودي و ويسهم في تخفيض نسبة البطالة بفرص وظيفية لا تعترف بالحدود الجغرافية و تتجاوز حواجز الزمان والمكان",
      imageUrl: workSectionImage,
      buttonText: "عرض المزيد",
    },
    {
      title: "مساحات العمل المشتركة",
      description:
        "ستحقق أقصى استفادة من وقتك في قلب مجتمع بسيط، عملي، ومتفرّد. إن أقل مانقدمه لك عند اختيارك مساحاتنا للعمل هو إحساسك بالرضا، حين تعرف متى وأين يصبح عملك ذا إنتاجية ونمو أعلى. أهلاً بك في مكاتبنا، المكان الذي ستتمنى لو أنك عرفته من قبل خصوصية للعمل الفردي والمستقل بيئة تعاونية لفرق العمل والقادة مواقع استراتيجية في المدن الكبرى باقات مرنة لمختلف الاحتياجات المكتبية",
      imageUrl: remoteWorkImage,
      buttonText: "عرض المزيد",
    },
    {
      title: "الدورات التدريبية",
      description:
        "في شركة فلك للموارد البشرية نحرص دائماً على تطوير وتمكين الكوادر السعودية حيث نعمل على تقديم عدة دورات تدريبية في المجالات المهنية المختلفة لدعم منسوبي إنجاز وشركاءنا.",
      imageUrl: trainingSessionImage,
      buttonText: "عرض المزيد",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto mb-16 overflow-hidden">
        <FadeIn direction="up">
          <HeaderSection
            title="نبذة عن فلك للموارد البشرية"
            text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."
          />
        </FadeIn>
        {cards.map((card, index) => (
          <SlideIn
            key={index}
            direction={index % 2 !== 0 ? "right" : "left"}
            delay={index * 0.3}
          >
            <AboutCard
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              buttonText={card.buttonText}
              isReversed={index % 2 !== 0}
            />
          </SlideIn>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
