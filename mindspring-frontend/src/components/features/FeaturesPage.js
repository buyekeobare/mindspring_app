import React, { useEffect } from "react";

const FeaturesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Ensures the page scrolls to the top on load
  }, []);

  return (
    <div className="features-page">
      {/* Hero Image Section */}
      <div className="relative h-[70vh]">
        <img
          src="/assets/features-hero.jpg"
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
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            What Mindspring Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fourth-color mb-4">
                Guided Meditation
              </h3>
              <p className="text-gray-700">
                Access a variety of guided meditations to help you relax, focus, and recharge.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fourth-color mb-4">
                Personalized Audio Therapy
              </h3>
              <p className="text-gray-700">
                Discover tailored audio therapy sessions to suit your mental wellness needs.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fourth-color mb-4">
                Community Support
              </h3>
              <p className="text-gray-700">
                Connect with like-minded individuals in our supportive community space.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fourth-color mb-4">
                Mental Wellness Resources
              </h3>
              <p className="text-gray-700">
                Explore an extensive library of resources to guide your wellness journey.
              </p>
            </div>
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fourth-color mb-4">
                Progress Tracking
              </h3>
              <p className="text-gray-700">
                Monitor your growth and set achievable goals with our tracking tools.
              </p>
            </div>
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-fourth-color mb-4">
                Expert Advice
              </h3>
              <p className="text-gray-700">
                Get insights from professionals to enhance your mental health strategies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;

