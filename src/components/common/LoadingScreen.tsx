import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-100">
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary-700"></div>
    </div>
  );
};

export default LoadingScreen;