import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <span className="text-xl font-bold text-fourth-color">
            Mindspring
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm md:text-base">
          <Link to="/daily-affirmation" className="text-fourth-color hover:text-third-color">
            Daily Affirmation
          </Link>
          <Link to="/resource-center" className="text-fourth-color hover:text-third-color">
            Resource Center
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;