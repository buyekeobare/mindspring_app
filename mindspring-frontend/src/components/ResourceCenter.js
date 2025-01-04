import React, { useState } from "react";

const ResourceCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const resources = [
    {
      title: "Podcast",
      links: [
        { name: "Mindfulness Podcast Episode 1", url: "https://example.com/podcast1" },
        { name: "Relaxation Techniques Episode 2", url: "https://example.com/podcast2" },
      ],
    },
    {
      title: "Stress Management Audio",
      links: [
        { name: "Guided Breathing Audio", url: "https://example.com/audio1" },
        { name: "Relaxation Music", url: "https://example.com/audio2" },
      ],
    },
    {
      title: "Wellness Tips",
      links: [
        { name: "Daily Mindfulness Practices", url: "https://example.com/tip1" },
        { name: "Healthy Sleep Habits", url: "https://example.com/tip2" },
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="resource-center py-12 bg-first-color">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <div>
          <img
            src="/assets/resource-center.jpg"
            alt="Resource Center"
            className="rounded-lg shadow-lg w-full max-w-md mx-auto lg:mx-0" 
          />
        </div>

        {/* Text and Accordion Section */}
        <div>
          <h2 className="text-3xl font-semibold text-fourth-color mb-6 text-center md:text-left">
            Resource Center
          </h2>
          <div className="space-y-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 transition hover:shadow-xl"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex justify-between items-center text-lg font-semibold text-fourth-color focus:outline-none"
                >
                  {resource.title}
                  <span>{openIndex === index ? "-" : "+"}</span>
                </button>
                {openIndex === index && (
                  <ul className="mt-4 space-y-2 pl-4 border-l-4 border-third-color">
                    {resource.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-third-color hover:underline"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceCenter;