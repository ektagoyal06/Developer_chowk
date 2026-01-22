import React from "react";

export default function BookSessionModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">
          Book Session with Anjali Arora
        </h2>

        {/* Session Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold">Interview preparation</h3>

          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Duration:</span>
            <span>60 minutes</span>
          </div>

          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Price:</span>
            <span className="text-green-600 font-medium">₹500</span>
          </div>

          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">Session Type:</span>
            <span>One-on-One</span>
          </div>
        </div>

        {/* Preferred Date */}
        <div className="mb-3">
          <label className="block font-medium mb-1">
            Preferred Date
          </label>
          <input
            type="date"
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Preferred Time */}
        <div className="mb-3">
          <label className="block font-medium mb-1">
            Preferred Time
          </label>
          <input
            type="time"
            required
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Message to Mentor (optional)
          </label>
          <textarea
            placeholder="Share what you'd like to learn..."
            className="w-full border rounded-lg px-3 py-2 h-20"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2 font-medium"
          >
            Cancel
          </button>

          <button
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg font-semibold"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
