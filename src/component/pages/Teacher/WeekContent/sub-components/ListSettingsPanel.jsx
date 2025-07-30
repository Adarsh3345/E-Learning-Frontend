import React from 'react';
import { FaCircle, FaListOl, FaImage } from 'react-icons/fa';

const ListSettingsPanel = ({ settings, onChange }) => {
    const handleChange = (key, value) => {
        onChange({ ...settings, [key]: value });
    };

    const handleIconUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onChange({
                    ...settings,
                    listStyle: 'custom',
                    customIcon: event.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-md font-semibold mb-4">List Settings</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">List Style</label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => handleChange('listStyle', 'bullet')}
                            className={`p-2 border rounded-md flex items-center justify-center ${
                                settings.listStyle === 'bullet' ? 'bg-gray-100' : ''
                            }`}
                            title="Bullet points"
                        >
                            <FaCircle className="text-xs" />
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => handleChange('listStyle', 'number')}
                            className={`p-2 border rounded-md flex items-center justify-center ${
                                settings.listStyle === 'number' ? 'bg-gray-100' : ''
                            }`}
                            title="Numbered list"
                        >
                            <FaListOl />
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => document.getElementById('list-icon-upload').click()}
                            className={`p-2 border rounded-md flex items-center justify-center ${
                                settings.listStyle === 'custom' ? 'bg-gray-100' : ''
                            }`}
                            title="Custom icon"
                        >
                            {settings.customIcon ? (
                                <img src={settings.customIcon} alt="Custom icon" className="w-4 h-4" />
                            ) : (
                                <FaImage />
                            )}
                        </button>
                        
                        <input
                            type="file"
                            id="list-icon-upload"
                            accept="image/*"
                            onChange={handleIconUpload}
                            className="hidden"
                        />
                    </div>
                </div>
                
                {/* Include all typography controls */}
                <div>
                    <label className="block text-sm font-medium mb-1">Font</label>
                    <select
                        value={settings.fontFamily || 'Inter'}
                        onChange={(e) => handleChange('fontFamily', e.target.value)}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                    </select>
                </div>
                
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
                        <select
                            value={settings.fontWeight || 'normal'}
                            onChange={(e) => handleChange('fontWeight', e.target.value)}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="normal">Normal</option>
                            <option value="medium">Medium</option>
                            <option value="semibold">Semi Bold</option>
                            <option value="bold">Bold</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Text Color</label>
                    <input
                        type="color"
                        value={settings.color || '#000000'}
                        onChange={(e) => handleChange('color', e.target.value)}
                        className="w-full h-10 cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default ListSettingsPanel;