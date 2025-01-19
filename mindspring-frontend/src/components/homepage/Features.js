import React from "react";
import { FaLeaf, FaPenAlt, FaComments } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const featuresList = [
    {
      icon: <FaLeaf />,
      title: "Meditation",
      description:
        "Enhance your mindfulness with meditation exercises designed to fit seamlessly into your daily routine.",
    },
    {
      icon: <FaLeaf />,
      title: "Guided Meditation",
      description:
        "Experience inner peace with our expert-guided meditation sessions tailored to relax your mind and body.",
    },
    {
      icon: <FaPenAlt />, 
      title: "Stress Journaling",
      description:
        "Manage stress by documenting your thoughts and feelings in a private and structured journaling space.",
    },
    {
      icon: <FaComments />,
      title: "Peer Support",
      description:
        "Connect with like-minded individuals, share experiences, and foster growth through meaningful conversations.",
    },
  ];

  return (
    <section id="features" className="features-section bg-second-color py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-fourth-color mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="feature-item bg-second-color shadow-md rounded-lg p-6 text-center transition-transform duration-300 transform hover:-translate-y-2 hover:bg-third-color"
            >
              <div className="feature-icon text-fourth-color text-4xl mb-4 transition-colors duration-300 hover:text-second-color">
                {feature.icon}
              </div>
              <h3 className="feature-title text-xl font-semibold text-fourth-color mb-2 transition-colors duration-300 hover:text-second-color">
                {feature.title}
              </h3>
              <p className="feature-description text-fourth-color hover:text-first-color transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            className="see-more-button bg-third-color text-white px-6 py-2 rounded-lg shadow-md hover:bg-fourth-color"
            onClick={() => navigate("/signup")}
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
