import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

const UpperToolbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (anchor) => {
    if (location.pathname === "/") {
      // Smooth scroll on the home page
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home and scroll to the anchor
      navigate("/");
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Allow time for homepage to load
    }
  };

  return (
    <div className="bg-fourth-color text-first-color sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Left side with Login */}
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
          {/* Navigation for home page sections */}
          <button
            onClick={() => handleNavigation("home")}
            className="hover:text-second-color"
          >
            Home
          </button>
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