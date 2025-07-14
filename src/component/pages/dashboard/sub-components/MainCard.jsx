import React from "react";
import { FaRegBookmark, FaStar, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import useUserRole from "../../../hook/useUserRole";

const MainCard = () => {
  const role = useUserRole();

  // Student Card View
  if (role === "student") {
    return (
      <div className="bg-white  rounded-2xl shadow-md p-3 w-72 transition">
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/programming-background-collage_23-2149901777.jpg"
            alt="Python course"
            className="rounded-xl w-full h-36 object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/70 p-1 rounded-full">
            <FaRegBookmark className="text-gray-700 " />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm bg-green-100 text-green-600 font-medium px-3 py-1 rounded-full">
            Beginner
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-600 ">
            <span className="flex items-center gap-1">
              <PiStudentFill />
              118
            </span>
            <span className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              5.0
            </span>
          </div>
        </div>

        <h3 className="text-sm mt-2 font-semibold text-gray-800 dark:text-white leading-tight">
          Three-month Course to Learn the Basics of Python and Start Coding.
        </h3>

        <div className="flex items-center gap-2 mt-3">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Instructor"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700 ">Alison Walsh</span>
        </div>
      </div>
    );
  }

  // Teacher Card View
  if (role === "teacher") {
    return (
      <div className="bg-white  rounded-2xl shadow-md p-3 w-72 transition">
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/teacher-online-class-explaining-lesson-laptop_23-2149163341.jpg"
            alt="Active Course"
            className="rounded-xl w-full h-36 object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/80  p-1 rounded-full shadow">
            <FaChalkboardTeacher className="text-gray-700 " />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm bg-purple-100 text-purple-700 font-medium px-3 py-1 rounded-full">
            Active
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-600 ">
            <span className="flex items-center gap-1">
              <PiStudentFill />
              85
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt />
              5 Sessions
            </span>
          </div>
        </div>

        <h3 className="text-sm mt-2 font-semibold leading-tight text-gray-800 ">
          Python Programming - Batch A (Aug - Oct)
        </h3>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">Started: Aug 1, 2025</span>
          <button className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Manage
          </button>
        </div>
      </div>
    );
  }

  return null; // Or loading state if needed
};

export default MainCard;
