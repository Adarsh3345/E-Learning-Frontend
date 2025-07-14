import React from 'react';
import { FaTimes } from 'react-icons/fa';

const fontWeightMap = {
  'normal': 'font-normal',
  'medium': 'font-medium',
  'semibold': 'font-semibold',
  'bold': 'font-bold',
  'extrabold': 'font-extrabold',
  'black': 'font-black'
};

const CourseIntroSection = ({
  components,
  onUpdate,
  activeIndex,
  setActiveIndex,
  onRemove
}) => {
  const handleChange = (index, value) => {
    onUpdate(index, { content: value });
  };

  const handleFileUpload = (index, files, multiple = false) => {
    const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
    onUpdate(index, { images: multiple ? fileArray : [fileArray[0]] });
  };

  const getFontWeightClass = (weight) => {
    return fontWeightMap[weight] || 'font-normal';
  };

  const renderComponent = (comp, index) => {
    const isActive = index === activeIndex;
    const baseClasses = `p-4 bg-white focus:border-black transition-all relative ${
      isActive ? 'ring-2 ring-blue-500 rounded-lg' : 'hover:bg-gray-50 rounded-lg'
    }`;

    const handleRemove = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onRemove(index);
    };

    return (
      <div key={comp.id} className={baseClasses} onClick={() => setActiveIndex(index)}>
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors z-10"
          aria-label="Remove component"
        >
          <FaTimes />
        </button>

        {renderComponentContent(comp, index)}
      </div>
    );
  };

  const renderComponentContent = (comp, index) => {
    const fontWeightClass = getFontWeightClass(comp.settings?.fontWeight);

    switch (comp.type) {
      case 'title':
        return (
          <input
            type="text"
            value={comp.content}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Enter section title"
            className={`text-2xl w-full outline-none bg-transparent pr-6 ${fontWeightClass}`}
            style={{
              fontFamily: comp.settings?.fontFamily,
              fontSize: `${comp.settings?.fontSize}px`,
              color: comp.settings?.color,
              textAlign: comp.settings?.textAlign,
              fontStyle: comp.settings?.italic ? 'italic' : 'normal',
              textDecoration: comp.settings?.underline ? 'underline' : 'none',
            }}
          />
        );

      case 'para':
        return (
          <textarea
            rows={4}
            value={comp.content}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Write your paragraph here..."
            className={`w-full outline-none resize-none bg-transparent pr-6 ${fontWeightClass}`}
            style={{
              fontFamily: comp.settings?.fontFamily,
              fontSize: `${comp.settings?.fontSize}px`,
              color: comp.settings?.color,
              textAlign: comp.settings?.textAlign,
              fontStyle: comp.settings?.italic ? 'italic' : 'normal',
              textDecoration: comp.settings?.underline ? 'underline' : 'none',
            }}
          />
        );

      case 'image':
        return (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(index, e.target.files)}
              className="mb-2 opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
            />
            {comp.images?.[0] ? (
              <div
                style={{
                  width: comp.settings?.width || '100%',
                  border: `${comp.settings?.borderSize || '0'} solid ${comp.settings?.borderColor || 'transparent'}`,
                  borderRadius: comp.settings?.borderRadius || '0',
                  boxShadow: comp.settings?.shadow === 'none' ? 'none' :
                    `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  margin: comp.settings?.alignment === 'left' ? '0 auto 0 0' :
                    comp.settings?.alignment === 'right' ? '0 0 0 auto' : '0 auto'
                }}
              >
                <img
                  src={comp.images[0]}
                  alt="Uploaded content"
                  className="max-w-full h-auto"
                  style={{
                    borderRadius: 'inherit',
                    display: 'block' // Ensures no extra space below image
                  }}
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Click to upload an image</p>
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="relative">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(index, e.target.files)}
              className="mb-2 opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
            />
            {comp.images?.[0] ? (
              <div
                style={{
                  width: comp.settings?.width || '100%',
                  border: `${comp.settings?.borderSize || '0'} solid ${comp.settings?.borderColor || 'transparent'}`,
                  borderRadius: comp.settings?.borderRadius || '0',
                  boxShadow: comp.settings?.shadow === 'none' ? 'none' :
                    `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  margin: comp.settings?.alignment === 'left' ? '0 auto 0 0' :
                    comp.settings?.alignment === 'right' ? '0 0 0 auto' : '0 auto'
                }}
              >
                <video
                  src={comp.images[0]}
                  controls
                  className="w-full"
                  style={{
                    borderRadius: 'inherit',
                    display: 'block' // Ensures consistent styling
                  }}
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Click to upload a video</p>
              </div>
            )}
          </div>
        );

      case 'gallery':
        return (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileUpload(index, e.target.files, true)}
              className="mb-2 opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
            />
            {comp.images?.length > 0 ? (
              <div
                style={{
                  width: comp.settings?.width || '100%',
                  border: `${comp.settings?.borderSize || '0'} solid ${comp.settings?.borderColor || 'transparent'}`,
                  borderRadius: comp.settings?.borderRadius || '0',
                  boxShadow: comp.settings?.shadow === 'none' ? 'none' :
                    `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  margin: comp.settings?.alignment === 'left' ? '0 auto 0 0' :
                    comp.settings?.alignment === 'right' ? '0 0 0 auto' : '0 auto',
                  padding: '8px'
                }}
              >
                <div className="grid grid-cols-3 gap-2">
                  {comp.images.map((img, i) => (
                    <div 
                      key={i}
                      style={{
                        border: `${comp.settings?.borderSize || '0'} solid ${comp.settings?.borderColor || 'transparent'}`,
                        borderRadius: comp.settings?.borderRadius || '0',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={img}
                        alt="Gallery item"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Click to upload multiple images</p>
              </div>
            )}
          </div>
        );

      case 'list':
        return (
          <textarea
            rows={4}
            value={comp.content}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Enter list items (one per line)"
            className="w-full outline-none resize-none bg-transparent pr-6"
          />
        );

      case 'attachment':
        return (
          <div className="relative">
            <input
              type="file"
              onChange={(e) => onUpdate(index, { content: e.target.files[0]?.name || '' })}
              className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
            />
            {comp.content ? (
              <p className="text-sm p-2 bg-gray-100 rounded">{comp.content}</p>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Click to upload a file</p>
              </div>
            )}
          </div>
        );

      case 'table':
        return (
          <textarea
            rows={4}
            value={comp.content}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Enter table data (CSV format)"
            className="w-full outline-none resize-none bg-transparent pr-6"
          />
        );

      case 'quiz':
        return (
          <>
            <input
              type="text"
              value={comp.content}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Enter quiz question"
              className={`w-full mb-2 p-2 outline-none bg-transparent border-b pr-6 ${fontWeightClass}`}
            />
            <div className="space-y-2">
              {comp.options?.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...comp.options];
                    newOptions[optIndex] = e.target.value;
                    onUpdate(index, { options: newOptions });
                  }}
                  placeholder={`Option ${optIndex + 1}`}
                  className="w-full p-2 outline-none bg-transparent border-b"
                />
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {components.map((comp, index) => renderComponent(comp, index))}
    </div>
  );
};

export default CourseIntroSection;