import React from "react";

export default function CreateTeamRoomModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[600px] rounded-xl shadow-xl p-6 relative">
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {/* HEADER */}
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>👥</span> Create New Team Room
        </h2>

        {/* FORM */}
        <div className="space-y-4">
          {/* Room Name */}
          <div>
            <label className="block font-medium mb-1">Room Name *</label>
            <input
              type="text"
              placeholder="e.g., Frontend Warriors, AI Innovators"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description *</label>
            <textarea
              placeholder="What's your team about? What projects will you work on?"
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g., React, Node.js, Full-stack"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Invite Members */}
          <div>
            <label className="block font-medium mb-1">Invite Team Members</label>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter member email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                +
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Create Team Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
