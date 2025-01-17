import React from "react";
import Button from "../../../components/Button";
import { BsArrowLeft } from "react-icons/bs";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const HeroSection: React.FC = () => {
  return (
    <section className="gradient-primary-color relative m-5 mb-16 mt-32 flex flex-col items-center justify-center rounded-2xl py-5 shadow-2xl md:mt-14 md:h-screen md:py-24 lg:flex-row-reverse">
      <DotLottieReact
          src="https://lottie.host/94e3c8d1-60a4-4a05-890c-f5c2ac74981a/t7moSf8EH4.lottie"
          loop
          autoplay
          className="w-full md:max-w-[800px]"
        />
      <div className="mx-auto px-4 py-8 text-right lg:px-12 lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white dark:text-white md:text-5xl lg:text-6xl">
          فلك للموارد البشرية
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-100 dark:text-gray-400 lg:text-xl">
          لادارة و تشغيل باقات و انظمة وبرامج ومشاريع العمل عن بعد عبر خدمة
          المراقبة الذاتية
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-start sm:space-x-4 sm:space-y-0">
          <Button icon={<BsArrowLeft />} text="أبدا معنا" variant="secondary" className="m-0 bg-white"/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;