import React from "react";

const CourseGuideCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-56">
      <h3 className="text-base font-medium mb-2">Course guide</h3>

      <div className="rounded-lg h-24 bg-gradient-to-br from-amber-600 to-orange-400 flex items-center justify-center text-white text-center px-2">
        <div>
          <div className="text-xs">Study Guide</div>
          <div className="text-sm font-semibold mt-1">
            How to create your first course?
          </div>
        </div>
      </div>

      <button className="mt-3 w-full bg-purple-300 hover:bg-purple-400 text-black text-sm font-semibold py-2 rounded-md transition">
        Start guide
      </button>
    </div>
  );
};

export default CourseGuideCard;
