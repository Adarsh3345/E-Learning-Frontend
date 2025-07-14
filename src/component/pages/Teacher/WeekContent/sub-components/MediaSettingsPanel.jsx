import React from 'react';
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';

const MediaSettingsPanel = ({ settings, onChange }) => {
    const handleChange = (key, value) => {
        onChange({ ...settings, [key]: value });
    };

    const alignmentOptions = [
        { value: 'left', icon: <FaAlignLeft />, label: 'Left' },
        { value: 'center', icon: <FaAlignCenter />, label: 'Center' },
        { value: 'right', icon: <FaAlignRight />, label: 'Right' }
    ];

    const widthOptions = [
        { value: '100%', label: 'Full Width' },
        { value: '75%', label: 'Large' },
        { value: '50%', label: 'Medium' },
        { value: '25%', label: 'Small' }
    ];

    const borderOptions = [
        { value: '0', label: 'None' },
        { value: '1px', label: 'Thin' },
        { value: '2px', label: 'Medium' },
        { value: '4px', label: 'Thick' }
    ];

    const shadowOptions = [
        { value: 'none', label: 'None' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' }
    ];

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-md font-semibold mb-4">Media Settings</h3>
            
            <div className="space-y-4">
                {/* Alignment */}
                <div>
                    <label className="block text-sm font-medium mb-1">Alignment</label>
                    <div className="flex gap-2">
                        {alignmentOptions.map(item => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => handleChange('alignment', item.value)}
                                className={`p-2 border rounded-md flex items-center ${
                                    settings.alignment === item.value ? 'bg-gray-100' : ''
                                }`}
                                title={item.label}
                            >
                                {item.icon}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Width */}
                <div>
                    <label className="block text-sm font-medium mb-1">Width</label>
                    <select
                        value={settings.width || '100%'}
                        onChange={(e) => handleChange('width', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        {widthOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Border */}
                <div className="space-y-2">
                    <div>
                        <label className="block text-sm font-medium mb-1">Border Size</label>
                        <select
                            value={settings.borderSize || '0'}
                            onChange={(e) => handleChange('borderSize', e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            {borderOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Border Color</label>
                        <input
                            type="color"
                            value={settings.borderColor || '#000000'}
                            onChange={(e) => handleChange('borderColor', e.target.value)}
                            className="w-full h-10 cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Border Radius</label>
                        <select
                            value={settings.borderRadius || '0'}
                            onChange={(e) => handleChange('borderRadius', e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="0">None</option>
                            <option value="4px">Small</option>
                            <option value="8px">Medium</option>
                            <option value="12px">Large</option>
                            <option value="9999px">Full Rounded</option>
                        </select>
                    </div>
                </div>

                {/* Shadow */}
                <div>
                    <label className="block text-sm font-medium mb-1">Shadow</label>
                    <select
                        value={settings.shadow || 'none'}
                        onChange={(e) => handleChange('shadow', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        {shadowOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default MediaSettingsPanel;