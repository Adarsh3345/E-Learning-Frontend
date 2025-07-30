import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizListPanel from './sub-components/QuizListPanel';
import CountdownTimer from './sub-components/CountdownTimer';
import QuizQuestionCard from './sub-components/QuizQuestionCard';

const CourseQuizPage = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // ← shared index

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/quiz/${quizId}`);
        const data = await res.json();
        if (res.ok) {
          setQuizData(data.quiz);
        } else {
          console.error("Error fetching quiz:", data.error);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (loading) return <div className="p-4">Loading quiz...</div>;
  if (!quizData) return <div className="p-4">Quiz not found.</div>;

  return (
    <div className="w-full h-[90vh] p-4 flex gap-6 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-1/4 flex flex-col justify-between">
        <QuizListPanel
          quiz={quizData}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <div className="mt-1">
          <CountdownTimer
            hours={Math.floor((quizData.quiz_total_time || 0) / 3600)}
            minutes={Math.floor(((quizData.quiz_total_time || 0) % 3600) / 60)}
            seconds={(quizData.quiz_total_time || 0) % 60}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 h-full overflow-y-auto no-scrollbar">
        <QuizQuestionCard
          quiz={quizData}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
};
export default CourseQuizPage;
