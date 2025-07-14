import React, { useState } from "react";

const BasicInfo = () => {
  const [name, setName] = useState(
    "Beginner's Guide to Successful Company Management: Business and User Goals"
  );
  const [description, setDescription] = useState(
    "Hello Student! 🙌 Economics isn't just a subject - it's the lens through which we view society. I will help you explore its profound implications. From micro to macroeconomics, discover the keys to understanding economic phenomena in my comprehensive courses 📉🚀"
  );
  const [charCount, setCharCount] = useState(275);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1557804506-669a67965ba0"
  );

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setDescription(text);
    setCharCount(500 - text.length); // Assuming 500 max length
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Basic info</h2>

      {/* Name Field */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Description Field */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
        <div className="border rounded-lg">
          {/* Toolbar (minimal dummy version) */}
          <div className="flex items-center gap-2 px-2 py-1 border-b text-gray-500 text-sm">
            <select className="bg-transparent">
              <option>Normal text</option>
              <option>Heading</option>
            </select>
            <button className="px-1 hover:text-black">B</button>
            <button className="px-1 hover:text-black">I</button>
            <button className="px-1 hover:text-black">🔗</button>
            <button className="px-1 hover:text-black">• List</button>
          </div>

          {/* Textarea */}
          <textarea
            className="w-full p-3 h-32 resize-none focus:outline-none text-gray-800"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">{charCount} characters left</p>
      </div>

      {/* Cover Image */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Cover image</label>
        <div className="relative">
          <img
            src={imageUrl}
            alt="Cover"
            className="w-full h-56 object-cover rounded-xl"
          />
          <button
            className="absolute top-2 right-2 text-purple-600 text-sm hover:underline"
            onClick={() => alert("Change image functionality not implemented")}
          >
            Click to change
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
