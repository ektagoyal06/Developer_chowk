import { XMarkIcon } from "@heroicons/react/24/outline";

export default function PostBugModal({ closeModal }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative">

                {/* Close */}
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-4">Post a New Bug</h2>

                {/* Bug Title */}
                <label className="font-medium">Bug Title</label>
                <input
                    required
                    placeholder="e.g., User login fails with special characters"
                    className="w-full border rounded-lg p-2 mb-4"
                />

                {/* Description */}
                <label className="font-medium">Description</label>
                <textarea
                    required
                    placeholder="Steps to reproduce, expected vs actual behavior..."
                    className="w-full border rounded-lg p-2 mb-4"
                    rows={4}
                />

                {/* Expected Outcome */}
                <label className="font-medium">Expected Outcome</label>
                <textarea
                    required
                    placeholder="What should happen when this bug is fixed?"
                    className="w-full border rounded-lg p-2 mb-4"
                    rows={3}
                />

                {/* Priority + Domain */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="font-medium">Priority</label>
                        <select className="w-full border rounded-lg p-2">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Critical</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-medium">Domain</label>
                        <select className="w-full border rounded-lg p-2">
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

                {/* Tech Stack */}
                <label className="font-medium">Tech Stack</label>
                <input
                    placeholder="e.g., React, Firebase"
                    className="w-full border rounded-lg p-2 mb-4"
                />

                {/* Reward */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="font-medium">Reward Points</label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            className="w-full border rounded-lg p-2 appearance-auto"
                        />
                    </div>

                    <div>
                        <label className="font-medium">Reward Money (INR)</label>
                        <input
                            type="number"
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
    className="block w-full text-sm text-gray-600
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-orange-100 file:text-orange-600
               hover:file:bg-orange-200
               cursor-pointer border rounded-lg p-2"
  />
</div>



                {/* Submit */}
                <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600">
                    Post Bug
                </button>
            </div>
        </div>
    );
}
