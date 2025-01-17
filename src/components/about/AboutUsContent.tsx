import React from "react";
import AboutCard from "../AboutCard";
import futuristicCityscapeImage from '../../assets/AboutPage/futuristic cityscape.png'
import digitalInterfaceImage from '../../assets/AboutPage/digital interface.png'
import FourDistinctImage from '../../assets/AboutPage/Four distinct.png'
import HeaderSection from "../HeaderSection";

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
    <div>
      <div className="relative text-right">
        <HeaderSection
          title="قصتنا"
          text="تأسست فلك للموارد البشرية في عام 2021م كشركة سعودية متخصصة في تمكين العمل عن بعد. نهدف إلى دعم التحول الرقمي للمنشآت من خلال توفير حلول تقنية متكاملة للإمداد البشري في مختلف المجالات. نركز على دمج التقنيات المتطورة والذكاء الاصطناعي في إدارة العمليات اليومية لتعزيز الكفاءة ورفع مستوى الأداء."
        />
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