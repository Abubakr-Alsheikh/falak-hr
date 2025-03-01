import React from "react";
import Button from "../common/public/Button";

interface AboutCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  isReversed?: boolean;
}

const AboutCard: React.FC<AboutCardProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  isReversed,
}) => {
  return (
    <div
      className={`mx-4 my-8 max-w-screen-xl items-center gap-8 rounded-2xl border px-4 py-8 shadow-xl sm:py-16 md:mx-auto md:grid md:grid-cols-3 md:px-0 lg:px-6 xl:gap-16`}
    >
      <img
        className={`w-full rounded-2xl border ${
          isReversed ? "md:order-2" : "md:order-1"
        }`}
        src={imageUrl}
        alt="dashboard image"
      />
      <div
        className={`mt-4 text-right md:mt-0 col-span-2 ${
          isReversed ? "md:order-1" : "md:order-2"
        }`}
      >
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
          {description}
        </p>
        <Button text={buttonText} variant="secondary" />
      </div>
    </div>
  );
};

export default AboutCard;
