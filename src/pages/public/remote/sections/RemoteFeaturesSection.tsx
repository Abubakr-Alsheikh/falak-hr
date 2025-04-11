import React from "react";
import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineInbox,
  AiOutlineCloud,
  AiOutlineStar,
  AiOutlineBuild,
  AiOutlineSolution,
  AiOutlineRocket,
} from "react-icons/ai";
import HeaderSection from "@/components/common/public/HeaderSection";
import FadeIn from "@components/animations/FadeIn";
import ScaleUp from "@components/animations/ScaleUp";
import FeatureCard from "@/pages/public/remote/components/FeatureCard";

const RemoteFeaturesSection: React.FC = () => {
  const features = [
    {
      title: "حلول الموارد البشرية المتكاملة",
      description:
        "نوفر حزم شاملة لتلبية احتياجات الموارد البشرية، تشمل جذب أفضل الكفاءات وتطويرها، إدارة شؤون الموظفين، الرواتب، تقييم الأداء، وضمان الامتثال لقوانين العمل.",
      icon: <AiOutlineUser size={40} />,
    },
    {
      title: "حلول العمل عن بعد",
      description:
        "تمكين الشركات من إدارة فرق العمل عن بعد بكفاءة ومرونة، مع توفير الأدوات والتدريب اللازم لتعزيز الإنتاجية وتحقيق التوازن بين العمل والحياة.",
      icon: <AiOutlineCloud size={40} />,
    },
    {
      title: "خدمات التحول الرقمي والأتمتة",
      description:
        "مساعدة الشركات على تبني أحدث التقنيات وأدوات الذكاء الاصطناعي لتبسيط العمليات وتحسين الكفاءة التشغيلية ودعم الإدارة المرنة بغض النظر عن الموقع الجغرافي.",
      icon: <AiOutlineBuild size={40} />,
    },
    {
      title: "إسعاد العملاء",
      description:
        "تطبيق استراتيجيات تتجاوز توقعات العملاء، بناء علاقات قوية، وتحسين السمعة التجارية من خلال تجارب إيجابية وخدمة مخصصة وفعالة.",
      icon: <AiOutlineStar size={40} />,
    },
    {
      title: "التدريب والتطوير المهني",
      description:
        "برامج تدريبية متخصصة لتطوير المهارات في مجالات العمل عن بعد، خدمة العملاء، اللوجستيات، وإدارة المشاريع، مقدمة من مدربين ذوي خبرة لدعم النمو المهني.",
      icon: <AiOutlineSolution size={40} />,
    },
    {
      title: "التجارة الإلكترونية",
      description:
        "إنشاء وتصميم وتحسين المتاجر الإلكترونية لتعزيز التواجد الرقمي، تحسين تجربة المستخدم، وزيادة المبيعات باستخدام أحدث المنصات والتقنيات.",
      icon: <AiOutlineShoppingCart size={40} />,
    },
    {
      title: "إدارة سلاسل الإمداد واللوجستيات",
      description:
        "تخطيط وتنفيذ ومراقبة تدفق السلع والمعلومات بفعالية من المصدر إلى المستهلك، بما يشمل إدارة المشتريات، التخزين، التوزيع، وتقنيات SCM.",
      icon: <AiOutlineInbox size={40} />,
    },
    {
      title: "حاضنة ومسرعة الأعمال",
      description:
        "دعم رواد الأعمال والشركات الناشئة من خلال برامج متخصصة، إرشاد، توفير مساحات عمل مشتركة، وفرص للتمويل والتواصل مع المستثمرين والخبراء.",
      icon: <AiOutlineRocket size={40} />,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4">
        <FadeIn direction="up">
          <HeaderSection
            title="خدمات وحلول فلك للموارد البشرية"
            text="نقدم في فلك مجموعة متكاملة من الخدمات والحلول الرقمية والمبتكرة التي تمكن الشركات والأفراد من تحقيق أهدافهم وتعزيز كفاءتهم في بيئة العمل الحديثة."
          />
        </FadeIn>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <ScaleUp key={index} delay={index * 0.08}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                number={index + 1}
                buttonLink="https://forms.gle/qMFC32jfMhBWqyt9A"
                buttonText="اطلب الان"
              />
            </ScaleUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RemoteFeaturesSection;
