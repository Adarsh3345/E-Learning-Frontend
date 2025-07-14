import React from "react";
import { useOutletContext } from "react-router-dom";
import useUserRole from "../../../hook/useUserRole";

function HeadBar() {
  const role = useUserRole();
  const { sidebarOpen } = useOutletContext();

  const isStudent = role === "student";
  const isTeacher = role === "teacher";

  return (
    <div
      className={`bg-black text-white dark:bg-white dark:text-black rounded-xl p-10 pt-9 w-full ${
        sidebarOpen ? "max-w-3xl" : "max-w-5xl"
      } shadow-md mb-4`}
    >
      <p className="text-sm text-gray-400 dark:text-gray-700 mb-5">
        {isStudent ? "Online Course" : "Welcome Teacher"}
      </p>

      <h2 className="text-xl md:text-2xl font-semibold leading-relaxed mb-8">
        {isStudent
          ? "Unlock your potential and achieve your dreams—join our course today and take the first step toward success."
          : "Empower learners, create your course, and inspire growth. Start shaping futures today."}
      </h2>

      {isStudent ? (
        <button className="bg-white text-black dark:bg-black dark:text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition dark:hover:bg-gray-800">
          Enroll now
        </button>
      ) : (
        <button className="bg-white text-black dark:bg-black dark:text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition dark:hover:bg-gray-800">
          Create Course
        </button>
      )}
    </div>
  );
}

export default HeadBar;
