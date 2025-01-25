import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn(`Section ${sectionId} not found`);
      }
    }, 100);
  };

  return (
    <nav className="bg-second-color shadow-md sticky top-[50px] z-40">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-2">
          <img
            src="/assets/mindspring-logo.png"
            alt="Mindspring Logo"
            className="h-10 logo hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex space-x-6 text-sm md:text-base">
          <button
            className="text-fourth-color hover:text-third-color"
            onClick={() => scrollToSection("#daily-affirmation")}
          >
            Daily Affirmation
          </button>
          <button
            className="text-fourth-color hover:text-third-color"
            onClick={() => scrollToSection("#resource-center")}
          >
            Resource Center
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

