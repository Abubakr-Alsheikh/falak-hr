import React from "react";
import Button from "./Button";

interface AboutCardProps {
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  isReversed?: boolean;
}

const AboutCard: React.FC<AboutCardProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  buttonLink,
  isReversed,
}) => {
  return (
    <div
      className={`mx-4 my-8 max-w-screen-xl items-center gap-8 rounded-2xl border border-gray-200 bg-white p-6 px-4 py-8 text-center shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600 dark:hover:bg-gray-700/50 md:mx-4 md:grid md:grid-cols-3 md:p-8 md:px-0 lg:px-6`}
    >
      <img
        className={`w-full rounded-2xl border ${
          isReversed ? "md:order-2" : "md:order-1"
        }`}
        src={imageUrl}
        alt={`${title}`}
      />
      <div
        className={`mt-4 text-right md:mt-0 col-span-2 ${
          isReversed ? "md:order-1" : "md:order-2"
        }`}
      >
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
          {description}
        </p>
        <div>
          <Button
            text={buttonText}
            variant="secondary"
            buttonLink={buttonLink}
            className="w-fit"
            rel="noopener noreferrer"
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
