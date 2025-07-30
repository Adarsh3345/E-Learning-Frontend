import React from "react";

const SectionHeader = ({ title, lastSaved, onExit, onPreview}) => {
  return (
    <div className="bg-black text-white dark:bg-white dark:text-black rounded-xl p-4 flex justify-between items-center shadow-md">
      <div>
        <h2 className="text-sm md:text-base font-medium">{title}</h2>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
          Add and customize subsections.
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-700 inline-flex items-center mt-1">
          <svg
            className="w-3 h-3 mr-1 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 5.707 8.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Changes saved {lastSaved || "just now"}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPreview}
          className="bg-purple-400 hover:bg-purple-500 text-black px-4 py-1.5 rounded-md text-sm font-medium transition dark:bg-purple-500 dark:hover:bg-purple-600"
        >
          Preview section
        </button>
        <button
          onClick={onExit}
          className="bg-purple-400 hover:bg-purple-500 text-black px-4 py-1.5 rounded-md text-sm font-medium transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SectionHeader;