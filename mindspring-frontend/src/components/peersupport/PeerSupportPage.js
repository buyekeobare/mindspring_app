import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";


const PeerSupportPage = () => {
  const [mood, setMood] = useState(""); // Selected mood
  const [isPublic, setIsPublic] = useState(false); // Mood visibility
  const [messages, setMessages] = useState([]); //Stores Chat
  const [message, setMessage] = useState(""); //Stores user inputs
  const userId = useState(() => Math.floor(Math.random() * 1000));

  // Emojis for mood tracking
  const moodOptions = ["😊", "😢", "😡", "😴", "🤔", "😁"];

  const socket = io("http://localhost:5000")

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  //const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood);
    console.log("Mood selected:", selectedMood);
  };

  const handlePrivacyToggle = () => {
    setIsPublic(!isPublic);
  };

  const handleChatTypeSwitch = (type) => {
    setActiveChatType(type);
  };

  const sendMessage = () => {
    if (message.trim()) {

      const userMessage = {
        userId,
        text: message,
      };

      socket.emit("sendMessage", userMessage);
      setMessage("");
    }
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

      {/* Chat Interface */}
      <div className="chat-interface bg-first-color p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-fourth-color">Chat Box</h2>
        <div className="chat-box mt-4 p-4 bg-second-color rounded-lg h-64 overflow-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <p key={index}>
                <div className={"inline-block max-w-[75%] p-2 bg-white shadow rounded my-2"}>
                  <strong>User {msg.userId}:</strong> {msg.text}
                </div>
              </p>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet...</p>
          )}
        </div>
        <div className="mt-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 border rounded"
          ></textarea>
          <button
            onClick={sendMessage}
            className="mt-2 px-4 py-2 bg-third-color text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeerSupportPage;

