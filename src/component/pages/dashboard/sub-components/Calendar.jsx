import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [weekStartDate, setWeekStartDate] = useState(getMonday(new Date()));
  const [weekDays, setWeekDays] = useState([]);

  // Utility: Get the Monday of a given week
  function getMonday(date) {
    const copy = new Date(date);
    const day = copy.getDay();
    const diff = copy.getDate() - day + (day === 0 ? -6 : 1); // adjust when Sunday
    return new Date(copy.setDate(diff));
  }

  // Generate the 7 days of the current week
  function generateWeek(startDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      week.push({
        date: day,
        day: day.getDate(),
        dot: i % 2 === 0, // example logic for dots
      });
    }
    return week;
  }

  useEffect(() => {
    setWeekDays(generateWeek(weekStartDate));
  }, [weekStartDate]);

  const handlePrevWeek = () => {
    const prev = new Date(weekStartDate);
    prev.setDate(weekStartDate.getDate() - 7);
    setWeekStartDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(weekStartDate);
    next.setDate(weekStartDate.getDate() + 7);
    setWeekStartDate(next);
  };

  const getDayClass = (day) => {
    return day.day === selectedDay
      ? "bg-purple-400 text-white"
      : "text-gray-800 hover:bg-gray-200";
  };

  const monthYear = weekStartDate.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-2xl p-4 rounded-xl shadow bg-white">
      {/* Header with Week Navigation */}
      <div className="flex items-center justify-between text-gray-800 mb-4">
        <button onClick={handlePrevWeek} className="px-2 text-lg">{"<"}</button>
        <div className="flex items-center gap-2 font-semibold">
          <FaCalendarAlt />
          <span>{monthYear}</span>
        </div>
        <button onClick={handleNextWeek} className="px-2 text-lg">{">"}</button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 text-center text-gray-400 mb-2 text-sm">
        <span>Mo</span>
        <span>Tu</span>
        <span>We</span>
        <span>Th</span>
        <span>Fr</span>
        <span>Sat</span>
        <span>Su</span>
      </div>

      {/* Week Dates */}
      <div className="grid grid-cols-7 text-center text-sm">
        {weekDays.map((item, idx) => (
          <div key={idx} className="relative">
            <button
              className={`w-8 h-8 rounded-full transition ${getDayClass(item)}`}
              onClick={() => setSelectedDay(item.day)}
            >
              {item.day}
            </button>
            {/* Optional empty dot */}
            {item.dot && (
              <div className="w-1.5 h-1.5 border border-gray-800 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
