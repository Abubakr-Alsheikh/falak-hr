import React from "react";
import HeroSection from "../components/home/HeroSection";
import AccountSection from "../components/home/AccountSection";
import AboutSection from "../components/home/AboutSection";
import PricingSection from "../components/home/PricingSection";
const Home: React.FC = () => {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <AccountSection />
      <AboutSection />
      <PricingSection />
    </div>
  );
};

export default Home;