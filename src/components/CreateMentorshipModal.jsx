import React, { useState } from "react";

export default function CreateMentorshipModal({ open, onClose }) {
    const [isFree, setIsFree] = useState(false);
    const [price, setPrice] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-6">
                    Create Mentorship Session
                </h2>

                <form className="space-y-4">

                    {/* Session Title */}
                    <div>
                        <label className="block font-medium mb-1">
                            Session Title
                        </label>
                        <input
                            required
                            placeholder="e.g. React developemnt mentorship"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">
                            Session Description
                        </label>
                        <textarea
                            required
                            placeholder="What will you teach?"
                            className="w-full border rounded-lg px-4 py-2 h-24"
                        />
                    </div>

                    {/* Duration, Price, Type */}
                    <div className="grid grid-cols-3 gap-4">

                        <div>
                            <label className="block font-medium mb-1">
                                Duration (minutes)
                            </label>
                            <input
                                required
                                type="number"
                                min="1"
                                placeholder="e.g. 60"
                                className="border rounded-lg px-3 py-2 w-full"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Price (INR)
                            </label>
                            <input
                                type="number"
                                min="0"
                                placeholder="e.g. 499"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                disabled={isFree}
                                required={!isFree}
                                className={`border rounded-lg px-3 py-2 w-full ${isFree ? "bg-gray-100 cursor-not-allowed" : ""
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">
                                Session Type
                            </label>
                            <select required className="border rounded-lg px-3 py-2 w-full">
                                <option value="">Select Type</option>
                                <option value="One-on-One">One-on-One</option>
                                <option value="Group">Group</option>
                                <option value="Workshop">Workshop</option>
                            </select>
                        </div>
                    </div>

                    {/* Free Session Checkbox */}
                    <label className="flex items-center gap-2 text-sm font-medium mt-2">
                        <input
                            type="checkbox"
                            checked={isFree}
                            onChange={(e) => {
                                setIsFree(e.target.checked);
                                if (e.target.checked) setPrice("");
                            }}
                        />
                        Offer this session for free
                    </label>

                    {/* Expertise */}
                    <div>
                        <label className="block font-medium mb-1">
                            Your Expertise
                        </label>
                        <input
                            required
                            placeholder="e.g. React, DSA, Backend"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Topics Covered */}
                    <div>
                        <label className="block font-medium mb-1">
                            Topics Covered
                        </label>
                        <input
                            required
                            placeholder="e.g. Hooks, State, API integration"
                            className="w-full border rounded-lg px-4 py-2"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-semibold mt-4"
                    >
                        Create Session
                    </button>
                </form>
            </div>
        </div>
    );
}
