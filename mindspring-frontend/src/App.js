// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UpperToolbar from "./components/UpperToolbar";
import Navbar from "./components/Navbar"; 
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import DailyAffirmation from "./components/DailyAffirmation";
import Features from "./components/Features";

const App = () => {
  return (
    <Router>
      <UpperToolbar />
      <Navbar /> 
      <HeroSection />
      <AboutSection />
      <DailyAffirmation />
      <Features />
    </Router>
  );
};

export default App;