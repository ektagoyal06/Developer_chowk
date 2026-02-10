import React, { useState } from "react";

export default function CreateMentorshipModal({ open, onClose, onAddMentor }) {
    const [isFree, setIsFree] = useState(false);
    const [price, setPrice] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        duration: "",
        type: "",
        expertise: "",
        topics: ""
    });

    if (!open) return null;

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const mentorData = {
            id: Date.now(),
            name: "You", // can later replace with logged-in user
            title: form.title,
            description: form.description,
            duration: Number(form.duration),
            price: isFree ? 0 : Number(price),
            type: form.type,
            expertise: form.expertise,
            tags: form.topics.split(",").map(t => t.trim()),
            rating: 0,
            sessions: 0
        };

        if (onAddMentor) onAddMentor(mentorData);

        // reset
        setForm({
            title: "",
            description: "",
            duration: "",
            type: "",
            expertise: "",
            topics: ""
        });
        setPrice("");
        setIsFree(false);

        onClose();
    };

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

                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Session Title */}
                    <div>
                        <label className="block font-medium mb-1">
                            Session Title
                        </label>
                        <input
                            required
                            name="title"
                            value={form.title}
                            onChange={handleChange}
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
                            name="description"
                            value={form.description}
                            onChange={handleChange}
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
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
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
                            <select
                                required
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="border rounded-lg px-3 py-2 w-full"
                            >
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
                            name="expertise"
                            value={form.expertise}
                            onChange={handleChange}
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
                            name="topics"
                            value={form.topics}
                            onChange={handleChange}
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
