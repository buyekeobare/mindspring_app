import React, { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  return (
    <div className="about-page">
      {/* Hero Image Section */}
      <div className="relative h-[70vh]">
        <img
          src="/assets/hero.jpg"
          alt="About Mindspring"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-second-color text-center">
            About Mindspring
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Our Mission and Vision
          </h2>
          
        </div>
      </section>
    </div>
  );
};

export default AboutPage;




