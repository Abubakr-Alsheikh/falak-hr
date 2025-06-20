import React from "react";
import Button from "@/components/common/public/Button"; //

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  number?: number;
  buttonLink?: string;
  buttonText?: string;
  onButtonClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  number,
  buttonLink = "",
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex h-full transform flex-col items-center justify-start rounded-xl border border-gray-200 bg-white p-6 text-center shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600 dark:hover:bg-gray-700/50 md:p-8">
      {number !== undefined && (
        <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-bl-lg rounded-tr-lg bg-primary-200 text-sm font-semibold text-primary-700 dark:bg-primary-900/60 dark:text-primary-300 md:text-base">
          {number}
        </div>
      )}
      <div className="mb-3 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-6xl text-primary-700 dark:bg-primary-900/50 dark:text-primary-400">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white md:text-xl">
        {title}
      </h3>
      <p className="mb-2 flex-grow text-base leading-relaxed text-gray-600 dark:text-gray-300">
        {description}
      </p>

      {buttonText && (
        <Button
          text={buttonText}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
          onClick={onButtonClick}
        />
      )}
    </div>
  );
};

export default FeatureCard;
