import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronRight } from "lucide-react";

import CourseHeadCard from "./sub-components/CourseHeadCard";
import CourseContentSection from "./sub-components/CourseContentSection";
import CourseIncludesCard from "./sub-components/CourseIncludesCard";
import CourseProgressCard from "./sub-components/CourseProgressCard";

const CoursePage = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/courses/${course_id}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to fetch course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (course_id) fetchCourse();
  }, [course_id]);

  if (loading) return <p className="text-center">Loading course...</p>;
  if (!course) return <p className="text-center text-red-600">Course not found.</p>;

  return (
    <div className="min-h-screen p-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-1">
        <span className="hover:underline cursor-pointer">Courses</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:underline cursor-pointer">{course.course_topic || "General"}</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">{course.course_name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left Section */}
        <div className="flex-1">
          <CourseHeadCard course={course} />
          <CourseContentSection course_id={course_id} />


        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[300px] flex flex-col gap-4">
          <CourseIncludesCard course={course} />
          <CourseProgressCard course={course} />
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
