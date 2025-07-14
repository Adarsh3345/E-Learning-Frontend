import React from "react";
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaAlignLeft, 
  FaAlignCenter, 
  FaAlignRight 
} from "react-icons/fa";

const fontOptions = ["Inter", "Roboto", "Open Sans", "Georgia", "Monospace"];
const weightOptions = [
  { label: "Normal", value: "normal", weight: "font-normal" },
  { label: "Medium", value: "medium", weight: "font-semibold" },
  { label: "Bold", value: "bold", weight: "font-bold" }
];
const colorPalette = [
  "#000000", "#4B5563", "#9CA3AF", "#D1D5DB", "#E5E7EB",
  "#F87171", "#FBBF24", "#A855F7", "#10B981", "#F59E0B",
  "#DC2626", "#6B7280", "#A16207", "#CA8A04", "#FACC15",
  "#4ADE80", "#8B5CF6", "#C084FC"
];

const TypographySettingsPanel = ({ settings, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  const toggleStyle = (key) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  // Get current weight display class
  const currentWeightClass = weightOptions.find(
    opt => opt.value === (settings.fontWeight || 'normal')
  )?.weight || 'font-normal';

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-md font-semibold mb-4">Text Formatting</h3>

      <div className="space-y-4">
        {/* Font Family */}
        <div>
          <label className="block text-sm font-medium mb-1">Font</label>
          <select
            value={settings.fontFamily || 'Inter'}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {fontOptions.map(font => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>

        {/* Font Size and Weight */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Size</label>
            <input
              type="number"
              min="8"
              max="72"
              value={settings.fontSize || 16}
              onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Weight</label>
            <div className="relative">
              <select
                value={settings.fontWeight || 'normal'}
                onChange={(e) => handleChange('fontWeight', e.target.value)}
                className={`w-full p-2 border rounded-md appearance-none ${currentWeightClass}`}
              >
                {weightOptions.map(option => (
                  <option 
                    key={option.value} 
                    value={option.value}
                    className={option.weight}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Alignment */}
        <div>
          <label className="block text-sm font-medium mb-1">Alignment</label>
          <div className="flex gap-2">
            {[
              { value: 'left', icon: <FaAlignLeft /> },
              { value: 'center', icon: <FaAlignCenter /> },
              { value: 'right', icon: <FaAlignRight /> }
            ].map(item => (
              <button
                key={item.value}
                type="button"
                onClick={() => handleChange('textAlign', item.value)}
                className={`p-2 border rounded-md ${
                  settings.textAlign === item.value ? 'bg-gray-100' : ''
                }`}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Text Styles */}
        <div>
          <label className="block text-sm font-medium mb-1">Styles</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold')}
              className={`p-2 border rounded-md ${
                settings.bold ? 'bg-gray-100' : ''
              }`}
            >
              <FaBold />
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italic')}
              className={`p-2 border rounded-md ${
                settings.italic ? 'bg-gray-100' : ''
              }`}
            >
              <FaItalic />
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('underline')}
              className={`p-2 border rounded-md ${
                settings.underline ? 'bg-gray-100' : ''
              }`}
            >
              <FaUnderline />
            </button>
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium mb-1">Text Color</label>
          <div className="grid grid-cols-6 gap-2">
            {colorPalette.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => handleChange('color', color)}
                className={`w-6 h-6 rounded-full ${
                  settings.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographySettingsPanel;