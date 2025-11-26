import React, { useState } from "react";

export default function SellProjectModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [domain, setDomain] = useState("Web Development");
  const [techStack, setTechStack] = useState("");
  const [coverImage, setCoverImage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      price: Number(price),
      domain,
      techStack: techStack.split(",").map((t) => t.trim()),
      coverImage,
    });

    // Clear form on submit
    setTitle("");
    setDescription("");
    setPrice(0);
    setDomain("Web Development");
    setTechStack("");
    setCoverImage("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close"
        >
          &#x2715;
        </button>

        <h2 className="text-xl font-semibold mb-6 w-96">Sell Your Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="title">
              Project Title
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g., Full-Stack E-commerce Site"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              required
              rows="4"
              placeholder="Describe your project, features, and what's included."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium" htmlFor="price">
                Price (INR)
              </label>
              <input
                id="price"
                type="number"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex-1">
              <label className="block mb-1 font-medium" htmlFor="domain">
                Domain
              </label>
              <select
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
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

          <div>
            <label className="block mb-1 font-medium" htmlFor="techStack">
              Tech Stack (comma-separated)
            </label>
            <input
              id="techStack"
              type="text"
              placeholder="e.g., React, Firebase, Stripe"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium" htmlFor="coverImage">
              Cover Image URL
            </label>
            <input
              id="coverImage"
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              List for Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
