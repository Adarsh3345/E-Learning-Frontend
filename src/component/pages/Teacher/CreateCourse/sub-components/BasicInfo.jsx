import React from "react";

const BasicInfo = ({
  name,
  setName,
  description,
  setDescription,
  imageUrl,
  setImageUrl,
  setCourseImageFile, // File object for uploading
}) => {
  const charCount = 500 - description.length;

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseImageFile(file); // Save actual file to context
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl); // Set preview
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Basic Info</h2>

      {/* Course Name */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter course title"
        />
      </div>

      {/* Course Description */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          className="w-full p-3 h-32 border rounded-lg resize-none text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter course description (max 500 characters)"
        />
        <p className="text-sm text-gray-500 mt-1">{charCount} characters left</p>
      </div>

      {/* Cover Image */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Cover Image</label>
        <div className="relative group w-full h-56 rounded-xl overflow-hidden border border-gray-300 bg-gray-50 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Cover Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No image selected</span>
          )}
          <label className="absolute top-2 right-2 bg-white/90 text-purple-600 text-sm px-3 py-1 rounded shadow-md cursor-pointer hover:bg-white">
            Change Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
