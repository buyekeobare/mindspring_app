import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const response = await axios.post(`${API_URL}api/email/send`, formData);
      setStatus("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <div id="contact" className="contact">
      {/* Hero Image Section */}
      <div className="hero-image relative">
        <img
          src="/assets/contact-hero.jpeg"
          alt="Contact Mindspring"
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-second-color text-center">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Contact Details Section */}
      <section className="contact-details bg-second-color py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Get in Touch with Us
            </h2>
            <p className="text-lg text-gray-700">
              Feel free to reach out through the form below or contact us
              directly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Contact Information
              </h3>
              <p className="text-lg text-gray-700">
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="text-third-color hover:underline"
                >
                  +123 456 7890
                </a>
              </p>
              <p className="text-lg text-gray-700">
                Email:{" "}
                <a
                  href="mailto:mindspringapp@outlook.com"
                  className="text-third-color hover:underline"
                >
                  mindspringapp@outlook.com
                </a>
              </p>
              <p className="text-lg text-gray-700">
                Address: 123 Wellness Lane, Mind City
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-800"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-third-color"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-800"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-third-color"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-800"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-third-color"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="form-button bg-third-color text-white px-6 py-2 rounded-lg hover:bg-fourth-color hover:text-second-color"
                  >
                    Submit
                  </button>
                </div>
                {status && (
                  <p className="mt-4 text-sm text-gray-600 text-center">
                    {status}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-fourth-color text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-lg">
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:underline">
              +123 456 7890
            </a>{" "}
            | Email:{" "}
            <a href="mailto:mindspringapp@outlook.com" className="hover:underline">
              mindspringapp@outlook.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
