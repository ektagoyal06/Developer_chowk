import React, { useState } from "react";
import PostBugModal from "../components/PostBugModal";
import BugDetailsModal from "../components/BugDetailsModal";
import Sidebar from "../components/Sidebar";
import {
  BugAntIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";


// Bug cards data
const initialBugs = [

  {
    title: "Flutter App Crash on Android",
    level: "high",
    reward: 30,
    desc: "App crashes when trying to access device camera on certain Android devices.",
    tags: ["Flutter", "Dart", "Android"],
    postedBy: "anjaliaroraa100", // ✅ ADDED
  },
  {
    title: "React Component Memory Leak",
    level: "high",
    reward: 25,
    desc: "Memory leak in a React component when using useEffect with websocket connections.",
    tags: ["React", "JavaScript", "WebSocket"],
    postedBy: "rahul_dev",
  },
  {
    title: "Database Query Performance Issue",
    level: "medium",
    reward: 20,
    desc: "Slow query performance when fetching user data with related posts.",
    tags: ["MongoDB", "Mongoose", "Node.js"],
    postedBy: "db_master",
  },
];
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ FILTER STATES
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [reward, setReward] = useState("All");
  const [selectedBug, setSelectedBug] = useState(null);
  const [openBugModal, setOpenBugModal] = useState(false);
  const [priceRange, setPriceRange] = useState("All");
  const [bugs, setBugs] = useState(initialBugs);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bugToDelete, setBugToDelete] = useState(null);

  const handleAddBug = (bugData) => {
    setBugs(prev => [
      {
        ...bugData,
        id: Date.now(),
        postedBy: "anjaliaroraa100"
      },
      ...prev
    ]);
  };
  const handleDeleteClick = (index) => {
    setBugToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteBug = () => {
    setBugs((prev) => prev.filter((_, i) => i !== bugToDelete));
    setShowDeleteModal(false);
    setBugToDelete(null);
  };

  // ✅ FILTER LOGIC
  const filteredBugs = bugs.filter((bug) => {
    const matchesSearch =
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.desc.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      domain === "All" || bug.tags.includes(domain);

    const matchesReward =
      reward === "All" || reward === "points";

    const matchesPrice =
      priceRange === "All" || bug.reward >= Number(priceRange);

    return matchesSearch && matchesDomain && matchesReward && matchesPrice;
  });


  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-orange-50 to-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
              <BugAntIcon className="w-6 h-6" /> Bug Bounty
            </h1>
            <p className="text-gray-500">
              Get rewarded for your problem-solving skills.
            </p>
          </div>
          <button
            onClick={() => setOpenBugModal(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
          >
            <PlusIcon className="w-5 h-5" />
            Post a Bug
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 mb-6">
          {/* Search */}
          <div className="relative w-1/3">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              placeholder="Search bugs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Domain */}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/5"
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

          {/* Reward Type */}
          <select
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/5"
          >
            <option value="All">All Rewards</option>
            <option value="points">Points only</option>
            <option value="paid">Paid</option>
          </select>

          {/* Price */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/5"
          >
            <option value="All">All Prices</option>
            <option value="20">0–20 pts</option>
            <option value="25">21–25 pts</option>
            <option value="30">26+ pts</option>
          </select>
        </div>

        {/* Toggle */}
        <div className="bg-white rounded-lg shadow flex mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-3 font-semibold ${activeTab === "all" ? "border-b-2 border-black" : "text-gray-500"
              }`}
          >
            All Bugs
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`flex-1 py-3 font-semibold ${activeTab === "my" ? "border-b-2 border-black" : "text-gray-500"
              }`}
          >
            My Bugs
          </button>
        </div>

        {/* Bug Cards */}
        {activeTab === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredBugs.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No bugs match your filters.
              </div>
            )}

            {filteredBugs.map((bug, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-lg">{bug.title}</h2>

                    <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-orange-100 text-orange-600 leading-none">
                      {bug.level}
                    </span>
                  </div>


                  <p className="text-green-600 font-semibold mb-3">
                    ⚡ {bug.reward} pts
                  </p>

                  <p className="text-gray-600 text-sm mb-4">{bug.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {bug.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-2">

                  <button
                    onClick={() => setSelectedBug(bug)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg font-semibold"
                  >
                    Apply
                  </button>

                  {/* ✅ Trash Icon (Only Poster Can See) */}

                  <button
                    onClick={() => handleDeleteClick(idx)}
                    className="px-3 py-2 border border-red-400 rounded-lg text-red-600 hover:bg-red-100 flex items-center justify-center"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>


                </div>

              </div>
            ))}
          </div>
        )}

        {activeTab === "my" && (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No bugs posted yet.
          </div>
        )}
        {openBugModal && (
          <PostBugModal
            closeModal={() => setOpenBugModal(false)}
            onPostBug={handleAddBug}
          />


        )}
        {selectedBug && (
          <BugDetailsModal
            bug={selectedBug}
            onClose={() => setSelectedBug(null)}
          />
        )}
        {showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

      <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>

      <p className="text-gray-600 mb-8">
        This action cannot be undone. This will permanently delete this bug.
      </p>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-6 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          onClick={confirmDeleteBug}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
)}

      </div>
    </div>
  );
}
