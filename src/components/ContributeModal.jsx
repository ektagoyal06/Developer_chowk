import React, { useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function ContributeModal({ show, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    link: "",
    image: null,
    type: "",
    domain: "",
    level: "",
    tags: ""
  });

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.desc ||
      !form.link ||
      !form.type ||
      !form.domain ||
      !form.level ||
      !form.tags
    ) {
      alert("All fields are required");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: form.title,
      desc: form.desc,
      link: form.link, // ✅ REQUIRED FOR VIEW REDIRECT
      domain: form.domain,
      type: form.type,
      level: form.level,
      tags: form.tags.split(",").map(t => t.trim()),
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      Icon: BookOpenIcon
    };

    onAdd(newItem);

    setForm({
      title: "",
      desc: "",
      link: "",
      image: null,
      type: "",
      domain: "",
      level: "",
      tags: ""
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[520px] rounded-xl p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Contribute to StudyStack
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="e.g. Flexbox Cheatsheet"
              className="w-full border rounded-lg px-4 py-2 mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              required
              rows={3}
              placeholder="A short summary of the resource"
              className="w-full border rounded-lg px-4 py-2 mt-1"
            />
          </div>

          {/* Link */}
          <div>
            <label className="text-sm font-medium">Link</label>
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              required
              placeholder="https://example.com/resource"
              className="w-full border rounded-lg px-4 py-2 mt-1"
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium">
              Preview Image (optional)
            </label>
            <input
              name="image"
              type="file"
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-2 gap-3">

            {/* Material Type */}
            <div>
              <label className="text-sm font-medium">Material Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 mt-1 w-full"
              >
                <option value="">Select Type</option>
                <option>CheatSheet</option>
                <option>Article</option>
                <option>Video Tutorial</option>
                <option>Documentation</option>
                <option>Courses</option>
              </select>
            </div>

            {/* Domain */}
            <div>
              <label className="text-sm font-medium">Domain</label>
              <select
                name="domain"
                value={form.domain}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 mt-1 w-full"
              >
                <option value="">Select Domain</option>
                <option>Web Development</option>
                <option>Full stack development</option>
                <option>Mobile App</option>
                <option>Blockchain</option>
                <option>AI/ML</option>
                <option>Game Development</option>
                <option>Data Scientist</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="text-sm font-medium">Difficulty</label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                required
                className="border rounded-lg px-3 py-2 mt-1 w-full"
              >
                <option value="">Select Difficulty</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="text-sm font-medium">Tags</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                required
                placeholder="css, flexbox, grid"
                className="border rounded-lg px-3 py-2 mt-1 w-full"
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold"
          >
            Add Material
          </button>

        </form>
      </div>
    </div>
  );
}
