import React from "react";
import calendarHighlighting from "@assets/RemoteWorkExplain/calendar highlighting.png";
import collaborativePlanning from "@assets/RemoteWorkExplain/collaborative planning.png";
import knowledgeableInstructor from "@assets/RemoteWorkExplain/knowledgeable instructor.png";
import groupOfIndividuals from "@assets/RemoteWorkExplain/group of individuals.png";
import HeaderSection from "@/components/common/public/HeaderSection";
import FadeIn from "@components/animations/FadeIn";
import SlideIn from "@components/animations/SlideIn";
import AboutCard from "@/components/public/AboutCard";

const RemoteWorkExplain: React.FC = () => {
  const cards = [
    {
      title: "دورات تدريبية شهرية",
      description:
        "نقدم في فلك للموارد البشرية دورات تدريبية شهرية مخصصة لموظفي برنامج العمل عن بعد، بهدف تطوير مهاراتهم وتعزيز إنتاجيتهم في بيئة العمل الحديثة.",
      imageUrl: calendarHighlighting,
      buttonText: "عرض المزيد",
    },
    {
      title: "دورات تدريبية حسب الطلب للشركاء",
      description:
        "نوفر في فلك للموارد البشرية دورات تدريبية مصممة خصيصاً لشركائنا بناءً على احتياجاتهم ومتطلباتهم، لضمان تحقيق أقصى استفادة من برنامج العمل عن بعد.",
      imageUrl: collaborativePlanning,
      buttonText: "عرض المزيد",
    },
    {
      title: "مدربون معتمدون",
      description:
        "يتم تقديم الدورات التدريبية في فلك للموارد البشرية من قبل نخبة من المدربين المعتمدين ذوي الخبرة والكفاءة العالية في مجال العمل عن بعد والموارد البشرية.",
      imageUrl: knowledgeableInstructor,
      buttonText: "عرض المزيد",
    },
    {
      title: "شهادات حضور معتمدة",
      description:
        "يحصل الملتحقون بالدورات التدريبية في فلك للموارد البشرية على شهادات حضور معتمدة تثبت مشاركتهم وإتمامهم للدورة، مما يعزز ملفهم المهني.",
      imageUrl: groupOfIndividuals,
      buttonText: "عرض المزيد",
    },
  ];

  return (
    <div className="mt-20 overflow-hidden">
      <FadeIn direction="up">
        <HeaderSection
          title="شرح برامج التدريب للعمل عن بعد"
          text="في فلك للموارد البشرية، نؤمن بأهمية التطوير المستمر لموظفي العمل عن بعد وشركائنا. لذلك، نقدم مجموعة متنوعة من الدورات التدريبية الاحترافية."
        />
      </FadeIn>
      {cards.map((card, index) => (
        <SlideIn
          key={index}
          direction={index % 2 !== 0 ? "right" : "left"}
          delay={index * 0.15}
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
  );
};

export default RemoteWorkExplain;
