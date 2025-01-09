import React, { useState } from "react";

const PeerSupportPage = () => {
  const [mood, setMood] = useState(""); // Selected mood
  const [isPublic, setIsPublic] = useState(false); // Mood visibility
  const [activeChatType, setActiveChatType] = useState("one-on-one"); // Chat type selection

  // Emojis for mood tracking
  const moodOptions = ["😊", "😢", "😡", "😴", "🤔", "😁"];

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    console.log("Mood selected:", selectedMood);
  };

  const handlePrivacyToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleChatTypeSwitch = (type) => {
    setActiveChatType(type);
  };

  return (
    <div className="peer-support-page bg-second-color min-h-screen p-8">
      {/* Mood Tracker Section */}
      <div className="mood-tracker bg-first-color p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold text-fourth-color">Mood Tracker</h2>
        <div className="flex space-x-4 mt-2">
          {moodOptions.map((emoji, index) => (
            <button
              key={index}
              onClick={() => handleMoodSelection(emoji)}
              className={`text-3xl ${
                mood === emoji ? "border-2 border-third-color" : ""
              } rounded-full p-2 hover:bg-third-color hover:text-white`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={handlePrivacyToggle}
              className="form-checkbox text-third-color"
            />
            <span className="text-fourth-color">
              Make my mood {isPublic ? "Public" : "Private"}
            </span>
          </label>
        </div>
      </div>

      {/* Chat Type Selection */}
      <div className="chat-type-selector bg-first-color p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-bold text-fourth-color">Select Chat Type</h2>
        <div className="flex space-x-4 mt-2">
          <button
            onClick={() => handleChatTypeSwitch("one-on-one")}
            className={`px-4 py-2 rounded ${
              activeChatType === "one-on-one"
                ? "bg-third-color text-white"
                : "bg-fourth-color text-white"
            }`}
          >
            One-on-One Chat
          </button>
          <button
            onClick={() => handleChatTypeSwitch("group")}
            className={`px-4 py-2 rounded ${
              activeChatType === "group"
                ? "bg-third-color text-white"
                : "bg-fourth-color text-white"
            }`}
          >
            Group Chat
          </button>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="chat-interface bg-first-color p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-fourth-color">
          {activeChatType === "one-on-one" ? "One-on-One Chat" : "Group Chat"}
        </h2>
        <div className="chat-box mt-4 p-4 bg-second-color rounded-lg h-64">
          <p className="text-center text-gray-500">Chat content goes here...</p>
        </div>
        <div className="mt-4">
          <textarea
            placeholder="Type a message..."
            className="w-full p-2 border rounded"
          ></textarea>
          <button className="mt-2 px-4 py-2 bg-third-color text-white rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeerSupportPage;
