import React from "react";

const PreviewCourseBox = () => {
  return (
    <div className="bg-black text-white rounded-xl p-5 mt-3 flex items-center justify-between max-w-full shadow-md">
      <div>
        <h3 className="text-base font-semibold">Preview course</h3>
        <p className="text-sm text-gray-400 mt-1">View how others will see your course.</p>
      </div>
      <button className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded-md hover:bg-gray-200 transition">
        Preview
      </button>
    </div>
  );
};

export default PreviewCourseBox;
