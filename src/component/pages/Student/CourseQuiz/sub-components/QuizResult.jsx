import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizResult = () => {
  const { email, course_name, quiz_title } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/users/${email}/courses/${course_name}/quiz/${quiz_title}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");

        setResult(data);

        // Optional: Load full quiz questions separately if needed
        const fullQuiz = JSON.parse(localStorage.getItem("last_quiz_object"));
        if (fullQuiz?.quiz_questions) {
          setQuizQuestions(fullQuiz.quiz_questions);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchQuizResult();
  }, [email, course_name, quiz_title]);

  if (loading) return <div className="p-4">Loading quiz result...</div>;
  if (!result) return <div className="p-4">Result not found</div>;

  const { user_answers, correct_answers, score } = result;
  const total = quizQuestions.length || Object.keys(correct_answers).length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="w-full h-[90vh] bg-white p-6 rounded-2xl shadow-xl border border-gray-200 overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-purple-700">{quiz_title} - Results</h2>
          <p className="text-sm text-gray-600">Course: {course_name}</p>
          <p className="text-sm text-gray-500">
            Score: {score} / {total} ({percentage}%)
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
        >
          Back
        </button>
      </div>

      {quizQuestions.map((question, index) => {
        const userAnswer = user_answers[index];
        const correctAnswer = correct_answers[index];

        let options = question.options;
        if (!Array.isArray(options) || options.length === 0) {
          options = ["True", "False"];
        }

        return (
          <div key={index} className="mb-10 border-b pb-6">
            <p className="font-semibold text-gray-800 mb-2">
              Question {index + 1}: {question.question}
            </p>

            {question.image && (
              <img
                src={
                  question.image.startsWith("data:")
                    ? question.image
                    : `http://127.0.0.1:5000/file/${question.image}`
                }
                alt="Question"
                className="w-full max-h-64 object-cover rounded mb-3 shadow-sm"
              />
            )}

            <div className="space-y-2">
              {options.map((opt, i) => {
                const label = typeof opt === "object" ? opt.text : opt;
                const isCorrect = correctAnswer?.text === label || correctAnswer === label;
                const isSelected = userAnswer?.text === label || userAnswer === label;

                let style = "bg-gray-50 border-gray-200 text-gray-800";
                if (isCorrect && isSelected) {
                  style = "bg-green-100 border-green-300 text-green-700";
                } else if (!isCorrect && isSelected) {
                  style = "bg-red-100 border-red-300 text-red-700";
                } else if (isCorrect) {
                  style = "bg-green-50 border-green-200 text-green-600";
                }

                return (
                  <div
                    key={i}
                    className={`w-full px-4 py-3 rounded-xl border text-left font-medium ${style}`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {question.explanation && (
              <div className="mt-3 text-sm text-gray-500">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuizResult;
