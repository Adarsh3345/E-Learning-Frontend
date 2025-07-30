import React from 'react';
import MultipleChoiceForm from './MultipleChoiceForm';
import OpenEndedForm from './OpenEndedForm';
import TrueFalseForm from './TrueFalseForm';
import PollForm from './PollForm';

const QuizEditor = ({
  quizName,
  setQuizName,
  quizDescription,
  setQuizDescription,
  questions,
  setQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  updateQuestion
}) => {
  const currentQuestion = questions[currentQuestionIndex] || null;

  return (
    <div className="w-full mx-auto p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-120px)]">
      {/* Quiz Info */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Quiz title..."
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={4}
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded mt-1"
            placeholder="Describe the quiz..."
          />
          <p className="text-xs text-gray-500 mt-1">
            {275 - quizDescription.length} characters left
          </p>
        </div>
      </div>

      {/* Questions Navigation */}
      <div className="flex items-center gap-2 flex-wrap">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className={`relative flex items-center rounded text-sm ${
              currentQuestionIndex === index
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {/* Select Question */}
            <button
              onClick={() => setCurrentQuestionIndex(index)}
              className="px-3 py-1 focus:outline-none"
            >
              {index + 1}. {q.type.replace(/_/g, ' ')}
            </button>

            {/* Remove Question */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newQuestions = questions.filter((_, i) => i !== index);
                setQuestions(newQuestions);

                if (currentQuestionIndex === index) {
                  setCurrentQuestionIndex(0);
                } else if (currentQuestionIndex > index) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                }
              }}
              className="text-xs text-red-600 hover:text-red-800 px-2"
              title="Remove question"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Question Editor */}
      {currentQuestion ? (
        <div className="space-y-4 border-t pt-6">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Question Type Selector */}
            <select
              value={currentQuestion.type}
              onChange={(e) =>
                updateQuestion(currentQuestion.id, { type: e.target.value })
              }
              className="border px-2 py-1 rounded text-sm"
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
              <option value="open_ended">Open Ended</option>
              <option value="poll">Poll</option>
              <option value="reorder">Reorder</option>
              <option value="match">Match</option>
              <option value="drag_drop">Drag and Drop</option>
              <option value="sequencing">Sequencing</option>
            </select>

            {/* Points Selector */}
            <select
              value={currentQuestion.points}
              onChange={(e) =>
                updateQuestion(currentQuestion.id, {
                  points: parseInt(e.target.value),
                })
              }
              className="border px-2 py-1 rounded text-sm"
            >
              <option value={0}>0 points</option>
              <option value={1}>1 point</option>
              <option value={2}>2 points</option>
              <option value={3}>3 points</option>
              <option value={5}>5 points</option>
              <option value={10}>10 points</option>
            </select>
          </div>

          {/* Render appropriate form */}
          {currentQuestion.type === 'multiple_choice' && (
            <MultipleChoiceForm
              question={currentQuestion}
              updateQuestion={(data) =>
                updateQuestion(currentQuestion.id, data)
              }
            />
          )}

          {currentQuestion.type === 'open_ended' && (
            <OpenEndedForm
              question={currentQuestion}
              updateQuestion={(data) =>
                updateQuestion(currentQuestion.id, data)
              }
            />
          )}

          {currentQuestion.type === 'true_false' && (
            <TrueFalseForm
              question={currentQuestion}
              updateQuestion={(data) =>
                updateQuestion(currentQuestion.id, data)
              }
            />
          )}

          {currentQuestion.type === 'poll' && (
            <PollForm
              question={currentQuestion}
              updateQuestion={(data) =>
                updateQuestion(currentQuestion.id, data)
              }
            />
          )}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No questions added yet</p>
          <p className="text-sm mt-2">Click "Add New Question" to get started</p>
        </div>
      )}
    </div>
  );
};

export default QuizEditor;
