import React from "react";
import futuristicCityscapeImage from "@assets/AboutPage/futuristic cityscape.png";
import digitalInterfaceImage from "@assets/AboutPage/digital interface.png";
import FourDistinctImage from "@assets/AboutPage/Four distinct.png";
import HeaderSection from "@/components/common/public/HeaderSection";
import FadeIn from "@components/animations/FadeIn";
import SlideIn from "@components/animations/SlideIn";
import AboutCard from "@/components/common/public/AboutCard";

const AboutUsContent: React.FC = () => {
  const cards = [
    {
      title: "رؤيتنا",
      description:
        "أن نكون الرواد في إعادة تشكيل منظومة العمل، نحو عمليات مبسطة، وإجراءات مؤتمتة، وبتكاليف تشغيلية أقل.",
      imageUrl: futuristicCityscapeImage,
      buttonText: "اكتشف المزيد",
    },
    {
      title: "مهمتنا",
      description:
        "تقديم تجربة رقمية إيجابية لأصحاب العمل والموظفين من خلال حلول تقنية مبتكرة في مراحل الاستقطاب والتوظيف، والتدريب والتأهيل، وإدارة المشاريع وقياس الإنتاجية.",
      imageUrl: digitalInterfaceImage,
      buttonText: "خدماتنا",
    },
    {
      title: "قيمنا",
      description:
        "الكفاءة، الابتكار، الشفافية، والتركيز على بناء شراكات مستدامة مع عملائنا والمساهمة في تحقيق أهدافهم.",
      imageUrl: FourDistinctImage,
      buttonText: "انضم إلينا",
    },
  ];

  return (
    <div className="overflow-hidden">
      <FadeIn direction="up">
        <div className="relative text-right">
          <HeaderSection
            title="قصتنا"
            text="تأسست فلك للموارد البشرية في عام 2021م كشركة سعودية متخصصة في تمكين العمل عن بعد. نهدف إلى دعم التحول الرقمي للمنشآت من خلال توفير حلول تقنية متكاملة للإمداد البشري في مختلف المجالات. نركز على دمج التقنيات المتطورة والذكاء الاصطناعي في إدارة العمليات اليومية لتعزيز الكفاءة ورفع مستوى الأداء."
          />
        </div>
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
            buttonLink="/remote-work"
          />
        </SlideIn>
      ))}
    </div>
  );
};

export default AboutUsContent;
