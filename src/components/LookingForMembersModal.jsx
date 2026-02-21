import React, { useState } from "react";
import { X } from "lucide-react";

export default function LookingForMembersModal({ isOpen, onClose, onPostProject }) {
  if (!isOpen) return null;

  const initialState = {
    title: "",
    description: "",
    teamRoom: "",
    membersNeeded: 1,
    domain: "Web Development",
    level: "Beginner",
    techStack: "",
    deadline: "",
  };

  const [form, setForm] = useState(initialState);

  // Generic handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "membersNeeded" ? Number(value) : value,
    });
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.description.trim() || !form.teamRoom) {
      alert("Please fill all required fields!");
      return;
    }

    if (form.membersNeeded < 1) {
      alert("Members needed must be at least 1");
      return;
    }

    if (form.deadline) {
      const today = new Date();
      const selectedDate = new Date(form.deadline);

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Deadline cannot be in the past!");
        return;
      }
    }

    onPostProject({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      techStack: form.techStack.trim(),
    });

    setForm(initialState); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          👥 Post Project - Looking for Team Members
        </h2>

        <div className="space-y-4">

          {/* Project Title */}
          <div>
            <label className="font-medium">Project Title *</label>
            <input
              name="title"
              type="text"
              value={form.title}
              placeholder="e.g., E-commerce Website"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-medium">Project Description *</label>
            <textarea
              name="description"
              value={form.description}
              placeholder="Describe your project, goals and requirements..."
              className="w-full border rounded px-3 py-2 h-24"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Team + Members */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Select Team Room *</label>
              <select
                name="teamRoom"
                value={form.teamRoom}
                className="w-full border rounded px-3 py-2"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Team A">Team A</option>
                <option value="Team B">Team B</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Members Needed *</label>
              <input
                name="membersNeeded"
                type="number"
                min={1}
                value={form.membersNeeded}
                className="w-full border rounded px-3 py-2"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Domain + Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Domain</label>
              <select
                name="domain"
                value={form.domain}
                className="w-full border rounded px-3 py-2"
                onChange={handleChange}
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Blockchain">Blockchain</option>
                <option value="Game Development">Game Development</option>
                <option value="Data science">Data science</option>
              </select>
            </div>

            <div>
              <label className="font-medium">Difficulty Level</label>
              <select
                name="level"
                value={form.level}
                className="w-full border rounded px-3 py-2"
                onChange={handleChange}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="font-medium">Tech Stack</label>
            <input
              name="techStack"
              value={form.techStack}
              type="text"
              placeholder="React, Node.js, MongoDB"
              className="w-full border rounded px-3 py-2"
              onChange={handleChange}
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="font-medium">Deadline</label>
            <input
              name="deadline"
              type="date"
              value={form.deadline}
              className="w-full border rounded px-3 py-2"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 border rounded-lg" onClick={onClose}>
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Post Project
          </button>
        </div>
      </div>
    </div>
  );
}