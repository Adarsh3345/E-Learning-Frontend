import React, { useEffect, useState, useRef } from "react";
import {
  FaCamera,
  FaPaintBrush,
  FaCode,
  FaLanguage,
  FaBook,
  FaLaptopCode,
  FaMusic,
  FaUserTie
} from "react-icons/fa";

// Icon mapping based on course name/type
const iconMap = {
  Photography: FaCamera,
  "Art and Design": FaPaintBrush,
  Programming: FaCode,
  Language: FaLanguage,
  Writing: FaBook,
  Coding: FaLaptopCode,
  Music: FaMusic,
  Business: FaUserTie
};

const MiniCard = () => {
  const [courses, setCourses] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  return (
    <div className="mt-4 mb-4">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 py-2 scrollbar-hide"
      >
        {courses.map((course, index) => {
          const Icon = iconMap[course.name] || FaBook;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 w-64 flex-shrink-0"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-200 p-3 rounded-lg">
                  <Icon className="text-purple-700 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">{course.name}</h3>
                  <p className="text-gray-500 text-sm">{course.status}</p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <div>
                  <p className="text-gray-400">Rate:</p>
                  <p className="font-medium">{course.rating}</p>
                </div>
                <div>
                  <p className="text-gray-400">Type:</p>
                  <p className="font-medium">{course.type}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCard;
