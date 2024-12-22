import React from 'react';
interface TextContentProps {
    text: string;
}

const TextContent: React.FC<TextContentProps> = ({text}) => {
  return (
    <p className="text-right text-gray-700">{text}</p>
  );
};

export default TextContent;