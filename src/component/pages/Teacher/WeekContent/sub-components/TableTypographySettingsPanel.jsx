import React from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa';

const TableTypographySettingsPanel = ({ settings, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200 space-y-6">
      <h4 className="text-lg font-semibold">Table Cell Styling</h4>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium mb-1">Font Size</label>
        <input
          type="range"
          min="10"
          max="30"
          value={settings.fontSize || 14}
          onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>10px</span>
          <span>{settings.fontSize || 14}px</span>
          <span>30px</span>
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium mb-1">Font Weight</label>
        <select
          value={settings.fontWeight || 'normal'}
          onChange={(e) => handleChange('fontWeight', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="semibold">Semi Bold</option>
          <option value="bold">Bold</option>
        </select>
      </div>

      {/* Font Color */}
      <div>
        <label className="block text-sm font-medium mb-1">Font Color</label>
        <input
          type="color"
          value={settings.textColor || '#000000'}
          onChange={(e) => handleChange('textColor', e.target.value)}
          className="w-full h-10 cursor-pointer"
        />
      </div>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium mb-1">Font Family</label>
        <select
          value={settings.fontFamily || 'Inter'}
          onChange={(e) => handleChange('fontFamily', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Inter">Inter</option>
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      <hr className="border-t my-4" />

      <h4 className="text-lg font-semibold">Table Border Styling</h4>

      {/* Border Size */}
      <div>
        <label className="block text-sm font-medium mb-1">Border Thickness</label>
        <select
          value={settings.borderSize || '1px'}
          onChange={(e) => handleChange('borderSize', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="0">None</option>
          <option value="1px">Thin</option>
          <option value="2px">Medium</option>
          <option value="3px">Thick</option>
        </select>
      </div>

      {/* Border Color */}
      <div>
        <label className="block text-sm font-medium mb-1">Border Color</label>
        <input
          type="color"
          value={settings.borderColor || '#000000'}
          onChange={(e) => handleChange('borderColor', e.target.value)}
          className="w-full h-10 cursor-pointer"
        />
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium mb-1">Corner Radius</label>
        <select
          value={settings.borderRadius || '0'}
          onChange={(e) => handleChange('borderRadius', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="0">None</option>
          <option value="4px">Slightly Rounded</option>
          <option value="8px">Rounded</option>
          <option value="12px">Very Rounded</option>
          <option value="9999px">Fully Rounded</option>
        </select>
      </div>

      {/* Cell Background Color */}
      <div>
        <label className="block text-sm font-medium mb-1">Cell Background Color</label>
        <input
          type="color"
          value={settings.cellBgColor || '#ffffff'}
          onChange={(e) => handleChange('cellBgColor', e.target.value)}
          className="w-full h-10 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TableTypographySettingsPanel;
