import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CourseIntroReadSection = () => {
  const { course_content_id } = useParams();
  const [contentBlocks, setContentBlocks] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [quizResults, setQuizResults] = useState([]);
  const [courseName, setCourseName] = useState("unknown");

  // Fetch user email
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) setUserEmail(user.email);
  }, []);

  // Fetch course content blocks and course name
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/course-content-id/${course_content_id}`);
        const content = res.data;
        setContentBlocks(content.course_content_components || []);
        console.log("123456" + JSON.stringify(content.course_content_components))
        const course_id = content.course_id;
        if (course_id) {
          const courseRes = await axios.get(`http://localhost:5000/api/courses/${course_id}`);
          if (courseRes.data?.course_name) {
            setCourseName(courseRes.data.course_name);
          }
        }
      } catch (error) {
        console.error("Failed to load course content or course name", error);
      }
    };

    if (course_content_id) fetchContent();
  }, [course_content_id]);

  // Fetch quiz results for this user
  useEffect(() => {
    const fetchQuizResults = async () => {
      if (!userEmail) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userEmail}/quiz-result`);
        setQuizResults(res.data.quiz_results || []);
      } catch (error) {
        console.error("Failed to fetch quiz results", error);
      }
    };

    fetchQuizResults();
  }, [userEmail]);

  return (
    <div className="w-full px-6 py-10 bg-white text-gray-800 space-y-8 rounded-xl shadow-md">
      {contentBlocks.sort((a, b) => a.position - b.position).map((block, index) => {
        switch (block.type) {
          case "title":
            return <h2 key={index} className="text-2xl font-bold border-l-4 border-purple-600 pl-4">{block.content}</h2>;
          case "para":
            return <p key={index} className="text-base text-gray-700 leading-relaxed">{block.content}</p>;
          case "quiz":
            return block.quizzes.map((quiz, idx) => {
              const result = quizResults.find(r => r.title === quiz.title);
              const isCompleted = result !== undefined;
              const percentage = result?.score || 0;

              const quizLink = isCompleted
                ? `/quiz-result/${userEmail}/${quiz.course_name || courseName || "unknown"}/${quiz.title}`
                : `/quiz/${quiz.quizId}`;


              return (
                <Link
                  to={quizLink}
                  key={`${index}-${idx}`}
                  className={`flex items-center justify-between p-4 rounded-xl transition shadow-sm hover:shadow-md ${isCompleted ? "bg-purple-50 border border-purple-200" : "bg-white border border-gray-300"
                    }`}
                >
                  <div>
                    <h4 className={`text-md font-semibold ${isCompleted ? "text-purple-700" : "text-gray-800"}`}>
                      {quiz.title}
                    </h4>
                    <p className={`text-sm ${isCompleted ? "text-purple-500" : "text-gray-600"}`}>
                      Total Points: {quiz.quiz_total_points}
                    </p>
                  </div>
                  <svg width="48" height="48" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill={isCompleted ? "#F3E8FF" : "#F3F4F6"} />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke={isCompleted ? "#9333EA" : "#6B7280"}
                      strokeWidth="4"
                      strokeDasharray={`${percentage}, 100`}
                      fill="none"
                      transform="rotate(-90 18 18)"
                    />
                    <text x="18" y="22" textAnchor="middle" fontSize="10" fill={isCompleted ? "#9333EA" : "#4B5563"}>
                      {percentage}%
                    </text>
                  </svg>
                </Link>
              );
            });
          default:
            return null;
        }
      })}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-6 border-t mt-6">
        <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition">
          <ChevronLeft size={18} /> Previous
        </button>
        <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition">
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CourseIntroReadSection;
