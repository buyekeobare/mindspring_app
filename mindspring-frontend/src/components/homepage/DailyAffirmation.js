import React, { useState, useEffect } from "react";

const affirmationsData = {
  Growth: [
    "Every day, I am growing and learning.",
    "I embrace challenges as opportunities to grow.",
    "My potential is limitless.",
  ],
  Empowerment: [
    "I am strong and capable.",
    "I can overcome any obstacle.",
    "I have the power to create change in my life.",
  ],
  Motivation: [
    "I am focused and determined to achieve my goals.",
    "I am in charge of my own happiness.",
    "Every step I take brings me closer to my dreams.",
  ],
  Gratitude: [
    "I am grateful for the good things in my life.",
    "My heart is full of gratitude for today.",
    "I appreciate the small joys in life.",
  ],
};

const DailyAffirmation = () => {
  const [selectedCategory, setSelectedCategory] = useState("Growth");
  const [affirmation, setAffirmation] = useState(affirmationsData["Growth"][0]);
  const [newAffirmation, setNewAffirmation] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const affirmations = affirmationsData[selectedCategory];
      const currentIndex = affirmations.indexOf(affirmation);
      const nextIndex = (currentIndex + 1) % affirmations.length;
      setAffirmation(affirmations[nextIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [affirmation, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setAffirmation(affirmationsData[category][0]);
  };

  const handleAddAffirmation = () => {
    if (newAffirmation.trim()) {
      affirmationsData[selectedCategory].push(newAffirmation.trim());
      setAffirmation(newAffirmation.trim());
      setNewAffirmation("");
    }
  };

  return (
    <section id="daily-affirmation" className="affirmation-section py-12 bg-first-color scroll-mt-[120px]">
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between lg:gap-12">
        {/* Affirmation Text Section */}
        <div className="lg:w-2/5 px-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-fourth-color mb-6">
            Daily Affirmations
          </h2>
          <h3 className="text-xl font-semibold text-fourth-color mb-4">
            Choose Affirmations for Your Journey
          </h3>
          <p className="text-lg italic text-third-color mb-6">
            {affirmation}
          </p>

          {/* Category Selector */}
          <div className="flex justify-center lg:justify-start mb-4 flex-wrap gap-2">
            {Object.keys(affirmationsData).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg shadow-md ${
                  selectedCategory === category
                    ? "bg-third-color text-white"
                    : "bg-white text-third-color border border-third-color"
                } hover:bg-fourth-color hover:text-white`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Add Affirmation Input */}
          <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-start mb-6">
            <input
              type="text"
              value={newAffirmation}
              onChange={(e) => setNewAffirmation(e.target.value)}
              placeholder="Write your own affirmation"
              className="w-full lg:w-auto px-4 py-2 border border-third-color rounded-lg shadow-md"
            />
            <button
              onClick={handleAddAffirmation}
              className="bg-third-color text-white px-6 py-2 rounded-lg shadow-md hover:bg-fourth-color"
            >
              Add Affirmation
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-3/5 px-6 mt-8 lg:mt-0">
          <img
            src="/assets/daily-affirmation.jpg"
            alt="Daily Affirmation"
            className="rounded-lg shadow-md w-full h-auto mx-auto lg:mx-4"
          />
        </div>
      </div>
    </section>
  );
};

export default DailyAffirmation;