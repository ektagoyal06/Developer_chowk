import React from "react";

export default function SellNoteModal({ open, onClose }) {
  if (!open) return null;

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

        <form>
          {/* Title */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Title</label>
            <input
              type="text"
              placeholder="e.g. Advanced React Hooks"
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              rows="3"
              placeholder="What's covered in your notes?"
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Domain + Price */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold">Domain</label>
              <select
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg"
              >
                <option value="">Select Domain</option>
                <option>Web Development</option>
                <option>AI/ML</option>
                <option>Data Science</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Price (INR)</label>
              <input
                type="number"
                placeholder="0 for free"
                required
                min="0"
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
              type="text"
              placeholder="react, hooks, context-api"
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="text-sm font-semibold">
              Note File (PDF only)
            </label>
            <input
              type="file"
              accept="application/pdf"
              required
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
