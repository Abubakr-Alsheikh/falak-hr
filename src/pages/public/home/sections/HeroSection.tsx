// src/pages/public/home/sections/HeroSection.tsx
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "@/components/common/public/Button";
import FadeIn from "@components/animations/FadeIn";
import SlideIn from "@components/animations/SlideIn";
import { Link } from "react-router-dom";
import SocialIcons from "@components/common/public/SocialIcons"; // <-- Import SocialIcons

const HeroSection: React.FC = () => {
  return (
    <FadeIn direction="up">
      {/* Ensure the main section has 'relative' positioning */}
      <section className="gradient-primary-color relative m-5 mb-16 mt-32 flex flex-col items-center justify-center rounded-2xl py-5 shadow-2xl md:mt-14 md:h-screen md:py-24 lg:flex-row-reverse">
        {/* Lottie Animation */}
        <SlideIn
          direction="right"
          delay={0.2}
          className="w-full md:max-w-[800px]"
        >
          <DotLottieReact
            src="https://lottie.host/94e3c8d1-60a4-4a05-890c-f5c2ac74981a/t7moSf8EH4.lottie"
            loop
            autoplay
          />
        </SlideIn>

        {/* Text Content */}
        <div className="mx-auto px-4 py-8 text-right lg:px-12 lg:py-16">
          <FadeIn direction="left" delay={0.4}>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white dark:text-white md:text-5xl lg:text-6xl">
              فلك للموارد البشرية
            </h1>
          </FadeIn>
          <FadeIn direction="left" delay={0.6}>
            <p className="mb-8 text-lg font-normal text-gray-100 dark:text-gray-400 lg:text-xl">
              لادارة و تشغيل باقات و انظمة وبرامج ومشاريع العمل عن بعد عبر خدمة
              المراقبة الذاتية
            </p>
          </FadeIn>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-start sm:space-x-4 sm:space-y-0">
            <FadeIn direction="left" delay={0.8}>
              <Link to="/remote-work">
                <Button
                  icon={<BsArrowLeft />}
                  text="أبدا معنا"
                  variant="secondary"
                  className="m-0 bg-white" // Ensure button contrasts
                />
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Absolutely Positioned Social Icons */}
        {/* Adjust left/right/top/bottom and responsive visibility (e.g., hidden md:flex) as needed */}
        <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 flex-col md:flex lg:left-8">
          <SocialIcons
            // Override container to be a column
            containerClassName="flex flex-col"
            // Override icon colors to be white for better contrast on the gradient
            iconClassName="text-3xl text-white transition-colors hover:text-gray-300"
          />
        </div>
      </section>
    </FadeIn>
  );
};

export default HeroSection;
