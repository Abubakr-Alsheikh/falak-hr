import React from "react";
import AccountCard from "../../../components/AccountCard";
import remoteFirstImage from "../../../assets/HomeAccountSection/home-remote-1.png";
import remoteSecondImage from "../../../assets/HomeAccountSection/home-remote-2.png";
import HeaderSection from "../../../components/HeaderSection";

const AccountSection: React.FC = () => {
  const accountData = [
    {
      title: "التسجيل كصاحب منشأة",
      description:
        "بصفتك صاحب عمل، يمكنك البرنامج من الوصول إلى أكبر عدد من الكوادر الوطنية المؤهلة وتوظيفهم على نحو سريع ومريح.إن المرونة اإلضافية التي تمنحها للعامل عن بُعْد تزيد من مستوى إنتاجيته وترفع مستوى استدامته الوظيفية بما ينعكس إيجابا على أداء منشأتك. وتتجلى هذه المرونة في إمكانية التوظيف بحسب احتياجات الشركة، سواء بدوام كامل أوجزئي، وبالساعات المرغوب فيها التي لا يشترط أن تطابق أوقات دوام الشركة. كمايمنحك التعامل مع البرنامج فرصة للتوظيف بتكاليف لوجستية أقل، وإمكانية الاستفادة لتدريب الموظفين عن بعد من البرنامج التدريبي للعمل عن بُعْد",
      buttonText: "تسجيل الدخول",
      backgroundImage: remoteFirstImage,
    },
    {
      title: "العامل عن بعد",
      description:
        "لن تقف جاهزية مكان العمل أو صعوبة التنقل اليومي عائقاً أمام انضمامك إلى سوق العمل بشكل رسمي، حيث يوفر لك البرنامج الحل الأمثل للانضمام إلى سوق العمل من خلال فرص عمل رسميَّة ومكافئة للوظائف العادية في مردودها المادي وضمان مستقبلك الوظيفي. كما أنَّ الوظائف المتاحة واسعة النطاق وستفتح أمامك أبواباً مختلفة لزيادة خبراتك و تنمية مهاراتك دون التقيد بالعوائق التقليدية",
      buttonText: "تسجيل الدخول",
      backgroundImage: remoteSecondImage,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto mb-16 px-4 md:px-0">
        <HeaderSection
          title="ماذا نقدم لك"
          text="استكشف مجموعتنا الواسعة من خدمات الموارد البشرية المصممة لتحسين إدارة القوى العاملة لديك. من اكتساب المواهب إلى حلول الرواتب، نحن نغطي احتياجاتك في الموارد البشرية"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {accountData.map((account, index) => (
            <AccountCard
              key={index}
              title={account.title}
              description={account.description}
              buttonText={account.buttonText}
              backgroundImage={account.backgroundImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccountSection;
