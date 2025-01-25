import React, { useEffect } from "react";
import { FaLeaf, FaPenAlt, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FeaturesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page scrolls to the top on load
  }, []);

  const featuresList = [
    {
      icon: <FaComments />,
      title: "Peer Support",
      description:
        "Connect with like-minded individuals, share experiences, and foster growth through meaningful conversations. Includes a mood tracker to set the tone for your chats.",
      route: "/features/peer-support",
    },
    {
      icon: <FaPenAlt />,
      title: "Stress Journaling",
      description:
        "Manage stress by documenting your thoughts and feelings in a private and structured journaling space.",
      route: "/features/stress-journaling",
    },
    {
      icon: <FaLeaf />,
      title: "Meditation Hub",
      description:
        "Enhance your mindfulness with a meditation timer and guided meditation exercises designed for relaxation.",
      route: "/features/meditation",
    },
  ];

  return (
    <div className="features-page">
      {/* Hero Image Section */}
      <div className="relative h-[70vh]">
        <img
          src="/assets/Photo_8.jpeg"
          alt="Features Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-first-color text-center">
            Our Features
          </h1>
        </div>
      </div>

      {/* Features Section */}
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
                onClick={() => navigate(feature.route)}
                style={{ cursor: "pointer" }}
              >
                <div className="feature-icon text-third-color text-5xl mb-6 transition-colors duration-300 hover:text-white">
                  {feature.icon}
                </div>
                <h3 className="feature-title text-2xl font-semibold text-fourth-color mb-4 transition-colors duration-300 hover:text-white">
                  {feature.title}
                </h3>
                <p className="feature-description text-gray-600 transition-colors duration-300 hover:text-white">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
