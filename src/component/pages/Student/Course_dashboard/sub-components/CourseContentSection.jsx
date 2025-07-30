import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CourseContentSection = ({ course_id }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/course-content/${course_id}`);
        setContent(res.data); 
        console.log("Course content loaded:", res.data);
      } catch (err) {
        console.error("Error loading course content", err);
      }
    };

    if (course_id) fetchContent();
  }, [course_id]);

  const renderWeekCard = (block, index) => {
    const titleBlock = block.course_content_components.find(c => c.type === "title");
    const paraBlock = block.course_content_components.find(c => c.type === "para");

    const title = titleBlock?.content || `Week ${index + 1}`;
    const description = paraBlock?.content || "";

    const progress = block.progress || 22;

    return (
      <Link
        to={`/course/${course_id}/content/${block.course_content_id}`}
        key={index}
        className="flex justify-between items-center border rounded-lg p-4 mb-4 bg-gray-50 hover:shadow transition"
      >
        <div className="flex flex-col">
          <h3 className="font-semibold text-md text-gray-800">
            Week {index + 1} – {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>

        {/* Circular Progress */}
        <div className="text-purple-600 font-medium text-xs flex flex-col items-center">
          <svg width="36" height="36" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="16" fill="#F3E8FF" />
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="#9333EA"
              strokeWidth="4"
              strokeDasharray={`${(progress / 100) * 100}, 100`}
              fill="none"
            />
            <text x="18" y="22" textAnchor="middle" fontSize="10" fill="#9333EA">
              {progress}%
            </text>
          </svg>
        </div>
      </Link>
    );
  };

  if (!content || content.length === 0) {
    return <p>Loading course content...</p>;
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Course Content</h2>
      {[...content].reverse().map((block, index) => renderWeekCard(block, index))}
    </div>
  );
};

export default CourseContentSection;
