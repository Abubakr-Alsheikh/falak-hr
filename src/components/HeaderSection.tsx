import React from "react";
import SectionTitle from "./SectionTitle";
import TextContent from "./TextContent";

interface HeaderSectionProps {
  title: string;
  text: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ title, text }) => {
  return (
    <div className="relative mb-12 text-right">
      <SectionTitle title={title} center={true} />
      <TextContent text={text} center={true} className="mx-4 max-w-3xl md:mx-auto" />
      <div className="inline-flex w-full items-center justify-center">
        <hr className="my-4 h-1 w-64 rounded border-0 bg-primary-700" />
        <div className="absolute left-1/2 -translate-x-1/2 bg-white px-4">
          <svg
            className="h-[28px] w-[28px] text-primary-700 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="m8 7 4 4 4-4m-8 6 4 4 4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
