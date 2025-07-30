import React from 'react';

const PollForm = ({ question, updateQuestion }) => {
  // Ensure options exist
  const options = question.options ?? ['', '', ''];

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    updateQuestion({ options: newOptions });
  };

  const addOption = () => {
    updateQuestion({ options: [...options, ''] });
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    updateQuestion({ options: newOptions });
  };

  return (
    <>
      {/* Poll Question Text */}
      <textarea
        rows={3}
        value={question.question}
        onChange={(e) => updateQuestion({ question: e.target.value })}
        placeholder="Enter your poll question here..."
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

      {/* Poll Options */}
      <div className="space-y-3 mt-4">
        {options.map((opt, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="flex-1 border px-3 py-1 rounded"
              placeholder={`Option ${index + 1}`}
            />
            <button
              onClick={() => removeOption(index)}
              className="text-red-500 hover:text-red-700 text-sm"
              title="Remove option"
            >
              🗑
            </button>
          </div>
        ))}

        <button
          onClick={addOption}
          className="text-purple-600 text-sm hover:underline"
        >
          + Add Option
        </button>
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

export default PollForm;
