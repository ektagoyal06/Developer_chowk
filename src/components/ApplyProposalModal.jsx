import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function ApplyProposalModal({
  job,
  onClose,
  onSubmitProposal,
}) {

  const navigate = useNavigate();

  const [proposal, setProposal] = useState("");
  const [bid, setBid] = useState("");
  const [delivery, setDelivery] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  /* ================= FILE VALIDATION ================= */

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    if (selectedFile) {

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {

        setError("Only PDF or DOC files are allowed.");

        setFile(null);

        return;
      }

      setError("");

      setFile(selectedFile);
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = () => {

    // VALIDATION
    if (!proposal || !bid || !delivery) {

      setError("All required fields must be filled.");

      return;
    }

    setError("");

    // SEND DATA TO DASHBOARD
    onSubmitProposal({

      job,

      proposal,

      bid,

      delivery,

      fileName: file?.name || null,
    });

    // SUCCESS ALERT
    alert("✅ Your proposal sent successfully!");

    // CLOSE MODAL
    onClose();
  };

  /* ================= LOGIN CHECK ================= */

  const handleProposal = () => {

    const user = localStorage.getItem("dcUser");

    // USER NOT LOGGED IN
    if (!user) {

      alert("⚠️ Please Sign Up / Login first to send a proposal.");

      navigate("/signup");

      return;
    }

    // USER LOGGED IN
    handleSubmit();
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-bold mb-4">
          Apply for:{" "}
          <span className="text-purple-600">
            {job.title}
          </span>
        </h2>

        {/* PROPOSAL */}
        <label className="block font-semibold mb-1">
          Your Proposal <span className="text-red-500">*</span>
        </label>

        <textarea
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          placeholder="Explain why you're the best fit..."
          rows={4}
          className={`w-full border rounded-lg p-3 mb-4 resize-none ${
            error && !proposal
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />

        {/* BID + DELIVERY */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          {/* BID */}
          <div>

            <label className="block font-semibold mb-1">
              Bid Amount ($)
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="number"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              className={`w-full border rounded-lg p-2 ${
                error && !bid
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>

          {/* DELIVERY */}
          <div>

            <label className="block font-semibold mb-1">
              Delivery Time
              <span className="text-red-500"> *</span>
            </label>

            <input
              value={delivery}
              onChange={(e) => setDelivery(e.target.value)}
              placeholder="e.g. 2 weeks"
              className={`w-full border rounded-lg p-2 ${
                error && !delivery
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>
        </div>

        {/* FILE UPLOAD */}
        <div className="mb-4">

          <label className="block font-semibold mb-1">
            Upload Detailed Proposal (Optional)
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2"
          />

          <p className="text-xs text-gray-500 mt-1">
            Only PDF or DOC files allowed.
          </p>

          {file && (
            <p className="text-sm text-green-600 mt-2">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleProposal}
          className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Send Proposal
        </button>
      </div>
    </div>
  );
}