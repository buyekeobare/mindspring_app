import React from "react";
import { FaLeaf, FaPenAlt, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();

  const featuresList = [
    {
      icon: <FaComments />,
      title: "Peer Support",
      description:
        "Connect with like-minded individuals, share experiences, and foster growth through meaningful conversations. Includes a mood tracker to set the tone for your chats.",
    },
    {
      icon: <FaPenAlt />,
      title: "Stress Journaling",
      description:
        "Manage stress by documenting your thoughts and feelings in a private and structured journaling space.",
    },
    {
      icon: <FaLeaf />,
      title: "Meditation Hub",
      description:
        "Enhance your mindfulness with a meditation timer and guided meditation exercises designed for relaxation.",
    },
  ];

  return (
    <section
      id="features"
      className="features-section bg-second-color py-12 px-6 scroll-mt-[120px]"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-fourth-color mb-12">
          Explore Our Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="feature-item bg-white shadow-lg rounded-lg p-8 text-center transition-transform duration-300 transform hover:-translate-y-2 hover:bg-third-color hover:shadow-xl"
            >
              <div className="feature-icon text-third-color text-5xl mb-6">
                {feature.icon}
              </div>
              <h3 className="feature-title text-2xl font-semibold text-fourth-color mb-4">
                {feature.title}
              </h3>
              <p className="feature-description text-gray-600">
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
