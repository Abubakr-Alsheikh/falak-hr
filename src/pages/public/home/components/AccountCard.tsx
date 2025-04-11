import Button from "@/components/common/public/Button";
import React from "react";
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
      className="relative flex overflow-hidden rounded-2xl border border-gray-200 bg-white bg-cover bg-center p-6 text-center shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-primary-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600 dark:hover:bg-gray-700/50 md:p-12 md:p-8"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 h-full flex-1 flex-col items-start justify-start">
        <h2 className="mb-2 text-3xl font-extrabold text-white">{title}</h2>
        <p className="mb-4 text-lg font-normal text-white">{description}</p>

        <Button
          text={buttonText}
          variant="primary"
          buttonLink="https://forms.gle/qMFC32jfMhBWqyt9A"
          rel="noopener noreferrer"
          className="w-fit"
        />
      </div>
    </div>
  );
};

export default AccountCard;
