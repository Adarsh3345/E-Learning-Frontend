import React from "react";

const CourseSettings = ({
  durationValue,
  setDurationValue,
  durationUnit,
  setDurationUnit,
  level,
  setLevel
}) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-xl shadow-lg">

      {/* Course Duration */}
      <div className="border p-4 rounded-xl">
        <h3 className="font-semibold text-lg mb-2">Course duration</h3>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duration
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            value={durationValue}
            onChange={(e) => setDurationValue(e.target.value)}
            className="w-32 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter number"
          />
          <select
            value={durationUnit}
            onChange={(e) => setDurationUnit(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="weeks">Weeks</option>
            <option value="hours">Hours</option>
          </select>
        </div>
      </div>

      {/* Course Level */}
      <div className="border p-4 rounded-xl">
        <h3 className="font-semibold text-lg mb-2">Course level</h3>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Level
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};

export default CourseSettings;
