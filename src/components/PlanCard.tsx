import React from 'react';
import Button from './Button';

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  buttonText: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, subtitle, price, features, buttonText }) => {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col rounded-xl border border-gray-100 bg-white p-6 text-center text-gray-900 shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
      <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">{subtitle}</p>
      <div className="my-8 flex items-baseline justify-center">
        <span className="mr-2 text-5xl font-extrabold">{price.split('/')[0]}</span>
        <span className="text-gray-500 dark:text-gray-400"></span>
      </div>
      <ul role="list" className="mb-8 space-y-4 text-left">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <svg className="ml-2 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button text={buttonText} variant="secondary"/>
    </div>
  );
};

export default PricingCard;