import React, { useState } from "react";

const OrganisationSettings = () => {
  const [university, setUniversity] = useState("Any university");
  const [specialisation, setSpecialisation] = useState("Business");
  const [tags, setTags] = useState([
    "Business",
    "Economics",
    "Success",
    "CIO",
    "Goals",
    "Management",
    "Company",
  ]);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg space-y-6">
      <h3 className="font-semibold text-lg">Organisations</h3>

      {/* University */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
        <select
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Any university</option>
          <option>Harvard University</option>
          <option>MIT</option>
          <option>Stanford</option>
        </select>
      </div>

      {/* Specialisation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Specialisation</label>
        <select
          value={specialisation}
          onChange={(e) => setSpecialisation(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Business</option>
          <option>Engineering</option>
          <option>Arts</option>
          <option>Economics</option>
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course tags <span className="text-gray-400 text-sm">(up to 10)</span>
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-black text-white px-3 py-1 rounded-full flex items-center text-sm"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-2 text-white hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganisationSettings;
