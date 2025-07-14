import React from "react";
import { FaUndo, FaRedo, FaQuestionCircle } from "react-icons/fa";

const ControlCenter = () => {
  return (
    <div className="bg-black text-white p-4 rounded-xl w-56 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium">Controlling centre</span>
        <FaQuestionCircle className="text-gray-300" size={14} />
      </div>
      <div className="flex justify-between gap-2">
        <button className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-1.5 rounded-md transition">
          <FaUndo size={12} />
          Undo
        </button>
        <button className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-1.5 rounded-md transition">
          Redo
          <FaRedo size={12} />
        </button>
      </div>
    </div>
  );
};

export default ControlCenter;
