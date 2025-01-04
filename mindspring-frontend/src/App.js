// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UpperToolbar from "./components/UpperToolbar";
import Navbar from "./components/Navbar"; 
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import DailyAffirmation from "./components/DailyAffirmation";
import Features from "./components/homepage/Features";
import ResourceCenter from "./components/ResourceCenter";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <UpperToolbar />
      <Navbar /> 
      <HeroSection />
      <AboutSection />
      <DailyAffirmation />
      <Features />
      <ResourceCenter />
      <Footer />
    </Router>
  );
};

export default App;