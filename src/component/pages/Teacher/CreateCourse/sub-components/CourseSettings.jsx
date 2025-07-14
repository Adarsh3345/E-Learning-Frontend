import React, { useState } from "react";

const CourseSettings = () => {
  const [status, setStatus] = useState("Published");
  const [hideCourse, setHideCourse] = useState(false);
  const [level, setLevel] = useState("Beginner");

  return (
    <div className="space-y-6 p-4 bg-white rounded-xl shadow-lg ">
      
      {/* Course Status */}
      <div className="border p-4 rounded-xl">
        <h3 className="font-semibold text-lg mb-2">Course status</h3>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            id="hideCourse"
            checked={hideCourse}
            onChange={() => setHideCourse(!hideCourse)}
            className="mr-2"
          />
          <label htmlFor="hideCourse" className="text-sm text-gray-600">
            Hide this course <span title="If checked, students won't see it.">ℹ️</span>
          </label>
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
