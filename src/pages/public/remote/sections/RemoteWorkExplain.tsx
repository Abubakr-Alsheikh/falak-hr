import React from "react";
import calendarHighlighting from "@assets/RemoteWorkExplain/calendar highlighting.png";
import collaborativePlanning from "@assets/RemoteWorkExplain/collaborative planning.png";
import knowledgeableInstructor from "@assets/RemoteWorkExplain/knowledgeable instructor.png";
import groupOfIndividuals from "@assets/RemoteWorkExplain/group of individuals.png";
import HeaderSection from "@/components/common/public/HeaderSection";
import FadeIn from "@components/animations/FadeIn";
import SlideIn from "@components/animations/SlideIn";
import AboutCard from "@/components/common/public/AboutCard"; // Assume this exists and is styled

const RemoteWorkExplain: React.FC = () => {
  const cards = [
    {
      title: "دورات تدريبية متخصصة للعمل عن بعد",
      description:
        "نقدم دورات تركز على تزويد المتدربين بالمهارات والأدوات اللازمة للنجاح في بيئة العمل عن بعد، بما في ذلك إدارة الوقت، التواصل الفعال، واستراتيجيات زيادة الإنتاجية وتحقيق التوازن.",
      imageUrl: calendarHighlighting,
      buttonText: "سجل الان كمتدرب",
      buttonLink: "https://forms.gle/ErZyTGXJNg7mRZ7a7",
    },
    {
      title: "برامج تدريبية مخصصة للشركات",
      description:
        "نصمم ونقدم برامج تدريبية حسب الطلب لشركائنا، تغطي احتياجاتهم الخاصة في مجالات مثل خدمة العملاء، اللوجستيات، إدارة المشاريع، وغيرها، لضمان تلبية متطلبات أعمالهم الفريدة.",
      imageUrl: collaborativePlanning,
      buttonText: "سجل الان كمتدرب",
      buttonLink: "https://forms.gle/ErZyTGXJNg7mRZ7a7",
    },
    {
      title: "مدربون بخبرة وكفاءة عالية",
      description:
        "يقدم دوراتنا نخبة من المدربين المعتمدين الذين يتمتعون بخبرة واسعة وكفاءة عالية، مع فهم عميق لاحتياجات السوق السعودي ومتطلبات بيئة العمل الحديثة.",
      imageUrl: knowledgeableInstructor,
      buttonText: "سجل الان كمتدرب",
      buttonLink: "https://forms.gle/ErZyTGXJNg7mRZ7a7",
    },
    {
      title: "بيئة تدريب تفاعلية وشهادات معتمدة",
      description:
        "نوفر بيئة تدريبية تفاعلية وجذابة باستخدام أحدث التقنيات والأساليب. يحصل المشاركون على شهادات حضور معتمدة تعزز مسارهم المهني عند إتمام الدورة.",
      imageUrl: groupOfIndividuals,
      buttonText: "سجل الان كمتدرب",
      buttonLink: "https://forms.gle/ErZyTGXJNg7mRZ7a7",
    },
  ];

  return (
    <div className="mt-20 overflow-x-hidden">
      <FadeIn direction="up">
        <HeaderSection
          title="التدريب والتطوير في فلك للموارد البشرية"
          text="نؤمن في فلك بأهمية التطوير المستمر. نقدم مجموعة متنوعة من الدورات التدريبية المصممة لتمكين الموظفين والشركاء بالمهارات اللازمة للنجاح."
        />
      </FadeIn>
      {cards.map((card, index) => (
        <SlideIn
          key={index}
          direction={index % 2 !== 0 ? "right" : "left"}
          delay={index * 0.1}
        >
          <AboutCard
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            buttonText={card.buttonText}
            isReversed={index % 2 !== 0}
            buttonLink={card.buttonLink}
          />
        </SlideIn>
      ))}
    </div>
  );
};

export default RemoteWorkExplain;
