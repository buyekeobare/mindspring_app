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
      }
    }, 100); // Delay to ensure HomePage is loaded
  };

  return (
    <nav className="bg-second-color shadow-md sticky top-[60px] z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/assets/mindspring-logo.png"
            alt="Mindspring Logo"
            className="h-10"
          />
          <span className="text-xl font-bold text-fourth-color">Mindspring</span>
        </div>

        {/* Navigation Links */}
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