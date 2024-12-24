import React from "react";
import Button from "./Button";

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
      className={`gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 sm:py-16 lg:px-6 md:grid md:grid-cols-2 ${isReversed ? "md:grid-cols-2-reverse" : "md:grid-cols-2"}`}
    >
      <img className={`w-full ${isReversed ? "md:order-2" : "md:order-1"}`} src={imageUrl} alt="dashboard image" />
      <div className={`mt-4 text-right md:mt-0 ${isReversed ? "md:order-1" : "md:order-2"}`}>
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
