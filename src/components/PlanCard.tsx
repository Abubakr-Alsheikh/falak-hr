import React from "react";
import Button from "./Button";

interface PlanCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  features,
  buttonText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-md">
      <h3 className="mb-2 text-2xl font-bold">{title}</h3>
      <p className="mb-4 text-4xl font-bold">{price}</p>
      <ul className="mb-4">
        {features.map((feature, index) => (
          <li key={index} className="mb-1 text-gray-700">
            {feature}
          </li>
        ))}
      </ul>
      <Button text={buttonText} />
    </div>
  );
};

export default PlanCard;
