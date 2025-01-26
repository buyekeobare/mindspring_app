import React, { useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const UpperToolbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
  };

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
        {/* Left side: Navigation */}
        <div>
          {isAuthenticated ? (
            <Link
              to="/features"
              className="bg-third-color text-white px-4 py-2 rounded hover:bg-white hover:text-third-color"
            >
              Features
            </Link>
          ) : (
            <button
              onClick={() => handleNavigation("home")}
              className="bg-third-color text-white px-4 py-2 rounded hover:bg-white hover:text-third-color"
            >
              Home
            </button>
          )}
        </div>

        {/* Right side: Welcome message and Logout */}
        <div className="flex space-x-6 items-center">
          {isAuthenticated && (
            <span className="text-sm md:text-base">
              Welcome <strong>{user?.username}</strong>!
            </span>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-third-color text-white px-4 py-2 rounded hover:bg-white hover:text-third-color"
            >
              Logout
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpperToolbar;
