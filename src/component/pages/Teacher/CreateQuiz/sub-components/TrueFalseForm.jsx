// sub-components/TrueFalseForm.js
import React from 'react';
import { FaEquals } from 'react-icons/fa';

const TrueFalseForm = ({ question, updateQuestion }) => {
  const handleCorrectAnswerChange = (value) => {
    updateQuestion({ correctAnswer: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-gray-600 mb-2">
        <FaEquals />
        <span className="text-sm font-medium">True/False Question</span>
      </div>

      <textarea
        rows={3}
        value={question.question}
        onChange={(e) => updateQuestion({ question: e.target.value })}
        placeholder="Enter your true/false statement here..."
        className="w-full border px-3 py-2 rounded mt-2"
      />

<div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image (Optional)</label>

                <input
                    id={`upload-image-${question.id}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                updateQuestion({ image: reader.result });
                            };
                            reader.readAsDataURL(file);
                        }
                    }}
                    className="hidden"
                />

                <button
                    onClick={() =>
                        document.getElementById(`upload-image-${question.id}`).click()
                    }
                    className="text-purple-600 text-sm hover:underline"
                >
                    + Choose Image
                </button>

                {question.image && (
                    <div className="mt-2 w-full" style={{ height: '30%' }}>
                        <img
                            src={question.image}
                            alt="Question"
                            className="w-full h-64 object-contain rounded border"
                        />
                        <button
                            onClick={() => updateQuestion({ image: null })}
                            className="text-red-500 text-xs mt-1 hover:underline"
                        >
                            Remove image
                        </button>
                    </div>
                )}
            </div>
            
      <div className="space-y-3 mt-4">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            name={`trueFalse-${question.id}`}
            checked={question.correctAnswer === true}
            onChange={() => handleCorrectAnswerChange(true)}
            className="w-4 h-4 text-purple-600"
          />
          <div className="px-4 py-3 bg-gray-50 rounded-lg flex-1 border border-gray-200">
            <span className="font-medium">True</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="radio"
            name={`trueFalse-${question.id}`}
            checked={question.correctAnswer === false}
            onChange={() => handleCorrectAnswerChange(false)}
            className="w-4 h-4 text-purple-600"
          />
          <div className="px-4 py-3 bg-gray-50 rounded-lg flex-1 border border-gray-200">
            <span className="font-medium">False</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={() => updateQuestion({ 
            explanation: question.explanation === undefined ? '' : undefined 
          })}
          className="text-purple-600 text-sm hover:underline flex items-center gap-1"
        >
          {question.explanation === undefined ? '+ Add an explanation' : 'Remove explanation'}
        </button>
        
        {question.explanation !== undefined && (
          <textarea
            value={question.explanation}
            onChange={(e) => updateQuestion({ explanation: e.target.value })}
            placeholder="Explain why this is the correct answer..."
            className="w-full border mt-2 px-3 py-2 rounded"
            rows={3}
          />
        )}
      </div>
    </div>
  );
};

export default TrueFalseForm;