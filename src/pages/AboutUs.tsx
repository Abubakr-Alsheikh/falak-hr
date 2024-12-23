import React from "react";
import AboutUsTitle from "../components/about/AboutUsTitle";
import AboutUsContent from "../components/about/AboutUsContent";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <AboutUsTitle />
      <AboutUsContent />
    </div>
  );
};

export default AboutUs;
