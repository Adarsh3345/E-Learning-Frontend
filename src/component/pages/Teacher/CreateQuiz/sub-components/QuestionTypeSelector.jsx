// sub-components/QuestionTypeSelector.js
import React, { useState } from 'react';
import {
  FaCheckSquare,
  FaEquals,
  FaPen,
  FaPoll,
  FaPlus,
} from 'react-icons/fa';

const questionTypes = [
  {
    section: 'Add a new question',
    title: 'Multiple Choice',
    type: 'multiple_choice',
    icon: <FaCheckSquare className="text-gray-600 w-4 h-4" />,
  },
  {
    section: '',
    title: 'True/False Choice',
    type: 'true_false',
    icon: <FaEquals className="text-gray-600 w-4 h-4" />,
  },
  {
    section: 'Open ended responses',
    title: 'Open Ended',
    type: 'open_ended',
    icon: <FaPen className="text-gray-600 w-4 h-4" />,
  },
  {
    section: '',
    title: 'Poll',
    type: 'poll',
    icon: <FaPoll className="text-gray-600 w-4 h-4" />,
  },
];

const QuestionTypeSelector = ({ onSelect, onTimeChange, onPointsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('No time limits');
  const [selectedPoints, setSelectedPoints] = useState('0 points');

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);
    if (onTimeChange) onTimeChange(time);
  };

  const handlePointsChange = (e) => {
    const points = e.target.value;
    setSelectedPoints(points);
    if (onPointsChange) onPointsChange(points);
  };

  let currentSection = '';

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg w-80 shadow-md">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition"
      >
        <FaPlus className="w-3 h-3" />
        <span>Add New Question</span>
      </button>

      {/* Question Types */}
      {isOpen && (
        <div className="space-y-2">
          {questionTypes.map((q) => {
            const showSection = q.section && q.section !== currentSection;
            if (showSection) currentSection = q.section;

            return (
              <div key={q.type}>
                {showSection && (
                  <div className="text-xs font-semibold text-gray-500 mt-4 mb-2">
                    {q.section}
                  </div>
                )}

                <button
                  onClick={() => {
                    onSelect(q.type);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  {q.icon}
                  <span>{q.title}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Bulk Update Settings */}
      <div className="space-y-2 shadow-md p-4 rounded-lg">
        <h2 className="text-sm font-semibold text-gray-700">Bulk update questions</h2>
        <div className="flex items-center justify-between gap-2">
          {/* Time Select */}
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Time</label>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full border text-sm px-2 py-1 rounded"
            >
              <option>No time limits</option>
              <option>15 seconds</option>
              <option>30 seconds</option>
              <option>60 seconds</option>
              <option>90 seconds</option>
            </select>
          </div>

          {/* Points Select */}
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Points</label>
            <select
              value={selectedPoints}
              onChange={handlePointsChange}
              className="w-full border text-sm px-2 py-1 rounded"
            >
              <option>0 points</option>
              <option>1 point</option>
              <option>2 points</option>
              <option>3 points</option>
              <option>5 points</option>
              <option>10 points</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
