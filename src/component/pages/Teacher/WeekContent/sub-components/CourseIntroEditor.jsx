import React, { useState } from "react";
import ComponentSelector from "./ComponentSelector";
import TypographySettingsPane from "./TypographySettingsPane";

const CourseIntroEditor = () => {
  const [components, setComponents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const addComponent = (type) => {
    const newComponent = {
      type,
      content: "",
      images: [],
      settings: {},
      options: type === "quiz" ? ["", "", "", ""] : [], 
    };
    setComponents([...components, newComponent]);
    setActiveIndex(components.length);
  };

  const updateComponent = (index, updates) => {
    const updated = [...components];
    updated[index] = { ...updated[index], ...updates };
    setComponents(updated);
  };

  const handleImageUpload = (index, files, multiple = false) => {
    const imageUrls = [...files].map((file) => URL.createObjectURL(file));
    updateComponent(index, {
      images: multiple ? imageUrls : [imageUrls[0]],
    });
  };

  const handleQuizOptionChange = (index, optIndex, value) => {
    const newOptions = [...components[index].options];
    newOptions[optIndex] = value;
    updateComponent(index, { options: newOptions });
  };

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <ComponentSelector onSelect={addComponent} />

      {/* Main Editor */}
      <div className="flex-1 space-y-6">
        {components.map((block, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-md"
            onClick={() => setActiveIndex(index)}
          >
            {/* Title */}
            {block.type === "title" && (
              <input
                type="text"
                placeholder="Enter title"
                value={block.content}
                onChange={(e) =>
                  updateComponent(index, { content: e.target.value })
                }
                className="text-2xl font-semibold w-full"
              />
            )}

            {/* Paragraph */}
            {block.type === "para" && (
              <textarea
                placeholder="Write a paragraph..."
                value={block.content}
                onChange={(e) =>
                  updateComponent(index, { content: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            )}

            {/* Image */}
            {block.type === "image" && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(index, e.target.files, false)
                  }
                />
                {block.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="uploaded"
                    className="mt-2 w-64 rounded"
                  />
                ))}
              </div>
            )}

            {/* Gallery */}
            {block.type === "gallery" && (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    handleImageUpload(index, e.target.files, true)
                  }
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {block.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="gallery"
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {block.type === "video" && (
              <div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    handleImageUpload(index, e.target.files, false)
                  }
                />
                {block.images[0] && (
                  <video
                    controls
                    src={block.images[0]}
                    className="mt-2 w-full max-w-md rounded"
                  />
                )}
              </div>
            )}

            {/* List */}
            {block.type === "list" && (
              <textarea
                placeholder="Enter list items separated by new lines"
                value={block.content}
                onChange={(e) =>
                  updateComponent(index, { content: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            )}

            {/* Attachment */}
            {block.type === "attachment" && (
              <input
                type="file"
                onChange={(e) =>
                  updateComponent(index, {
                    images: [e.target.files[0]?.name || ""],
                  })
                }
              />
            )}

            {/* Table */}
            {block.type === "table" && (
              <table className="w-full border mt-2">
                <thead>
                  <tr>
                    <th className="border p-1">Header 1</th>
                    <th className="border p-1">Header 2</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-1">
                      <input type="text" className="w-full" />
                    </td>
                    <td className="border p-1">
                      <input type="text" className="w-full" />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {/* Quiz */}
            {block.type === "quiz" && (
              <div>
                <input
                  type="text"
                  placeholder="Enter question"
                  value={block.content}
                  onChange={(e) =>
                    updateComponent(index, { content: e.target.value })
                  }
                  className="w-full mb-2 p-2 border rounded"
                />
                <div className="space-y-2">
                  {block.options.map((opt, optIndex) => (
                    <input
                      key={optIndex}
                      placeholder={`Option ${optIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleQuizOptionChange(index, optIndex, e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Typography Settings */}
            {(block.type === "title" || block.type === "para") && (
              <TypographySettingsPane
                settings={block.settings}
                onChange={(settings) =>
                  updateComponent(index, { settings: settings })
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseIntroEditor;
