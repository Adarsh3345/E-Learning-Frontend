import React from "react";
import {
  Video,
  FileText,
  Clock,
  CalendarDays,
  CheckCircle,
  BookOpenCheck,
  GraduationCap
} from "lucide-react";

const CourseProgressCard = () => {
  const totalLectures = 50;
  const completedLectures = 34;
  const totalWeeks = 6;
  const completedWeeks = 4;
  const quizzesCompleted = 3;
  const totalQuizzes = 4;
  const completionPercent = Math.round((completedLectures / totalLectures) * 100);
  const startDate = "2025-06-15";
  const endDate = "2025-08-01";
  const timeRemaining = "~1.5 hours";

  return (
    <div className="p-6 bg-white border rounded-xl shadow-sm w-full max-w-md mx-auto space-y-6 mt-4">
      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Course Progress</h2>
        <p className="text-sm text-gray-500">Track your course completion status</p>
      </div>

      {/* Circular Progress */}
      <div className="flex justify-center items-center">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="10" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#10b981"
              strokeWidth="10"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={`${283 - (283 * completionPercent) / 100}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-green-600">{completionPercent}%</span>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center space-x-2">
          <Video className="w-4 h-4 text-gray-500" />
          <span>{completedLectures}/{totalLectures} lectures completed</span>
        </div>

        <div className="flex items-center space-x-2">
          <BookOpenCheck className="w-4 h-4 text-gray-500" />
          <span>{completedWeeks}/{totalWeeks} weeks completed</span>
        </div>

        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <span>{quizzesCompleted}/{totalQuizzes} quizzes completed</span>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span>{timeRemaining} remaining</span>
        </div>

        <div className="flex items-center space-x-2">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>Start Date: <strong>{startDate}</strong></span>
        </div>

        <div className="flex items-center space-x-2">
          <CalendarDays className="w-4 h-4 text-gray-500" />
          <span>End Date: <strong>{endDate}</strong></span>
        </div>

        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-green-600 font-medium">You’re on track! 🎯</span>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;
