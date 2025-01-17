import React from "react";
import HeroSection from "./sections/HeroSection";
import AccountSection from "./sections/AccountSection";
import AboutSection from "./sections/AboutSection";
import PricingSection from "./sections/PricingSection";
const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto">
        <AccountSection />
        <AboutSection />
        <PricingSection />
      </div>
    </>
  );
};

export default Home;
