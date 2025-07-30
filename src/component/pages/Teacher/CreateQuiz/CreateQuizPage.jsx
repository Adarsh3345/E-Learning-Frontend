import React, { useState, useEffect } from 'react';
import QuizHeaderBar from './sub-components/QuizHeaderBar';
import QuestionTypeSelector from './sub-components/QuestionTypeSelector';
import QuizEditor from './sub-components/QuizEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { useCourseContext } from '../../../context/CourseContext';

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const { sectionIndex, componentIndex, quizIndex } = useParams();
  const { weekContent, updateQuiz, bulkTime, setBulkTime, bulkPoints, setBulkPoints } = useCourseContext();

  const sectionIdx = parseInt(sectionIndex);
  const componentIdx = parseInt(componentIndex);
  const quizIdx = parseInt(quizIndex);

  const [quizName, setQuizName] = useState('Final Assessment');
  const [quizDescription, setQuizDescription] = useState(
    'This quiz will assess your overall understanding of the course.'
  );
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 🧠 Convert string to number of seconds or 0
  const getTimeInSeconds = (timeStr) => {
    const seconds = parseInt(timeStr.split(' ')[0]);
    return isNaN(seconds) ? 0 : seconds;
  };

  const getPointsValue = (pointsStr) => {
    const points = parseInt(pointsStr.split(' ')[0]);
    return isNaN(points) ? 0 : points;
  };

  // 📥 Load quiz data
  useEffect(() => {
    const section = weekContent.components?.[sectionIdx] || [];
    const component = section[componentIdx] || {};
    const quiz = component.quizzes?.[quizIdx] || {};

    setQuizName(quiz.title || 'Final Assessment');
    setQuizDescription(quiz.description || 'This quiz will assess your overall understanding of the course.');
    setQuestions(quiz.questions || []);
  }, [sectionIdx, componentIdx, quizIdx, weekContent]);

  // ➕ Add new question using bulk settings
  const handleAddQuestion = (type) => {
    const newQuestion = {
      id: Date.now(),
      type,
      time: getTimeInSeconds(bulkTime),
      points: getPointsValue(bulkPoints),
      question: '',
      explanation: '',
      ...(type === 'multiple_choice' && {
        allow_multiple_answers: 'no',
        options: [{ text: '' }, { text: '' }]
      }),
      ...(type === 'true_false' && {
        options: [{ text: 'True' }, { text: 'False' }]
      }),
      ...(type === 'open_ended' && {
        expected_answer: ''
      }),
      ...(type === 'poll' && {
        options: [
          { text: 'Option 1', clicks: 0 },
          { text: 'Option 2', clicks: 0 }
        ]
      })
    };

    setQuestions(prev => {
      const updated = [...prev, newQuestion];
      setCurrentQuestionIndex(updated.length - 1);
      return updated;
    });
  };

  const updateQuestion = (id, updatedData) => {
    setQuestions(prev => prev.map(q =>
      q.id === id ? { ...q, ...updatedData } : q
    ));
  };

  const quiz_total_time = questions.reduce((sum, q) => sum + (q.time || 0), 0);
  const quiz_total_points = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  const handleSave = () => {
    const quizData = {
      title: quizName,
      description: quizDescription,
      questions,
      quiz_total_time,
      quiz_total_points
    };

    updateQuiz(sectionIdx, componentIdx, quizIdx, quizData);
    console.log("✅ Quiz saved to context");
    navigate(-1);
  };

  return (
    <div>
      <QuizHeaderBar
        title={`Quiz ${quizIdx + 1}`}
        onPreview={() => console.log("Preview clicked")}
        onSave={handleSave}
      />

      <div className="flex p-4 gap-6">
        <div className="flex-shrink-0">
          <QuestionTypeSelector
            onSelect={handleAddQuestion}
            onTimeChange={setBulkTime}
            onPointsChange={setBulkPoints}
          />
        </div>

        <div className="flex-1 overflow-y-auto h-[calc(100vh-80px)] pr-2 shadow-md">
          <QuizEditor
            quizName={quizName}
            setQuizName={setQuizName}
            quizDescription={quizDescription}
            setQuizDescription={setQuizDescription}
            questions={questions}
            setQuestions={setQuestions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            updateQuestion={updateQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
