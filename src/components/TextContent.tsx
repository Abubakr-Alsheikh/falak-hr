import React from 'react';
interface TextContentProps {
    text: string;
    center?: boolean;
  }

const TextContent: React.FC<TextContentProps> = ({text, center}) => {
  return (
    <p className={`text-gray-700 mb-8 ${
      center ? "text-center" : "text-right"
    } `}>{text}</p>
  );
};

export default TextContent;