// src/components/CreateProjectModal.jsx
import React, { useState } from "react";

export default function CreateProjectModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [domain, setDomain] = useState("");
  const [level, setLevel] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = () => {
    if (!title || !desc) {
      alert("Please fill all fields");
      return;
    }

    onCreate({
      title,
      desc,
      domain,
      level,
      teamSize,
      deadline,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-[750px] rounded-xl shadow-xl p-6">

        {/* Title & Close */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Project</h2>
          <button onClick={onClose} className="text-gray-500 text-xl hover:text-black">×</button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Project Title */}
          <div>
            <label className="font-medium">Project Title</label>
            <input
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium">Description</label>
            <textarea
              className="w-full mt-1 p-2 border rounded-md"
              rows="3"
              placeholder="Describe your project..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* 2 Column Fields */}
          <div className="grid grid-cols-2 gap-4">

            {/* Domain */}
            <div>
              <label className="font-medium">Domain</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                <option>Select domain</option>
                <option>Web Development</option>
                <option>Full stack Development</option>
                <option>Mobile App</option>
                <option>AI/ML</option>
                <option>Blockchain</option>
                <option>Game Development</option>
                <option>Data Scientist</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="font-medium">Difficulty Level</label>
              <select
                className="w-full mt-1 p-2 border rounded-md"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Team Size */}
            <div>
              <label className="font-medium">Team Size</label>
              <input
                type="number"
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="2"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="font-medium">Deadline</label>
              <input
                type="date"
                className="w-full mt-1 p-2 border rounded-md"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-md font-semibold"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}
