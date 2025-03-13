import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative flex items-center justify-center bg-black text-white h-[70vh] overflow-hidden"
    >
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/assets/hero.jpg')",
        }}
      ></div>

      {/* Content */}
      <div className="relative text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-second-color">
          Welcome to Mindspring
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Empowering Your Mental Well-being, One Step at a Time
        </p>
        <div className="space-x-4">
          <button
            className="bg-third-color text-second-color py-2 px-4 rounded shadow hover:bg-fourth-color hover:border border-second-color hover:text-second-color"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;