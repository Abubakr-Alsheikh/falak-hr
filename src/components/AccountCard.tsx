import React from "react";
import Button from "./Button";
interface AccountCardProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage?: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  title,
  description,
  buttonText,
  backgroundImage,
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="relative flex overflow-hidden rounded-2xl border bg-cover bg-center p-8 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:p-12"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 h-full flex-1 flex-col items-start justify-start">
        <h2 className="mb-2 text-3xl font-extrabold text-white">{title}</h2>
        <p className="mb-4 text-lg font-normal text-white">{description}</p>
        <Button text={buttonText} variant="primary" />
      </div>
    </div>
  );
};

export default AccountCard;
