"use client";

import React, { useState } from "react";
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

// shadcn/ui Dialog imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import HeaderSection from "@/components/common/public/HeaderSection";
import FadeIn from "@components/animations/FadeIn";
import ScaleUp from "@components/animations/ScaleUp";
import FeatureCard from "@/pages/public/remote/components/FeatureCard";
import { ServiceRequestForm } from "@/components/service-request/ServiceRequestForm";

// Define a type for our feature to ensure type safety
interface Feature {
  title: string;
  description: string;
  icon: React.ReactElement;
}

const RemoteFeaturesSection: React.FC = () => {
  // State to manage the dialog's visibility
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State to hold the details of the service that was clicked
  const [selectedService, setSelectedService] = useState<Feature | null>(null);

  const features: Feature[] = [
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
    // ... Add all other features here
    {
      title: "حاضنة ومسرعة الأعمال",
      description:
        "دعم رواد الأعمال والشركات الناشئة من خلال برامج متخصصة، إرشاد، توفير مساحات عمل مشتركة، وفرص للتمويل والتواصل مع المستثمرين والخبراء.",
      icon: <AiOutlineRocket size={40} />,
    },
  ];

  // Handler function to open the dialog and set the selected service
  const handleRequestServiceClick = (feature: Feature) => {
    setSelectedService(feature);
    setIsDialogOpen(true);
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <FadeIn direction="up">
            <HeaderSection
              title="خدمات وحلول فلك للموارد البشرية"
              text="نقدم في فلك مجموعة متكاملة من الخدمات والحلول الرقمية والمبتكرة التي تمكن الشركات والأفراد من تحقيق أهدافهم وتعزيز كفاءتهم في بيئة العمل الحديثة."
            />
          </FadeIn>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <ScaleUp key={index} delay={index * 0.08}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  number={index + 1}
                  buttonText="اطلب الخدمة الآن"
                  onButtonClick={() => handleRequestServiceClick(feature)}
                />
              </ScaleUp>
            ))}
          </div>
        </div>
      </section>

      {/* --- DIALOG IMPLEMENTATION --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl" dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle className="text-2xl font-bold text-sky-800">
              طلب خدمة: {selectedService?.title}
            </DialogTitle>
            <DialogDescription className="text-md">
              الرجاء إكمال النموذج التالي لتقديم طلبك.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto p-4">
            {selectedService && (
              <ServiceRequestForm
                initialServiceTitle={selectedService.title}
                initialServiceDescription={selectedService.description}
                onFormSubmitSuccess={() => setIsDialogOpen(false)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RemoteFeaturesSection;
