import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
      <div>
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-3xl text-white lg:h-12 lg:w-12">
              {icon}
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
  );
};

export default FeatureCard;