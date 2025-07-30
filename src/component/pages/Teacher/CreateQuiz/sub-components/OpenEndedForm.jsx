import React from 'react';

const OpenEndedForm = ({ question, updateQuestion }) => {
  return (
    <>
      {/* Question Input */}
      <textarea
        rows={3}
        value={question.question}
        onChange={(e) => updateQuestion({ question: e.target.value })}
        placeholder="Enter your question here..."
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
      
      {/* Expected Answer (Optional) */}
      <div className="mt-4">
        <label className="text-sm font-medium">Expected Answer (Optional)</label>
        <textarea
          rows={2}
          value={question.expectedAnswer || ''}
          onChange={(e) => updateQuestion({ expectedAnswer: e.target.value })}
          className="w-full border px-3 py-2 rounded mt-1"
          placeholder="What answer are you expecting?"
        />
      </div>

      {/* Explanation Toggle */}
      <div className="mt-4">
        <button
          onClick={() =>
            updateQuestion({
              explanation:
                question.explanation === undefined || question.explanation === null
                  ? ''
                  : undefined,
            })
          }
          className="text-purple-600 text-sm hover:underline flex items-center gap-1"
        >
          {question.explanation === undefined || question.explanation === null
            ? '+ Add an explanation'
            : 'Remove explanation'}
        </button>

        {question.explanation !== undefined && question.explanation !== null && (
          <textarea
            value={question.explanation}
            onChange={(e) => updateQuestion({ explanation: e.target.value })}
            placeholder="Write explanation..."
            className="w-full border mt-2 px-3 py-2 rounded"
          />
        )}
      </div>
    </>
  );
};

export default OpenEndedForm;
