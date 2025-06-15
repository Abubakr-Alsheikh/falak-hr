import React from "react";
import { Button } from "@/components/ui/button"; // Import shadcn/ui Button
import { Link } from "react-router-dom"; // Import Link for internal routing

interface AccountCardProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage?: string;
  buttonLink?: string; // Existing prop for external links
  routePath?: string; // New prop for internal application routes
}

const AccountCard: React.FC<AccountCardProps> = ({
  title,
  description,
  buttonText,
  backgroundImage,
  buttonLink,
  routePath,
}) => {
  // Determine the content/behavior of the button based on provided props
  let buttonContent;
  let isAsChild = false; // Flag to tell shadcn/ui Button to render its child as the button

  if (routePath) {
    // If an internal routePath is provided, render Link as the button's child
    buttonContent = <Link to={routePath}>{buttonText}</Link>;
    isAsChild = true;
  } else if (buttonLink) {
    // If an external buttonLink is provided, render an <a> tag as the button's child
    buttonContent = (
      <a href={buttonLink} target="_blank" rel="noopener noreferrer">
        {buttonText}
      </a>
    );
    isAsChild = true;
  } else {
    // If neither link type is provided, simply render the buttonText
    buttonContent = buttonText;
  }

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="relative flex overflow-hidden rounded-2xl border border-gray-200 bg-white bg-cover bg-center p-6 shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600 dark:hover:bg-gray-700/50 md:p-12 md:p-8"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex h-full flex-1 flex-col items-start justify-start">
        <h2 className="mb-2 text-3xl font-extrabold text-white">{title}</h2>
        <p className="mb-4 text-lg font-normal text-white">{description}</p>

        {/* Use shadcn/ui Button. `variant="default"` is typically the solid primary style. */}
        <Button
          variant="default" // Changed from "primary" as shadcn/ui uses "default" for its primary filled button
          className="w-fit px-6"
          asChild={isAsChild} // Only render as child if linkPath or buttonLink exists
        >
          {buttonContent}
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;
