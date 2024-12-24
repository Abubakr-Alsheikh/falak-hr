import React from 'react';
import TextContent from "../TextContent";
import {
    AiOutlineCloudServer,
    AiOutlineMail,
    AiOutlineShoppingCart,
    AiOutlineSetting,
    AiOutlineUsergroupAdd,
    AiOutlineVideoCamera
} from "react-icons/ai";
import FeatureCard from '../FeatureCard';

const RemoteFeaturesSection: React.FC = () => {

    const features = [
        {
            title: "عنوان 1",
            description: "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
            icon: <AiOutlineShoppingCart />
        },
        {
            title: "عنوان 2",
            description: "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
            icon: <AiOutlineMail />
        },
         {
           title: "عنوان 3",
            description: "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
            icon: <AiOutlineSetting />
        },
        {
           title: "عنوان 4",
            description: "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
             icon: <AiOutlineCloudServer />
        },
        {
            title: "عنوان 5",
            description: "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
            icon: <AiOutlineUsergroupAdd />
        },
        {
            title: "عنوان 6",
            description: "نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدا.",
             icon: <AiOutlineVideoCamera />

        },

    ]


  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 max-w-screen-md lg:mb-16">
            <div className="relative text-right">
                <div className="mb-4 text-4xl font-bold">ماذا يميزنا</div>
                <TextContent text="نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا."/>
            </div>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
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