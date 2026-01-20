import { useState } from "react";
import axios from "axios";

export default function PostProjectModal({ closeModal }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        budgetType: "Fixed Price",
        difficulty: "Intermediate",
        domain: "",
        deadline: "",
        skills: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/projects", formData);
            closeModal();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-xl rounded-xl p-6 relative">

                {/* Close Button */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold mb-4">
                    Post a New Freelance Project
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block font-medium mb-1">Title *</label>
                        <input
                            name="title"
                            placeholder="E.g. Building a landing page"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div>
                        <label className="block font-medium mb-1">Description *</label>
                        <textarea
                            name="description"
                            placeholder="Describe the project requirements..."
                            className="w-full border p-2 rounded"
                            rows="3"
                            onChange={handleChange}
                        />
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Budget (INR) *</label>
                            <input
                                name="budget"
                                placeholder="e.g. 1000"
                                className="w-full border p-2 rounded"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Budget Type *</label>
                            <select
                                name="budgetType"
                                className="w-full border p-2 rounded"
                                onChange={handleChange}
                            >
                                <option>Fixed Price</option>
                                <option>Hourly</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Difficulty *</label>
                            <select
                                name="difficulty"
                                className="w-full border p-2 rounded"
                                onChange={handleChange}
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Domain *</label>
                            <select
                                name="domain"
                                className="w-full border p-2 rounded"
                                onChange={handleChange}
                            >
                                <option>All Domains</option>
                                <option>Web Development</option>
                                <option>Mobile App</option>
                                <option>Data Science</option>
                                <option>AI/ML</option>
                                <option>Blockchain</option>
                                <option>Game development</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Deadline *</label>
                        <input
                            type="date"
                            name="deadline"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Required Skills (comma-separated) *</label>
                        <input
                            name="skills"
                            placeholder="e.g. react, HTML"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:opacity-90"
                    >
                        Post Project
                    </button>
                </form>
            </div>
        </div>
    );
}
