import React from "react";
import Button from "../Button";
import { BsArrowLeft } from "react-icons/bs";

const HeroSection: React.FC = () => {
  return (
    <section className="gradient-primary-color mx-4 mb-8 mt-10 rounded-3xl shadow-lg md:mx-0">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
        <a
          href="#"
          className="mb-7 inline-flex items-center justify-between rounded-full bg-gray-100 px-1 py-1 pr-4 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          role="alert"
          dir="ltr"
        >
          <span className="mr-3 rounded-full bg-primary-600 px-4 py-1.5 text-xs text-white">
            جديد
          </span>{" "}
          <span className="text-sm font-medium">
           انظر الى هو جديد
          </span>
          <svg
            className="ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white dark:text-white md:text-5xl lg:text-6xl">
          فلك للموارد البشرية
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-100 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          نص أساسي لأي شيء تود قوله. أضف النقاط الرئيسية التي استخلصتها، أو
          الاقتباسات، أو الحكايات، أو حتى قصة قصيرة جدًا.
        </p>
        <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
          <Button icon={<BsArrowLeft />} text="أبدا معنا" variant="primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
