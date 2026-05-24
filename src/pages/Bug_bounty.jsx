import React, { useEffect, useState } from "react";
import axios from "axios";

import PostBugModal from "../components/PostBugModal";
import BugDetailsModal from "../components/BugDetailsModal";
import Sidebar from "../components/Sidebar";

import {
  BugAntIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [user, setUser] = useState(null);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All Domains");
  const [reward, setReward] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  // BUG STATES
  const [bugs, setBugs] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);

  // MODAL STATES
  const [openBugModal, setOpenBugModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bugToDelete, setBugToDelete] = useState(null);

  // ================= FETCH BUGS =================
  useEffect(() => {
    fetchUser();
    fetchBugs();
  }, []);

  const fetchUser = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/developer/current-user",
        {
          withCredentials: true,
        }
      );

      setUser(res.data);

    } catch (error) {

      if (error.response?.status === 401) {
        setUser(null);
        return;
      }

      console.log(error);
    }
  };

  const fetchBugs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bugs");

      setBugs(res.data);
    } catch (error) {
      console.log("Fetch Bugs Error:", error);
    }
  };

  // ================= ADD BUG =================
  const handleAddBug = async (bugData) => {
  try {

    const payload = {
      ...bugData,

      // ACTUAL LOGGED IN USER NAME
      postedBy: user?.name,
    };

    const res = await axios.post(
      "http://localhost:5000/api/bugs",
      payload
    );

    setBugs((prev) => [res.data, ...prev]);

    setOpenBugModal(false);

  } catch (error) {
    console.log("Add Bug Error:", error);
  }
};

  // ================= DELETE BUG =================
  const handleDeleteClick = (index) => {
    setBugToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteBug = async () => {
    try {
      const bugId = bugs[bugToDelete]._id;

      await axios.delete(
        `http://localhost:5000/api/bugs/${bugId}`
      );

      setBugs((prev) =>
        prev.filter((_, i) => i !== bugToDelete)
      );

      setShowDeleteModal(false);
      setBugToDelete(null);
    } catch (error) {
      console.log("Delete Bug Error:", error);
    }
  };

  // ================= FILTER LOGIC =================
  const filteredBugs = bugs.filter((bug) => {
    // SEARCH
    const matchesSearch =
      bug.title?.toLowerCase().includes(search.toLowerCase()) ||
      bug.desc?.toLowerCase().includes(search.toLowerCase());

    // DOMAIN
    const matchesDomain =
      domain === "All Domains" ||
      bug.tags?.some(
        (tag) =>
          tag.toLowerCase() === domain.toLowerCase()
      );

    // REWARD TYPE
    const matchesReward =
      reward === "All" ||
      (reward === "points" && bug.reward) ||
      (reward === "paid" && bug.reward);

    // PRICE FILTER
    const matchesPrice =
      priceRange === "All" ||
      (priceRange === "20" && bug.reward <= 20) ||
      (priceRange === "25" &&
        bug.reward > 20 &&
        bug.reward <= 25) ||
      (priceRange === "30" && bug.reward >= 26);

    return (
      matchesSearch &&
      matchesDomain &&
      matchesReward &&
      matchesPrice
    );
  });

  // ================= MY BUGS =================
  const myBugs = bugs.filter(
    (bug) => bug.postedBy === "anjaliaroraa100"
  );

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-orange-50 to-gray-100">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
              <BugAntIcon className="w-6 h-6" />
              Bug Bounty
            </h1>

            <p className="text-gray-500">
              Get rewarded for your problem-solving skills.
            </p>
          </div>

          <button
            onClick={() => {

              // NOT LOGGED IN
              if (!user) {

                alert("⚠️ Please Signup/Login first");

                return;
              }

              // LOGGED IN
              setOpenBugModal(true);
            }}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600 transition"
          >
            <PlusIcon className="w-5 h-5" />
            Post a Bug
          </button>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 mb-6">

          {/* SEARCH */}
          <div className="relative w-1/3">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />

            <input
              type="text"
              placeholder="Search bugs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* DOMAIN */}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/5"
          >
            <option>All Domains</option>
            <option>React</option>
            <option>Flutter</option>
            <option>MongoDB</option>
            <option>Node.js</option>
            <option>JavaScript</option>
            <option>WebSocket</option>
            <option>Android</option>
          </select>

          {/* REWARD */}
          <select
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/5"
          >
            <option value="All">All Rewards</option>
            <option value="points">Points only</option>
            <option value="paid">Paid</option>
          </select>

          {/* PRICE */}
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

        {/* TABS */}
        <div className="bg-white rounded-lg shadow flex mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-3 font-semibold ${activeTab === "all"
              ? "border-b-2 border-black"
              : "text-gray-500"
              }`}
          >
            All Bugs
          </button>

          <button
            onClick={() => setActiveTab("my")}
            className={`flex-1 py-3 font-semibold ${activeTab === "my"
              ? "border-b-2 border-black"
              : "text-gray-500"
              }`}
          >
            My Bugs
          </button>
        </div>

        {/* ALL BUGS */}
        {activeTab === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredBugs.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No bugs match your filters.
              </div>
            )}

            {filteredBugs.map((bug, idx) => (
              <div
                key={bug._id || idx}
                className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  {/* TOP */}
                  <div className="flex justify-between items-start mb-2">

                    <h2 className="font-bold text-lg">
                      {bug.title}
                    </h2>


                    <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-orange-100 text-orange-600 leading-none">
                      {bug.level}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2 mb-2">
                    👤 {bug.postedBy}
                  </p>
                  {/* REWARD */}
                  <p className="text-green-600 font-semibold mb-3">
                    ⚡ {bug.reward} pts
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-gray-600 text-sm mb-4">
                    {bug.desc}
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2">
                    {bug.tags?.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* POSTED BY */}
                  <p className="text-xs text-gray-400 mt-4">
                    Posted by: {bug.postedBy}
                  </p>
                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex gap-2">

                  {/* APPLY */}
                  <button
                    onClick={() => setSelectedBug(bug)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg font-semibold hover:opacity-90"
                  >
                    Apply
                  </button>

                  {/* DELETE */}
                  
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

        {/* MY BUGS */}
        {activeTab === "my" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {myBugs.length === 0 && (
              <div className="col-span-full text-center text-gray-500 bg-white p-10 rounded-xl shadow">
                No bugs posted yet.
              </div>
            )}

            {myBugs.map((bug, idx) => (
              <div
                key={bug._id || idx}
                className="bg-white rounded-xl shadow p-6"
              >
                <h2 className="font-bold text-lg mb-2">
                  {bug.title}
                </h2>

                <p className="text-green-600 font-semibold mb-2">
                  ⚡ {bug.reward} pts
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  {bug.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bug.tags?.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedBug(bug)}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* POST BUG MODAL */}
        {openBugModal && (
          <PostBugModal
            closeModal={() => setOpenBugModal(false)}
            onPostBug={handleAddBug}
          />
        )}

        {/* BUG DETAILS MODAL */}
        {selectedBug && (
          <BugDetailsModal
            bug={selectedBug}
            onClose={() => setSelectedBug(null)}
          />
        )}

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">

            <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

              <h2 className="text-2xl font-bold mb-4">
                Are you sure?
              </h2>

              <p className="text-gray-600 mb-8">
                This action cannot be undone.
                This will permanently delete this bug.
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