// src/components/common/public/Button.tsx
import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  onClick?: () => void; // Still useful if no link is provided
  buttonLink?: string; // Added prop for the link URL
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Relevant only for <button>
  hideInSmallScreen?: boolean;
  className?: string;
  disabled?: boolean;
  // Optional: Add props for <a> tag behavior like target
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  buttonLink, // Destructure the new prop
  variant = "primary",
  icon,
  type = "button",
  hideInSmallScreen = false,
  className,
  disabled,
  target, // Destructure target
  rel, // Destructure rel
}) => {
  // Define base classes - applied to both <a> and <button>
  let baseClasses =
    "flex justify-center items-center transition-colors font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none focus:ring-4 ";

  // Add variant-specific classes
  if (variant === "primary") {
    baseClasses +=
      "border-white border text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ";
  } else {
    // secondary
    baseClasses +=
      "text-secondary-500 border border-secondary-500 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ";
  }

  // Add hideInSmallScreen class if needed
  baseClasses += hideInSmallScreen ? " hidden sm:flex " : " flex "; // Use flex instead of block for consistency

  // Add custom className if provided
  baseClasses += className ? className : "";

  // Add disabled styles if needed (visual cue for both a/button)
  if (disabled) {
    baseClasses += " opacity-50 cursor-not-allowed ";
  }

  const motionProps = {
    whileTap: disabled ? {} : { scale: 0.95 },
    whileHover: disabled ? {} : { scale: 1.05 }, // Adjusted hover slightly
    transition: { duration: 0.1 }, // Smoother transition
  };

  // Content of the button/link
  const content = (
    <>
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      {text}
    </>
  );

  // Conditionally render <a> if buttonLink is provided
  if (buttonLink && !disabled) {
    return (
      <motion.a
        href={buttonLink}
        className={baseClasses}
        dir="ltr"
        target={target} // Pass target
        rel={target === "_blank" ? rel || "noopener noreferrer" : rel} // Add rel for target="_blank"
        {...motionProps}
        // onClick might still be useful for tracking, etc., but default link behavior will occur
        onClick={onClick}
      >
        {content}
      </motion.a>
    );
  }

  // Otherwise, render the <button>
  return (
    <motion.button
      type={type}
      onClick={!disabled ? onClick : undefined} // Prevent onClick if disabled
      className={baseClasses}
      dir="ltr"
      disabled={disabled}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
};

export default Button;
