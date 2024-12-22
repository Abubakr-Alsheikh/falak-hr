import React from "react";
import Button from "./Button";
interface CardProps {
  title: string;
  description: string;
  buttonText?: string;
  imageUrl?: string;
  onButtonClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  imageUrl,
  onButtonClick,
}) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      {imageUrl && (
        <div className="mb-4 flex justify-center">
          <img
            src={imageUrl}
            alt="Card Image"
            className="h-32 w-48 object-contain opacity-50"
          />
        </div>
      )}
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-4 text-gray-700">{description}</p>
      {buttonText && (
        <Button text={buttonText} variant="secondary" onClick={onButtonClick} />
      )}
    </div>
  );
};

export default Card;
