import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ApplyProposalModal({ job, onClose }) {
  const [proposal, setProposal] = useState("");
  const [bid, setBid] = useState("");
  const [delivery, setDelivery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!proposal || !bid || !delivery) {
      setError("All fields are required.");
      return;
    }

    setError("");

    console.log({
      job: job.title,
      proposal,
      bid,
      delivery,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">
          Apply for: <span className="text-black-600">{job.title}</span>
        </h2>

        {/* Proposal */}
        <label className="block font-semibold mb-1">
          Your Proposal <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          placeholder="Explain why you're the best fit..."
          className={`w-full border rounded-lg p-3 mb-4 resize-none ${
            error && !proposal ? "border-red-500" : ""
          }`}
          rows={4}
        />

        {/* Bid + Delivery */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-1">
              Bid Amount ($) <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="number"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              className={`w-full border rounded-lg p-2 ${
                error && !bid ? "border-red-500" : ""
              }`}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Delivery Time <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              placeholder="e.g. 2 weeks"
              className={`w-full border rounded-lg p-2 ${
                error && !delivery ? "border-red-500" : ""
              }`}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-black text-white rounded-lg font-semibold"
        >
          Send Proposal
        </button>
      </div>
    </div>
  );
}
