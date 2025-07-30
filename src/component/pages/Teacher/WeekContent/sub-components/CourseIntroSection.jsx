import React from 'react';
import { FaTimes, FaPlus, FaLink, FaUpload, FaExternalLinkAlt, FaFile, FaImage } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const fontWeightMap = {
  'normal': 'font-normal',
  'medium': 'font-medium',
  'semibold': 'font-semibold',
  'bold': 'font-bold',
  'extrabold': 'font-extrabold',
  'black': 'font-black'
};

const CourseIntroSection = ({
  components = [],
  onUpdate,
  activeIndex,
  setActiveIndex,
  onRemove,
  sectionIndex: sectionIndexProp
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const sectionIndex = params.sectionIndex ?? sectionIndexProp;

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

  const handleEditQuiz = (componentIndex, quizIndex) => {
    navigate(`/quiz/${sectionIndex}/${componentIndex}/${quizIndex}`);
  };

  const renderComponent = (comp, index) => {
    if (!comp) return null;
    
    const isActive = index === activeIndex;
    const baseClasses = `p-4 bg-white focus:border-black transition-all relative ${isActive ? 'ring-2 ring-blue-500 rounded-lg' : 'hover:bg-gray-50 rounded-lg'
      }`;

    const handleRemove = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onRemove(index);
    };

    return (
      <div key={comp.id || index} className={baseClasses} onClick={() => setActiveIndex(index)}>
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
    if (!comp) return null;
    
    const settings = comp.settings || {};
    const fontWeightClass = getFontWeightClass(settings.fontWeight);

    switch (comp.type) {
      case 'title':
        return (
          <input
            type="text"
            value={comp.content || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Enter section title"
            className={`text-2xl w-full outline-none bg-transparent pr-6 ${fontWeightClass}`}
            style={{
              fontFamily: settings.fontFamily,
              fontSize: `${settings.fontSize || 16}px`,
              color: settings.color || '#000000',
              textAlign: settings.textAlign || 'left',
              fontStyle: settings.italic ? 'italic' : 'normal',
              textDecoration: settings.underline ? 'underline' : 'none',
            }}
          />
        );

      case 'para':
        return (
          <textarea
            rows={4}
            value={comp.content || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Write your paragraph here..."
            className={`w-full outline-none resize-none bg-transparent pr-6 ${fontWeightClass}`}
            style={{
              fontFamily: settings.fontFamily,
              fontSize: `${settings.fontSize || 16}px`,
              color: settings.color || '#000000',
              textAlign: settings.textAlign || 'left',
              fontStyle: settings.italic ? 'italic' : 'normal',
              textDecoration: settings.underline ? 'underline' : 'none',
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
                  width: settings.width || '100%',
                  border: `${settings.borderSize || '0'} solid ${settings.borderColor || 'transparent'}`,
                  borderRadius: settings.borderRadius || '0',
                  boxShadow: settings.shadow === 'none' ? 'none' :
                    `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  margin: settings.alignment === 'left' ? '0 auto 0 0' :
                    settings.alignment === 'right' ? '0 0 0 auto' : '0 auto'
                }}
              >
                <img
                  src={comp.images[0]}
                  alt="Uploaded content"
                  className="max-w-full h-auto"
                  style={{
                    borderRadius: 'inherit',
                    display: 'block'
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
                  width: settings.width || '100%',
                  border: `${settings.borderSize || '0'} solid ${settings.borderColor || 'transparent'}`,
                  borderRadius: settings.borderRadius || '0',
                  boxShadow: settings.shadow === 'none' ? 'none' :
                    `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  margin: settings.alignment === 'left' ? '0 auto 0 0' :
                    settings.alignment === 'right' ? '0 0 0 auto' : '0 auto'
                }}
              >
                <video
                  src={comp.images[0]}
                  controls
                  className="w-full"
                  style={{
                    borderRadius: 'inherit',
                    display: 'block'
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
                  width: settings.width || '100%',
                  border: `${settings.borderSize || '0'} solid ${settings.borderColor || 'transparent'}`,
                  borderRadius: settings.borderRadius || '0',
                  boxShadow: settings.shadow === 'none' ? 'none' :
                    `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
                  margin: settings.alignment === 'left' ? '0 auto 0 0' :
                    settings.alignment === 'right' ? '0 0 0 auto' : '0 auto',
                  padding: '8px'
                }}
              >
                <div className="grid grid-cols-3 gap-2">
                  {comp.images.map((img, i) => (
                    <div
                      key={i}
                      style={{
                        border: `${settings.borderSize || '0'} solid ${settings.borderColor || 'transparent'}`,
                        borderRadius: settings.borderRadius || '0',
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
          <div className="space-y-2">
            {(comp.items?.length ? comp.items : [{ text: '' }]).map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center gap-2">
                {settings.listStyle === 'bullet' && <span className="text-lg">•</span>}
                {settings.listStyle === 'number' && <span className="text-sm">{itemIndex + 1}.</span>}
                {settings.listStyle === 'custom' && settings.customIcon && (
                  <img src={settings.customIcon} alt="List icon" className="w-4 h-4 object-contain" />
                )}
                <input
                  type="text"
                  value={item.text || ''}
                  onChange={(e) => {
                    const newItems = [...(comp.items || [])];
                    newItems[itemIndex] = { ...(typeof item === 'object' ? item : { text: '' }), text: e.target.value };
                    onUpdate(index, { items: newItems });
                  }}
                  placeholder={`List item ${itemIndex + 1}`}
                  className={`flex-1 p-[0.1rem] outline-none bg-transparent border-b ${getFontWeightClass(settings.fontWeight)}`}
                  style={{
                    fontFamily: settings.fontFamily,
                    fontSize: `${settings.fontSize || 16}px`,
                    color: settings.color || '#000000',
                    fontStyle: settings.italic ? 'italic' : 'normal',
                    textDecoration: settings.underline ? 'underline' : 'none',
                  }}
                />
                <button
                  onClick={() => {
                    const newItems = [...(comp.items || [])];
                    newItems.splice(itemIndex, 1);
                    onUpdate(index, { items: newItems });
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newItems = [...(comp.items || []), { text: '' }];
                onUpdate(index, { items: newItems });
              }}
              className="mt-2 flex items-center gap-1 text-blue-500 hover:text-blue-700"
            >
              <FaPlus />
              <span>Add item</span>
            </button>
          </div>
        );

      case 'link':
        return (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={comp.content || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Link text"
              className={`flex-1 p-2 outline-none bg-transparent border-b ${fontWeightClass}`}
              style={{
                fontFamily: settings.fontFamily,
                fontSize: `${settings.fontSize || 16}px`,
                color: settings.color || '#000000',
                fontStyle: settings.italic ? 'italic' : 'normal',
                textDecoration: settings.underline ? 'underline' : 'none',
              }}
            />
            <input
              type="text"
              value={settings.url || ''}
              onChange={(e) => onUpdate(index, {
                settings: { ...settings, url: e.target.value }
              })}
              placeholder="https://example.com"
              className="flex-1 p-2 outline-none bg-transparent border-b"
            />
          </div>
        );

      case 'attachment':
        return (
          <div className="space-y-5">
            {!comp.thumbnail && (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      onUpdate(index, { thumbnail: imageUrl });
                    }
                  }}
                  className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer z-10"
                />
                <div className="border border-gray-300 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition">
                  <FaUpload className="mx-auto text-gray-400 text-xl mb-2" />
                  <p className="text-sm text-gray-600">Click to upload an image</p>
                  <p className="text-xs text-gray-400">JPG, PNG, WebP, etc.</p>
                </div>
              </div>
            )}

            {comp.thumbnail && (
              <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
                <img
                  src={comp.thumbnail}
                  alt="Thumbnail"
                  className="w-full object-cover max-h-64"
                  style={{
                    border: `${settings.thumbBorderSize || '0'} solid ${settings.thumbBorderColor || 'transparent'}`,
                    borderRadius: settings.thumbBorderRadius || '0',
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                rows={2}
                value={comp.description || ''}
                onChange={(e) => onUpdate(index, { description: e.target.value })}
                placeholder="Enter file description..."
                className="w-full p-3 border rounded-lg"
                style={{
                  fontFamily: settings.descFontFamily,
                  fontSize: `${settings.descFontSize || 14}px`,
                  fontWeight: fontWeightMap[settings.descFontWeight] || 'normal',
                  color: settings.descColor || '#000000',
                  textAlign: settings.descTextAlign || 'left',
                }}
              />
            </div>

            <div className="relative">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const fileUrl = URL.createObjectURL(file);
                    const fileType = file.type.split('/')[0];
                    onUpdate(index, {
                      content: file.name,
                      fileUrl,
                      fileType,
                    });
                  }
                }}
                className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer z-10"
              />

              {comp.fileUrl ? (
                <div className="flex items-center justify-between bg-white shadow-md border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
                      {comp.fileType === 'image' ? (
                        <FaImage className="text-gray-500" />
                      ) : (
                        <FaFile className="text-gray-500" />
                      )}
                    </div>
                    <div className="max-w-xs">
                      <p className="text-sm font-medium truncate">{comp.content}</p>
                      <p className="text-xs text-gray-400">{comp.fileType?.toUpperCase() || 'FILE'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(comp.fileUrl, '_blank')}
                    className="text-xs text-blue-500 border border-blue-100 hover:border-blue-300 hover:text-blue-600 px-3 py-1 rounded-md transition"
                  >
                    View
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                  <FaUpload className="mx-auto text-gray-400 text-xl mb-2" />
                  <p className="text-sm text-gray-600">Click to upload a file</p>
                  <p className="text-xs text-gray-400">PDF, PPT, DOC, ZIP, etc.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="space-y-4 relative" onClick={() => setActiveIndex(index)}>
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Table Settings</h3>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newRows = parseInt(comp.rows || 1) + 1;
                    onUpdate(index, { rows: newRows });
                  }}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                >
                  Add Row
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newCols = parseInt(comp.cols || 1) + 1;
                    onUpdate(index, { cols: newCols });
                  }}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                >
                  Add Column
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Array.from({ length: comp.rows || 1 }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: comp.cols || 1 }).map((_, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-200 p-2"
                          style={{
                            backgroundColor: settings.cellBgColor || '#ffffff',
                            textAlign: settings.textAlign || 'center',
                          }}
                        >
                          <div className="flex justify-center">
                            {comp[`cell-${rowIndex}-${colIndex}`]?.type === 'image' ? (
                              <div className="w-16 h-16 flex items-center justify-center">
                                <img
                                  src={comp[`cell-${rowIndex}-${colIndex}`]?.url}
                                  alt="Cell content"
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                            ) : (
                              <input
                                type="text"
                                className="w-full bg-transparent text-center focus:outline-none"
                                style={{
                                  fontSize: `${settings.fontSize || 14}px`,
                                  fontWeight: settings.fontWeight || 'normal',
                                  color: settings.textColor || '#000000',
                                  fontFamily: settings.fontFamily,
                                }}
                                value={comp[`cell-${rowIndex}-${colIndex}`]?.text || ''}
                                onChange={(e) => {
                                  const updatedCell = {
                                    type: 'text',
                                    text: e.target.value
                                  };
                                  onUpdate(index, {
                                    [`cell-${rowIndex}-${colIndex}`]: updatedCell
                                  });
                                }}
                                placeholder="Cell"
                              />
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Row</label>
                <select
                  value={comp.selectedRow || 0}
                  onChange={(e) => onUpdate(index, { selectedRow: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                >
                  {Array.from({ length: comp.rows || 1 }).map((_, i) => (
                    <option key={i} value={i}>Row {i + 1}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Column</label>
                <select
                  value={comp.selectedCol || 0}
                  onChange={(e) => onUpdate(index, { selectedCol: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                >
                  {Array.from({ length: comp.cols || 1 }).map((_, i) => (
                    <option key={i} value={i}>Column {i + 1}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => onUpdate(index, {
                  [`cell-${comp.selectedRow || 0}-${comp.selectedCol || 0}`]: {
                    type: 'image',
                    url: comp[`cell-${comp.selectedRow}-${comp.selectedCol}`]?.url || ''
                  }
                })}
                className={`flex-1 py-2 rounded ${comp[`cell-${comp.selectedRow}-${comp.selectedCol}`]?.type === 'image' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Image
              </button>
              <button
                onClick={() =>
                  onUpdate(index, {
                    [`cell-${comp.selectedRow || 0}-${comp.selectedCol || 0}`]: null
                  })
                }
                className="flex-1 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
              >
                Clear
              </button>
            </div>

            {comp[`cell-${comp.selectedRow || 0}-${comp.selectedCol || 0}`]?.type === 'image' && (
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      onUpdate(index, {
                        [`cell-${comp.selectedRow || 0}-${comp.selectedCol || 0}`]: {
                          ...comp[`cell-${comp.selectedRow}-${comp.selectedCol}`],
                          type: 'image',
                          url
                        }
                      });
                    }
                  }}
                  className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
                />
                {comp[`cell-${comp.selectedRow || 0}-${comp.selectedCol || 0}`]?.url ? (
                  <div className="mx-auto max-w-full">
                    <img
                      src={comp[`cell-${comp.selectedRow || 0}-${comp.selectedCol || 0}`]?.url}
                      alt="Cell content"
                      className="max-h-40 max-w-full mx-auto object-contain rounded"
                    />
                  </div>
                ) : (
                  <div>
                    <FaImage className="mx-auto text-gray-400 text-xl mb-2" />
                    <p className="text-gray-500">Click to upload an image</p>
                    <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, GIF</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-3 p-4 border border-gray-200 rounded-xl bg-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Quizzes</h3>
              <button
                onClick={() => {
                  const currentCount = (comp.quizzes?.length || 0) + 1;
                  const newQuiz = {
                    title: `Quiz ${currentCount}`,
                    difficulty: 'Beginner',
                    description: ''
                  };

                  onUpdate(index, {
                    quizzes: [...(comp.quizzes || []), newQuiz]
                  });
                }}
                className="text-sm text-purple-500 hover:underline"
              >
                + Add new <span className="font-medium">quiz</span>
              </button>
            </div>

            {(comp.quizzes || []).map((quiz, quizIndex) => (
              <div
                key={quizIndex}
                className="border border-gray-200 p-4 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="cursor-move text-gray-400">⋮⋮</div>
                  <span className="font-medium text-base">
                    {quiz.title} <span className="text-sm font-normal text-gray-500">- {quiz.difficulty} - {quiz.description}</span>
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditQuiz(index, quizIndex)}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const newQuizzes = [...comp.quizzes];
                      newQuizzes.splice(quizIndex, 1);
                      onUpdate(index, { quizzes: newQuizzes });
                    }}
                    className="text-gray-500 hover:text-red-500"
                    title="Delete"
                  >
                    ⋯
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {Array.isArray(components) && components.map((comp, index) => renderComponent(comp, index))}

    </div>
  );
};

export default CourseIntroSection;