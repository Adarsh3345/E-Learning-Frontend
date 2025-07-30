import React from "react";
import { Star, Bookmark, User, ThumbsUp } from "lucide-react";

const CourseHeadCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 mb-6">

      {/* Top Section: Rating & Bookmark */}
      <div className="flex justify-between items-center mb-3">
        {/* Rating */}
        <div className="flex items-center space-x-2 text-yellow-500 text-sm font-medium">
          <Star className="w-4 h-4 fill-yellow-500" />
          <span>{course.course_review?.toFixed(1) || "4.8"}</span>
          <span className="text-gray-400 font-normal">based on</span>
          <a href="#" className="text-blue-600 underline">236 reviews</a>
        </div>

        {/* Bookmark */}
        <button className="text-purple-600 hover:text-purple-800">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>

      {/* Course Image */}
      <img
        src={course.course_image || "https://via.placeholder.com/800x300"}
        alt={course.course_name}
        className="rounded-xl w-full h-60 object-cover mb-4"
      />

      

      {/* Title & Description */}
      <h2 className="text-2xl font-bold text-gray-900">{course.course_name}</h2>
      <p className="mt-2 text-gray-700">{course.course_description}</p>

      {/* Instructor & Stats */}
      <div className="flex flex-wrap items-center mt-4 gap-6 text-sm text-gray-600">
        {/* Instructor */}
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Instructor"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-gray-900">{course.teacher_name}</span>
        </div>

        {/* Students Count */}
        <div className="flex items-center space-x-1">
          <User className="w-4 h-4" />
          <span>250+ students bought this course</span>
        </div>

        {/* Recommendation */}
        <div className="flex items-center space-x-1">
          <ThumbsUp className="w-4 h-4" />
          <span>98% students recommend this course</span>
        </div>
      </div>
    </div>
  );
};

export default CourseHeadCard;
