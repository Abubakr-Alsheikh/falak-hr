import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
      <div className='flex flex-col items-center justify-center rounded-xl border p-6 text-center shadow-lg'>
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary-700 text-6xl text-white">
              {icon}
          </div>
          <h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
  );
};

export default FeatureCard;