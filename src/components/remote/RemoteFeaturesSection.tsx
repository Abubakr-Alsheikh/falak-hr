import React from "react";
import {
  AiOutlineUser,
  AiOutlineCalculator,
  AiOutlineBarChart,
  AiOutlineShoppingCart,
  AiOutlineInbox,
  AiOutlineCloud,
} from "react-icons/ai";
import FeatureCard from "../FeatureCard";
import HeaderSection from "../HeaderSection";

const RemoteFeaturesSection: React.FC = () => {
  const features = [
    {
      title: "إدارة الموارد البشرية",
      description:
        "حلول متكاملة تشمل التوظيف، إدارة الموظفين، المستندات الحكومية، الإجازات، والخدمات الذاتية. بالإضافة إلى إدارة الرواتب، تقييم الأداء، الحضور والانصراف، السلف والقروض، وإنهاء الخدمات.",
      icon: <AiOutlineUser />,
    },
    {
      title: "إدارة الحسابات والمالية",
      description:
        "نظام محاسبة متكامل لإدارة السنوات والفترات المالية، الذمم الدائنة والمدينة، الفواتير والمدفوعات، وإعداد التقارير والبيانات القانونية. كما يشمل إدارة الخزينة والميزانية والأصول.",
      icon: <AiOutlineCalculator />,
    },
    {
      title: "المبيعات والتسويق",
      description:
        "أدوات متقدمة لإدارة علاقات العملاء، بما في ذلك جهات الاتصال، الاستفسارات، والفرص. بالإضافة إلى حلول التسويق عبر البريد الإلكتروني وإدارة محتوى المواقع.",
      icon: <AiOutlineBarChart />,
    },
    {
      title: "إدارة المبيعات المتقدمة",
      description:
        "تبسيط عمليات البيع من خلال إدارة عروض الأسعار، أوامر البيع، التجارة الإلكترونية، ونقاط البيع المتعددة.",
      icon: <AiOutlineShoppingCart />,
    },
    {
      title: "إدارة المشتريات والمخازن",
      description:
        "تنظيم عمليات الشراء من خلال طلبات الشراء والمناقصات وتقييم الموردين. بالإضافة إلى إدارة المخازن المتعددة، طلبات الصرف، العهد، والعقود.",
      icon: <AiOutlineInbox />,
    },
    {
      title: "أدوات العمل عن بعد",
      description:
        "باقة متكاملة من الأدوات والأنظمة والبرامج التي تدعم مشاريع العمل عن بعد عبر خدمة المراقبة الذاتية، لتعزيز كفاءة وإنتاجية فريقك.",
      icon: <AiOutlineCloud />,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4">
        <HeaderSection
          title="خدماتنا وحلولنا"
          text="نقدم في فلك مجموعة متكاملة من الخدمات والحلول الرقمية التي تمكن الشركات من إدارة عملياتها بكفاءة وفعالية، مع التركيز على تبسيط الإجراءات وأتمتة المهام لتقليل التكاليف التشغيلية."
        />
        <div className="mt-12 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RemoteFeaturesSection;
