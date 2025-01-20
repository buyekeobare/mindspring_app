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
        {/* Left side with Home button */}
        <div>
          <button
            onClick={() => handleNavigation("/")}
            className="bg-third-color text-white px-4 py-2 rounded hover:bg-white hover:text-third-color font-semibold"
          >
            Home
          </button>
        </div>

        {/* Right side with links */}
        <div className="flex space-x-6 text-sm md:text-base items-center">
          <Link to="/about" className="hover:text-second-color">
            About
          </Link>
          <button
            onClick={() => handleNavigation("features")}
            className="hover:text-second-color"
          >
            Features
          </button>
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


