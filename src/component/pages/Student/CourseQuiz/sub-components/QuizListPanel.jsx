import React, { useState } from "react";

const QuizListPanel = ({ quiz, currentIndex, setCurrentIndex }) => {
  const questions = quiz.quiz_questions || [];

  return (
    <div className="w-80 h-[70vh] mb-5 bg-white rounded-lg shadow-md p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-600">{quiz.quiz_name}</h2>
          <p className="text-sm text-gray-800 font-medium">
            Time: {quiz.quiz_total_time} sec
          </p>
        </div>
      </div>

      {/* Quiz List */}
      <div className="space-y-3 overflow-y-auto pr-1 no-scrollbar">
        {questions.map((q, i) => {
          const baseClasses =
            "rounded-xl p-4 cursor-pointer transition-shadow shadow-sm hover:shadow-md border";
          const isActive = i === currentIndex;

          return (
            <div
              key={q.id || i}
              onClick={() => setCurrentIndex(i)}
              className={`${baseClasses} ${
                isActive ? "bg-purple-100 border-purple-300" : "bg-gray-50 border-gray-200"
              }`}
            >
              <h4
                className={`text-sm font-semibold mb-1 ${
                  isActive ? "text-purple-700" : "text-gray-700"
                }`}
              >
                Question {i + 1}
              </h4>
              <p className="text-sm text-gray-800 line-clamp-2">{q.question}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default QuizListPanel;