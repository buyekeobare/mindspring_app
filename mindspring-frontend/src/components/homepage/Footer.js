import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer id="footer" className="bg-[#476268] text-first-color py-12">
      {/* Top Section */}
      <div className="bg-second-color py-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#476268] mb-4">
            We're Here to Support You
          </h2>
          <p className="text-lg text-gray-700">
            Reach out to us for any inquiries or support. We're just a message
            away.
          </p>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
        {/* Logo and About Section */}
        <div>
          <img
            src="/assets/mindspring-logo.png" 
            alt="Mindspring Logo"
            className="w-40 mb-6"
          />
          <p>
            Mindspring is dedicated to improving mental health through
            innovative tools, resources, and community engagement.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-xl font-semibold text-second-color mb-6">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="#about" className="hover:text-second-color transition">
                About
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-second-color transition">
                Features
              </a>
            </li>
            <li>
              <a
                href="#contact" className="hover:text-second-color transition"
                onClick={() => navigate("/contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div>
          <h3 className="text-xl font-semibold text-second-color mb-6">
            Contact Us
          </h3>
          <ul className="space-y-3">
            <li>Email: support@mindspring.com</li>
            <li>Phone: +254 (728) 456-789</li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-xl font-semibold text-second-color mb-6">
            Follow Us
          </h3>
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-3xl hover:text-second-color transition" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-3xl hover:text-second-color transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-3xl hover:text-second-color transition" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-3xl hover:text-second-color transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t border-gray-600 pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Mindspring. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;