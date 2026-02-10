import React, { useState } from "react";

export default function SellNoteModal({ open, onClose, onAddNote }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    domain: "",
    price: "",
    tags: "",
    file: null,
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const note = {
      title: form.title,
      desc: form.desc,
      domain: form.domain,
      price: Number(form.price),
      type: Number(form.price) === 0 ? "Free" : "Paid",
      tags: form.tags.split(",").map(t => t.trim()),
      fileName: form.file?.name || "",
    };

    if (onAddNote) onAddNote(note);

    onClose();

    // reset form
    setForm({
      title: "",
      desc: "",
      domain: "",
      price: "",
      tags: "",
      file: null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Sell Your Study Note</h2>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Advanced React Hooks"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              name="desc"
              rows="3"
              placeholder="What's covered in your notes?"
              required
              value={form.desc}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Domain + Price */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold">Domain</label>
              <select
                name="domain"
                required
                value={form.domain}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
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

            <div>
              <label className="text-sm font-semibold">Price (INR)</label>
              <input
                name="price"
                type="number"
                placeholder="0 for free"
                required
                min="0"
                value={form.price}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="text-sm font-semibold">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              type="text"
              placeholder="react, hooks, context-api"
              required
              value={form.tags}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="text-sm font-semibold">
              Note File (PDF only)
            </label>
            <input
              name="file"
              type="file"
              accept="application/pdf"
              required
              onChange={handleChange}
              className="w-full mt-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Post for Sale
          </button>
        </form>
      </div>
    </div>
  );
}
