import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import DailyAffirmation from "./DailyAffirmation";
import Features from "./Features";
import ResourceCenter from "./ResourceCenter";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <DailyAffirmation />
      <Features />
      <ResourceCenter />
    </div>
  );
};

export default HomePage;