import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
      <div className='rounded-xl border p-6 text-center shadow-lg'>
          <div className="h-18 w-18 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary-700 text-6xl text-white lg:h-24 lg:w-24">
              {icon}
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
  );
};

export default FeatureCard;