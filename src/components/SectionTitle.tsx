import React from "react";

interface SectionTitleProps {
  title: string;
  center?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, center }) => {
  return (
    <h2
      className={`text-4xl font-bold text-center ${
        center ? "text-center" : "text-right"
      } mb-4`}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
