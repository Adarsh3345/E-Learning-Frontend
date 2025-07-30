import React from 'react';

const QuizHeaderBar = ({ title = 'Quiz 1 - Beginner - Title', onPreview, onSave }) => {
  return (
    <div className="flex justify-between items-center bg-[#1C1C1C] text-white px-4 py-3 rounded-lg shadow-sm">
      <div>
        <h2 className="font-semibold text-lg">{title}</h2>
        <div className="text-xs text-gray-400 mt-1">
          <span className="text-green-400">✓</span> Changes saved 2 mins ago
        </div>
        <p className="text-sm text-gray-400 mt-1">Add and customize subsections.</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onPreview}
          className="bg-purple-400 hover:bg-purple-500 text-black font-medium px-4 py-2 rounded-lg transition"
        >
          Preview quiz
        </button>

        <button
          onClick={onSave}
          className="bg-purple-400 hover:bg-purple-500 text-black font-medium px-4 py-2 rounded-lg transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default QuizHeaderBar;
