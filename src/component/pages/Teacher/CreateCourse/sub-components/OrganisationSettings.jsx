import React from "react";

const OrganisationSettings = ({
  university,
  setUniversity,
  specialisation,
  setSpecialisation,
  tags,
  setTags,
}) => {
  const [newTag, setNewTag] = React.useState("");

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags([...tags, trimmed]);
      setNewTag("");
    }
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

        <form onSubmit={handleAddTag}>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag and press Enter"
            className="border px-3 py-1 rounded w-full max-w-sm mt-1"
          />
        </form>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-black text-white px-3 py-1 rounded-full flex items-center text-sm"
            >
              {tag}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeTag(tag);
                }}
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
