import React from "react";
import HeaderSection from "./HeaderSection";

const PartnersSection: React.FC = () => {
  const partnersData = [
    {
      id: 1,
      imageUrl: "https://teleworks.sa/wp-content/themes/understrap-child/images/header-logo-all.png",
      linkUrl: "https://teleworks.sa/ar/",
      altText: "teleworks",
    },
    {
      id: 2,
      imageUrl: "https://www.monshaat.gov.sa/themes/eportal2_new/assets/imgs/m_Logo.png",
      linkUrl: "https://www.monshaat.gov.sa/ar",
      altText: "monshaat",
    },
    {
      id: 3,
      imageUrl: "https://code.mcit.gov.sa/themes/custom/dic/logo-s.svg",
      linkUrl: "https://code.mcit.gov.sa/ar",
      altText: "code.mcit",
    },
    {
      id: 4,
      imageUrl: "https://doroob.sa/static/images/hrdf-tadreeb-logo-2023.png",
      linkUrl: "https://doroob.sa/ar/",
      altText: "doroob",
    },
    {
      id: 5,
      imageUrl: "https://cdn.gosi.gov.sa/gptscripts/GOSILogo-White.a6b82d9449f8d721.svg",
      linkUrl: "https://www.gosi.gov.sa/ar",
      altText: "gosi",
    },
  ];
  return (
    <div className="mx-auto mb-16 px-4 text-center md:max-w-screen-md lg:max-w-screen-xl lg:px-36">
      <HeaderSection
          title="شركاؤنا"
          text="الشراكات الاستراتيجية تكمن في جوهر نجاحنا. لقد قمنا بتنمية علاقاتنا مع قادة الصناعة، مما يمكننا من تقديم حلاً حديثًا يعزز الكفاءة والابتكار."
        />
      <div className="mt-8 flex flex-wrap items-center justify-center text-gray-500 sm:justify-between">
        {partnersData.map((partner) => (
          <a
            key={partner.id}
            href={partner.linkUrl}
            className="mb-5 mr-5 rounded-2xl border border-gray-300 bg-gray-100 p-4 shadow-sm lg:mb-0"
            target="_blank"
          >
            <img
              src={partner.imageUrl}
              alt={partner.altText}
              className="h-12 w-auto"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PartnersSection;
