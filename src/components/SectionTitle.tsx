import React from "react";

interface SectionTitleProps {
  title: string;
  center?: boolean;
  isHeader?: boolean;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  center,
  isHeader,
  subtitle,
}) => {
  const headerClasses = isHeader
    ? "gradient-primary-color text-white rounded-3xl py-10 text-center max-w-screen-lg mb-12"
    : "";
  const titleClasses = isHeader
    ? "text-4xl font-extrabold tracking-tight dark:text-white md:text-4xl lg:text-5xl"
    : "text-4xl font-bold text-center";

  return (
    <div
      className={`mb-4 mx-3 px-3 md:mx-auto ${headerClasses} ${
        center ? "text-center" : "text-right"
      }`}
    >
      <h2 className={`${titleClasses}`}>{title}</h2>
      {isHeader && subtitle && (
        <p className="mt-4 text-lg font-light text-gray-200 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
