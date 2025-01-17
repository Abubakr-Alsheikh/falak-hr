import React from "react";
interface TextContentProps {
  text: string;
  center?: boolean;
  className?: string;
}

const TextContent: React.FC<TextContentProps> = ({
  text,
  center,
  className,
}) => {
  let classNameLet = `text-primary-800 mb-4 ${
    center ? "text-center " : "text-right "
  } `;
  classNameLet += className ? className : "";
  return <p className={classNameLet}>{text}</p>;
};

export default TextContent;
