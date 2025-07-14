import React, { useState } from "react";
import { FiEdit, FiMoreHorizontal, FiChevronDown } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SectionItem = ({ title }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl bg-white hover:shadow-sm transition mb-3">
      <div className="flex items-center gap-2">
        <MdDragIndicator className="text-gray-400 cursor-move" size={20} />
        <FiChevronDown className="text-gray-400" size={18} />
        <span className="text-sm font-medium text-gray-800">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="text-sm border px-4 py-1 rounded-md hover:bg-gray-100 text-gray-800">
          Edit
        </button>
        <button>
          <FiMoreHorizontal className="text-gray-500" size={20} />
        </button>
      </div>
    </div>
  );
};

const CourseContentSection = () => {
  const navigate = useNavigate(); // ✅ FIX: Add this line
  const handleAddSection = () => {
    navigate("/create-week");
  };

  const [sections, setSections] = useState([
    "Week 1 - Beginner - Introduction to Business Management",
    "Week 2 - Beginner - Foundations of Company Management",
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Content</h3>
        <button
          onClick={handleAddSection}
          className="text-sm text-purple-600 hover:underline font-medium"
        >
          + Add new section
        </button>
      </div>
      {sections.map((title, index) => (
        <SectionItem key={index} title={title} />
      ))}
    </div>
  );
};

export default CourseContentSection;
