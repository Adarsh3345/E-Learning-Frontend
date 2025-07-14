import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const CourseHeader = () => {
  const [title, setTitle]=useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    // Add save logic here
    console.log("Course saved!");
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div>
        <p className="text-sm text-gray-400 space-x-1">
          <span className="cursor-pointer hover:underline">Your classroom</span> /
          <span className="cursor-pointer hover:underline ml-1">Your courses</span> /
          <span className="font-semibold ml-1 text-gray-700">
            {title || "Create Course"}
          </span>
        </p>

        {/* Page Title */}
        <h1 className="text-2xl font-bold mt-2 text-gray-900">
          {title || "Create Course"}
        </h1>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleCancel}
          className="px-5 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-purple-300 hover:bg-purple-400 text-white font-semibold rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CourseHeader;
