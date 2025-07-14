import React, { useState } from "react";
import {
  FaImage,
  FaTh,
  FaVideo,
  FaList,
  FaPaperclip,
  FaTable,
  FaQuestion,
  FaHeading,
  FaAlignLeft,
} from "react-icons/fa";

const componentList = [
  { name: "Title", icon: <FaHeading />, type: "title" },
  { name: "Paragraph", icon: <FaAlignLeft />, type: "para" },
  { name: "Image", icon: <FaImage />, type: "image" },
  { name: "Gallery", icon: <FaTh />, type: "gallery" },
  { name: "Video", icon: <FaVideo />, type: "video" },
  { name: "List", icon: <FaList />, type: "list" },
  { name: "Attachment", icon: <FaPaperclip />, type: "attachment" },
  { name: "Table", icon: <FaTable />, type: "table" },
  { name: "Quiz", icon: <FaQuestion />, type: "quiz" },
];

const ComponentSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (type, name) => {
    setSelected(name);
    onSelect(type);
  };

  return (
    <div className="p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
        Components
      </h3>
      {componentList.map(({ name, icon, type }) => {
        const isActive = selected === name;
        return (
          <button
            key={type}
            onClick={() => handleSelect(type, name)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition 
              ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              }`}
            aria-label={`Add ${name} component`}
          >
            <span className="text-lg">{icon}</span>
            <span className="text-sm font-medium">{name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ComponentSelector;