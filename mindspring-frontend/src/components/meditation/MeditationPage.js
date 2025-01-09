import React, { useState, useEffect } from "react";

const MeditationPage = () => {
  // Timer States
  const [timerDuration, setTimerDuration] = useState(60); // Default: 1 min
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Guided Meditation State
//   const [tracks] = useState([
//     {
//       id: 1,
//       title: "Relaxing Mindfulness",
//       description: "Focus on the present moment with this guided session.",
//       audioUrl: "/path/to/relaxing-mindfulness.mp3",
//     },
//     {
//       id: 2,
//       title: "Deep Breathing Exercise",
//       description: "Practice slow, deep breaths to relax your body and mind.",
//       audioUrl: "/path/to/deep-breathing.mp3",
//     },
//     {
//       id: 3,
//       title: "Stress Relief Meditation",
//       description: "Let go of stress with this calming meditation.",
//       audioUrl: "/path/to/stress-relief.mp3",
//     },
//   ]);

    // ToDo
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Timer Logic
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      alert("Timer is complete. Great job!");
    }
  }, [isTimerActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(timerDuration);
    setIsTimerActive(true);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
  };

  // Audio Player Logic
  const playTrack = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = new Audio(currentTrack?.audioUrl);
    if (isPlaying) {
      audio.play();
      audio.addEventListener("ended", () => setIsPlaying(false));
    } else {
      audio.pause();
    }
    return () => audio.pause();
  }, [isPlaying, currentTrack]);

  return (
    <div className="p-6 bg-second-color min-h-screen">
      <h2 className="text-3xl font-bold text-center text-fourth-color mb-6">
        Meditation Hub
      </h2>

      <div className="flex justify-between space-x-8">
        {/* Meditation Timer Section */}
        <div className="w-1/2 p-6 bg-white shadow rounded">
          <h3 className="text-xl font-bold mb-4">Meditation Timer</h3>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Set Timer Duration:</label>
            <select
              className="p-2 border rounded w-full"
              value={timerDuration}
              onChange={(e) => setTimerDuration(Number(e.target.value))}
            >
              <option value={60}>1 Minute</option>
              <option value={180}>3 Minutes</option>
              <option value={300}>5 Minutes</option>
            </select>
          </div>

          <div className="text-center mb-4">
            <p className="text-lg font-semibold">
              Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
              {timeLeft % 60} mins
            </p>
          </div>

          <div className="flex space-x-4 justify-center">
            {!isTimerActive && (
              <button
                onClick={startTimer}
                className="bg-third-color text-white px-4 py-2 rounded hover:bg-fourth-color"
              >
                Start
              </button>
            )}
            {isTimerActive && (
              <button
                onClick={stopTimer}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Stop
              </button>
            )}
          </div>
        </div>

        {/* Guided Meditation Section */}
        <div className="w-1/2 p-6 bg-white shadow rounded">
          <h3 className="text-xl font-bold mb-4">Guided Meditation</h3>
          <ul>
            {tracks.map((track) => (
              <li
                key={track.id}
                className="p-4 bg-gray-100 rounded mb-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => playTrack(track)}
              >
                <h4 className="text-lg font-semibold">{track.title}</h4>
                <p className="text-sm text-gray-600">{track.description}</p>
                {currentTrack?.id === track.id && isPlaying && (
                  <p className="text-sm text-green-500">Playing...</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MeditationPage;