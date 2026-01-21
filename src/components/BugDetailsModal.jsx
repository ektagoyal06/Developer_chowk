import { XMarkIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function BugDetailsModal({ bug, onClose }) {
  if (!bug) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold">{bug.title}</h2>

        {/* Priority */}
        <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600">
          {bug.level}
        </span>

        {/* Reward */}
        <div className="mt-6 bg-green-50 rounded-lg p-4 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full">
            <BoltIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {bug.reward}
            </p>
            <p className="text-sm text-gray-500">Points</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="font-semibold mb-2">🐞 Bug Description</h3>
          <p className="text-gray-600">{bug.desc}</p>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 bg-purple-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">{"</>"} Required Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {bug.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-white border rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <p className="text-sm text-gray-500">
            Posted by: <span className="font-semibold">{bug.postedBy}</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2">
              ⭐ Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
