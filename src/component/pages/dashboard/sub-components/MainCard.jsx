import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaStar, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import useUserRole from "../../../hook/useUserRole";
import axios from "axios";
import { Link } from "react-router-dom";
const MainCard = () => {
  const role = useUserRole();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/courses/student");
        setCourses(res.data.courses || []);
        console.log("Fetched courses:", res.data.courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (role === "student") {
      fetchCourses();
    }
  }, [role]);

  // Student Card View
  if (role === "student") {
    if (loading) {
      return <p className="text-center">Loading courses...</p>;
    }

    if (!Array.isArray(courses) || courses.length === 0) {
      return <p className="text-center">No courses found.</p>;
    }

    return (
      <div className="flex flex-wrap gap-6">
        {courses.map((course) => {
          const teacherInitial = course.teacher_name?.charAt(0)?.toUpperCase() || "T";

          return (
            <Link
          to={`/course/${course.course_id}`} // ✅ Makes the entire card a clickable link
          key={course.course_id}
          className="bg-white rounded-2xl shadow-md p-3 w-72 transition hover:shadow-lg hover:scale-[1.01] duration-200"
        >
              <div className="relative">
                <img
                  src={course.course_image || "https://img.freepik.com/free-photo/programming-background-collage_23-2149901777.jpg"}
                  alt={course.course_name}
                  className="rounded-xl w-full h-36 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/70 p-1 rounded-full">
                  <FaRegBookmark className="text-gray-700" />
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-sm bg-green-100 text-green-600 font-medium px-3 py-1 rounded-full">
                  {course.course_level || "Beginner"}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1 text-yellow-500">
                    <FaStar />
                    {course.course_review?.toFixed(1) || "0.0"}
                  </span>
                </div>
              </div>

              <h3 className="text-sm mt-2 font-semibold text-gray-800 leading-tight line-clamp-2">
                {course.course_description}
              </h3>

              <div className="flex items-center gap-2 mt-3">
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {teacherInitial}
                </div>
                <span className="text-sm font-medium text-gray-700">{course.teacher_name || "Teacher"}</span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  // Teacher Static Card
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

  return null;
};

export default MainCard;
