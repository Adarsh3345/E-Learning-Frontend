import React from 'react';
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa';

const AttachmentSettingsPanel = ({ settings, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200 space-y-8">
      {/* Thumbnail Customization */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Thumbnail Appearance</h4>
        <div className="space-y-4">

          

          {/* Border */}
          <div>
            <label className="block text-xs font-medium mb-1">Border</label>
            <div className="flex gap-2">
              <select
                value={settings.thumbBorderSize || '0'}
                onChange={(e) => handleChange('thumbBorderSize', e.target.value)}
                className="flex-1 p-2 border rounded-md text-sm"
              >
                <option value="0">None</option>
                <option value="1px">Thin</option>
                <option value="2px">Medium</option>
                <option value="3px">Thick</option>
              </select>
              <input
                type="color"
                value={settings.thumbBorderColor || '#000000'}
                onChange={(e) => handleChange('thumbBorderColor', e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-xs font-medium mb-1">Corner Radius</label>
            <select
              value={settings.thumbBorderRadius || '0'}
              onChange={(e) => handleChange('thumbBorderRadius', e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="0">Sharp</option>
              <option value="4px">Slightly Rounded</option>
              <option value="8px">Rounded</option>
              <option value="12px">Very Rounded</option>
              <option value="9999px">Fully Rounded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description Text Styling */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Description Style</h4>
        <div className="space-y-4">
          {/* Font Size */}
          <div>
            <label className="block text-xs font-medium mb-1">Text Size</label>
            <input
              type="range"
              min="10"
              max="24"
              value={settings.descFontSize || 14}
              onChange={(e) => handleChange('descFontSize', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Small</span>
              <span>{settings.descFontSize || 14}px</span>
              <span>Large</span>
            </div>
          </div>

          {/* Font Color */}
          <div>
            <label className="block text-xs font-medium mb-1">Text Color</label>
            <input
              type="color"
              value={settings.descColor || '#000000'}
              onChange={(e) => handleChange('descColor', e.target.value)}
              className="w-full h-10 cursor-pointer"
            />
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-xs font-medium mb-1">Text Alignment</label>
            <div className="flex gap-2">
              {[
                { value: 'left', icon: <FaAlignLeft /> },
                { value: 'center', icon: <FaAlignCenter /> },
                { value: 'right', icon: <FaAlignRight /> },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => handleChange('descTextAlign', item.value)}
                  className={`flex-1 p-2 border rounded-md flex items-center justify-center text-lg ${
                    settings.descTextAlign === item.value ? 'bg-gray-100 border-blue-400' : ''
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-xs font-medium mb-1">Font Weight</label>
            <select
              value={settings.descFontWeight || 'normal'}
              onChange={(e) => handleChange('descFontWeight', e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="semibold">Semi Bold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentSettingsPanel;
