import React from "react";
import { useLocation, Link } from "react-router-dom";

const UpperToolbar = () => {
  const location = useLocation();

  const handleNavigation = (anchor) => {
    if (location.pathname === "/") {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${anchor}`;
    }
  };

  return (
    <div className="bg-fourth-color text-first-color sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Left side with Sign Up */}
        <div>
          <Link
            to="/login"
            className="bg-third-color text-white px-4 py-2 rounded hover:bg-white hover:text-third-color"
          >
            Login
          </Link>
        </div>

        {/* Right side with links */}
        <div className="flex space-x-6 text-sm md:text-base items-center">
          {/* Smooth scroll for home page sections */}
          <button
            onClick={() => handleNavigation("/")}
            className="hover:text-second-color"
          >
            Home
          </button>
          <Link to="/about" className="hover:text-second-color">
            About
          </Link>
          <Link to="/features" className="hover:text-second-color">
            Features
          </Link>
          <Link
            to="/contact"
            className="bg-third-color text-white px-4 py-2 rounded hover:bg-white hover:text-third-color"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpperToolbar;