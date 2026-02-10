import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function PostBugModal({ closeModal, onPostBug }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        expected: "",
        priority: "Low",
        domain: "All Domains",
        techStack: "",
        rewardPoints: "",
        rewardMoney: "",
        files: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setForm(prev => ({ ...prev, files: Array.from(e.target.files) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onPostBug) {
            onPostBug({
                id: Date.now(),
                title: form.title,
                desc: form.description,                 // ✅ matches dashboard
                level: form.priority.toLowerCase(),     // ✅ matches badge
                reward: Number(form.rewardPoints || 0), // ✅ matches pts
                tags: form.techStack
                    ? form.techStack.split(",").map(t => t.trim())
                    : [form.domain],                   // ✅ ensures tags array
                expected: form.expected,
                rewardMoney: form.rewardMoney,
                files: form.files
            });
        }

        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">

                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-4">Post a New Bug</h2>

                <form onSubmit={handleSubmit}>

                    <label className="font-medium">Bug Title</label>
                    <input
                        required
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g., User login fails with special characters"
                        className="w-full border rounded-lg p-2 mb-4"
                    />

                    <label className="font-medium">Description</label>
                    <textarea
                        required
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Steps to reproduce, expected vs actual behavior..."
                        className="w-full border rounded-lg p-2 mb-4"
                        rows={4}
                    />

                    <label className="font-medium">Expected Outcome</label>
                    <textarea
                        required
                        name="expected"
                        value={form.expected}
                        onChange={handleChange}
                        placeholder="What should happen when this bug is fixed?"
                        className="w-full border rounded-lg p-2 mb-4"
                        rows={3}
                    />

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="font-medium">Priority</label>
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                            </select>
                        </div>

                        <div>
                            <label className="font-medium">Domain</label>
                            <select
                                name="domain"
                                value={form.domain}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                            >
                                <option>All Domains</option>
                                <option>Web Development</option>
                                <option>Full stack development</option>
                                <option>Mobile App</option>
                                <option>Blockchain</option>
                                <option>AI/ML</option>
                                <option>Game Development</option>
                                <option>Data Scientist</option>
                            </select>
                        </div>
                    </div>

                    <label className="font-medium">Tech Stack</label>
                    <input
                        name="techStack"
                        value={form.techStack}
                        onChange={handleChange}
                        placeholder="e.g., React, Firebase"
                        className="w-full border rounded-lg p-2 mb-4"
                    />

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="font-medium">Reward Points</label>
                            <input
                                type="number"
                                name="rewardPoints"
                                value={form.rewardPoints}
                                onChange={handleChange}
                                min="0"
                                step="1"
                                className="w-full border rounded-lg p-2 appearance-auto"
                            />
                        </div>

                        <div>
                            <label className="font-medium">Reward Money (INR)</label>
                            <input
                                type="number"
                                name="rewardMoney"
                                value={form.rewardMoney}
                                onChange={handleChange}
                                min="0"
                                step="1"
                                className="w-full border rounded-lg p-2 appearance-auto"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="font-medium block mb-2">
                            Upload Files / Images / Videos
                        </label>

                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*,.pdf,.doc,.docx,.zip"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-600
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-orange-100 file:text-orange-600
               hover:file:bg-orange-200
               cursor-pointer border rounded-lg p-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                    >
                        Post Bug
                    </button>

                </form>
            </div>
        </div>
    );
}
