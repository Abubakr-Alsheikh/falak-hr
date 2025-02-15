import React from "react";

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="p-4 text-center text-red-500">
      <p>خطا: {message}</p>
      <button onClick={onRetry} className="mt-2 text-blue-500">
        إعادة التحميل
      </button>
    </div>
  );
};

export default ErrorDisplay;
