import React, { useEffect, useState } from "react";

const CountdownTimer = ({ hours = 1, minutes = 0, seconds = 0 }) => {
  const [timeLeft, setTimeLeft] = useState(
    hours * 3600 + minutes * 60 + seconds
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value) => String(value).padStart(2, "0");

  const getTimeParts = () => {
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;
    return {
      hrs: formatTime(hrs),
      mins: formatTime(mins),
      secs: formatTime(secs),
    };
  };

  const { hrs, mins, secs } = getTimeParts();

  return (
    <div className="bg-black text-white p-4 rounded-xl w-fit flex flex-col items-center space-y-2 shadow-md">
      <span className="text-sm text-gray-400">Timer</span>
      <div className="flex space-x-1">
        {[...hrs, ":", ...mins, ":", ...secs].map((char, idx) => (
          <div
            key={idx}
            className={`w-8 h-10 rounded-md flex items-center justify-center font-mono text-lg ${
              char === ":" ? "text-white" : "bg-gray-800"
            }`}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
