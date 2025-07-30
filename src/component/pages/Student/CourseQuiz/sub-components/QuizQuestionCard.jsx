import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizQuestionCard = ({ quiz, currentIndex, setCurrentIndex }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [courseName, setCourseName] = useState(quiz.course_name || "");
  const navigate = useNavigate();

  const course_id = quiz.course_id;
  const questionData = quiz.quiz_questions[currentIndex];

  // Fetch course name if missing
  useEffect(() => {
    const fetchCourseName = async () => {
      if (!courseName && course_id) {
        try {
          const res = await fetch(`http://127.0.0.1:5000/api/courses/${course_id}`);
          const data = await res.json();
          if (res.ok && data.course_name) {
            setCourseName(data.course_name);
          } else {
            setCourseName("Unknown Course");
          }
        } catch {
          setCourseName("Unknown Course");
        }
      }
    };
    fetchCourseName();
  }, [course_id, courseName]);

  // Store selected and correct answer
  useEffect(() => {
    const existingAnswer = userAnswers[currentIndex];
    setSelectedOption(existingAnswer || null);

    const correct =
      Array.isArray(questionData.options) && questionData.correctIndex !== undefined
        ? questionData.options[questionData.correctIndex]
        : questionData.correctAnswer;

    setCorrectAnswers((prev) => ({
      ...prev,
      [currentIndex]: correct,
    }));
  }, [currentIndex]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    let score = 0;
    Object.keys(correctAnswers).forEach((qIndex) => {
      const correct = correctAnswers[qIndex];
      const user = userAnswers[qIndex];
      const correctText = typeof correct === "object" ? correct?.text : correct;
      const userText = typeof user === "object" ? user?.text : user;
      if (correctText === userText) score += 1;
    });

    const percentage = Math.round((score / quiz.quiz_questions.length) * 100);
    const quiz_title = quiz.quiz_name;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!user || !token) {
        alert("User not logged in");
        return;
      }

      await fetch(`http://127.0.0.1:5000/api/users/${user.email}/add-course`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_name: courseName,
          quizzes: [
            {
              quiz_title,
              score: percentage,
              user_answers: userAnswers,
              correct_answers: correctAnswers,
            },
          ],
        }),
      });

      localStorage.setItem("last_quiz_object", JSON.stringify(quiz));
    } catch (err) {
      console.error("Error submitting quiz result:", err);
    }

    navigate(`/quiz-result/${JSON.parse(localStorage.getItem("user")).email}/${courseName}/${quiz_title}`);
  };

  if (!questionData) return <div className="p-4">No question available.</div>;

  // Handle options sanitization
  let options = questionData.options;
  if (
    !Array.isArray(options) ||
    options.length === 0 ||
    (typeof options[0] === "object" && !options[0]?.text)
  ) {
    options = ["True", "False"];
  } else {
    options = options.filter(
      (opt) =>
        opt !== null &&
        opt !== undefined &&
        (typeof opt === "string" || (typeof opt === "object" && typeof opt.text === "string"))
    );
  }

  return (
    <div className="w-full h-[90vh] bg-white p-6 rounded-2xl shadow-xl border border-gray-200 overflow-y-auto no-scrollbar">
      <div className="flex items-start justify-between text-sm mb-4 border-b pb-3">
        <div>
          <p className="text-purple-600 font-medium">
            Question {currentIndex + 1} of {quiz.quiz_questions.length}
          </p>
          <p className="font-semibold text-gray-800">{quiz.quiz_name}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        >
          End Quiz
        </button>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">{questionData.question}</h3>

      {questionData.image && (
        <img
          src={
            questionData.image.startsWith("data:")
              ? questionData.image
              : questionData.image.includes("base64")
              ? questionData.image.replace("/get-file/", "")
              : `http://127.0.0.1:5000/file/${questionData.image}`
          }
          alt="Quiz"
          className="w-full rounded-lg object-cover max-h-64 shadow-sm mb-4"
        />
      )}

      <div className="space-y-3">
        {options.map((option, index) => {
          if (!option) return null;

          const label =
            typeof option === "object"
              ? option?.text || "Untitled Option"
              : option;

          const isSelected =
            selectedOption === option ||
            (typeof option === "object" &&
              typeof selectedOption === "object" &&
              option?.text === selectedOption?.text);

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`w-full text-left px-4 py-3 rounded-xl border transition font-medium ${
                isSelected
                  ? "bg-purple-100 border-purple-300 text-purple-700"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-6 border-t mt-6">
        {currentIndex > 0 ? (
          <button
            onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
          >
            Prev
          </button>
        ) : (
          <div />
        )}

        {currentIndex === quiz.quiz_questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((i) => Math.min(i + 1, quiz.quiz_questions.length - 1))}
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizQuestionCard;
