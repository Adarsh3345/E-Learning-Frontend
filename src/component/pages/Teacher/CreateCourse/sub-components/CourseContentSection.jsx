import React from "react";
import { FiMoreHorizontal, FiChevronDown } from "react-icons/fi";
import { MdDragIndicator } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCourseContext } from "../../../../context/CourseContext";

const SectionItem = ({ title, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl bg-white hover:shadow-sm transition mb-3">
      <div className="flex items-center gap-2">
        <MdDragIndicator className="text-gray-400 cursor-move" size={20} />
        <FiChevronDown className="text-gray-400" size={18} />
        <span className="text-sm font-medium text-gray-800">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={onEdit}
          className="text-sm border px-4 py-1 rounded-md hover:bg-gray-100 text-gray-800"
        >
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
  const navigate = useNavigate();
  const { course, updateCourse } = useCourseContext();
  const sections = course.sections;

  const handleEditContent = (index) => {
    navigate(`/week/${index}`);
  };

  const handleAddSection = () => {
    const newSectionTitle = `Week ${sections.length + 1} - ${course.level} - New Section`;
    const newSections = [...sections, newSectionTitle];
    updateCourse({ sections: newSections });
    navigate(`/week/${sections.length}`); 
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Content</h3>
        <button
          onClick={handleAddSection}
          className="ml-2 text-blue-500 hover:text-blue-700 text-sm font-medium"
        >
          + Add new section
        </button>
      </div>
      {sections.map((title, index) => (
        <SectionItem 
          key={index} 
          title={title} 
          onEdit={() => handleEditContent(index)} 
        />
      ))}
    </div>
  );
};

export default CourseContentSection;