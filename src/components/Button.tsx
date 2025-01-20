import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  hideInSmallScreen?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  icon,
  type = "button",
  hideInSmallScreen = false,
  className,
}) => {
  let buttonClasses =
    variant === "primary"
      ? "flex justify-center items-center border-white border transition-colors text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 "
      : "flex justify-center items-center transition-colors text-secondary-500 border border-secondary-500 text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 ";
  buttonClasses += hideInSmallScreen ? " hidden sm:block " : ""
  buttonClasses += className ? className : ""
  return (
    <motion.button type={type} onClick={onClick} className={buttonClasses} dir="ltr" whileTap={{ scale: 0.95 }} whileHover={{scale: 1.1}}>
      {icon && <span className="mr-2 text-lg">{icon}</span>}
      {text}
    </motion.button>
  );
};

export default Button;
