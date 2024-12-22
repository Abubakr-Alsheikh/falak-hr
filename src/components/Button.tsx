import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  icon,
}) => {
  const buttonClasses =
    variant === "primary"
      ? "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      : "bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded";

  return (
    <button onClick={onClick} className={buttonClasses}>
      {icon && <span className="mr-2 inline-block">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
