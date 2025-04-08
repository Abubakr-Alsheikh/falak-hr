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
  const flexOrder = isReversed
    ? "md:flex md:flex-row-reverse"
    : "md:flex md:flex-row ";
  return (
    <div
      className={`border gap-8 items-center py-8 px-4 max-w-full my-5 rounded-2xl shadow-lg mx-4 ${flexOrder}`}
    >
      <img
        className="w-full flex-1 rounded-xl md:min-w-96"
        src={imageUrl}
        alt="dashboard image"
      />
      <div className="mt-4 text-right md:mt-0">
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
