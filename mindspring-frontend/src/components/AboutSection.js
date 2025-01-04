import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="about-section bg-second-color py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side: Image */}
        <div className="about-image">
          <img
            src="/assets/Photo_5.jpg"
            alt="About Mindspring"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>

        {/* Right side: Content */}
        <div className="about-content text-fourth-color">
          <h2 className="text-3xl font-bold mb-4">About Mindspring</h2>
          <p className="text-lg mb-4">
            Mindspring is your companion in mental wellness, offering tools and
            resources to support your journey toward a healthier mind and body.
          </p>
          <p className="text-lg">
            With features like guided meditation, mood tracking, and community
            forums, we aim to empower individuals to thrive.
          </p>
          <Link
            to="/about"
            className="inline-block mt-6 bg-third-color text-second-color py-2 px-4 rounded shadow hover:bg-fourth-color transition duration-300"
          >
            Read More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;