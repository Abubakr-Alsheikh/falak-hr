import React, { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Button from "@/components/common/public/Button";
import FadeIn from "@components/animations/FadeIn";
import SlideIn from "@components/animations/SlideIn";
import { Link } from "react-router-dom";
import SocialIcons from "@components/common/public/SocialIcons";

const NASA_API_KEY = "LFWyWJ3rSO48cANOGItfWS7cVieBGlB1Gj7uS2Gm"; // Your API key
const APOD_API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

interface ApodResponse {
  url: string;
  hdurl?: string;
  media_type: "image" | "video" | string; // Allow for other types, but we only care about image
  title: string;
  explanation: string;
  // ... other properties
}

const HeroSection: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(
    null
  );
  const [isLoadingApod, setIsLoadingApod] = useState<boolean>(true);
  // Optional: You can use error state to display a message if needed
  // const [apodError, setApodError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApodImage = async () => {
      setIsLoadingApod(true);
      // setApodError(null);
      try {
        const response = await fetch(APOD_API_URL);
        if (!response.ok) {
          throw new Error(`NASA API request failed: ${response.status}`);
        }
        const data: ApodResponse = await response.json();

        if (data.media_type === "image") {
          setBackgroundImageUrl(data.hdurl || data.url); // Prefer HD URL if available
        } else {
          console.warn(
            "Today's APOD is not an image. Using default background."
          );
          // No background image will be set, fallback to gradient
        }
      } catch (error) {
        console.error("Failed to fetch APOD image:", error);
        // setApodError(error instanceof Error ? error.message : "An unknown error occurred");
        // No background image will be set, fallback to gradient
      } finally {
        setIsLoadingApod(false);
      }
    };

    fetchApodImage();
  }, []); // Empty dependency array ensures this runs only once on mount

  const sectionStyle: React.CSSProperties = backgroundImageUrl
    ? {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {}; // Empty object if no image, so CSS class gradient applies

  return (
    <FadeIn direction="up">
      {/* Main section with relative positioning for the overlay and background */}
      <section
        className={`relative m-5 mb-16 mt-32 flex flex-col items-center justify-center rounded-2xl py-5 shadow-2xl md:mt-14 md:h-screen md:py-24 lg:flex-row-reverse 
                    ${
                      !backgroundImageUrl && isLoadingApod
                        ? "gradient-primary-color"
                        : ""
                    }`}
        style={sectionStyle}
      >
        {/* Overlay: Applied only if there's a background image to ensure text readability */}
        {backgroundImageUrl && (
          <div className="absolute inset-0 z-0 rounded-2xl bg-black opacity-60"></div>
        )}

        {/* All content below needs to be on a higher z-index than the overlay */}
        {/* Lottie Animation */}
        <div className="relative z-10 w-full md:max-w-[800px]">
          <SlideIn direction="right" delay={0.2}>
            <DotLottieReact
              src="https://lottie.host/94e3c8d1-60a4-4a05-890c-f5c2ac74981a/t7moSf8EH4.lottie"
              loop
              autoplay
            />
          </SlideIn>
        </div>

        {/* Text Content */}
        <div className="relative z-10 mx-auto px-4 py-8 text-right lg:px-12 lg:py-16">
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
                  className="m-0 bg-white"
                />
              </Link>
            </FadeIn>
          </div>
        </div>

        {/* Absolutely Positioned Social Icons */}
        <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col md:flex lg:left-8">
          <SocialIcons
            containerClassName="flex flex-col"
            iconClassName="text-3xl text-white transition-colors hover:text-gray-300"
          />
        </div>
      </section>
    </FadeIn>
  );
};

export default HeroSection;
