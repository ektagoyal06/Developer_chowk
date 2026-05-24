import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ContributeModal from "../components/ContributeModal";
import Sidebar from "../components/Sidebar";

import { Trash2 } from "lucide-react";

import {
  BookOpenIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {

  // ================= STATES =================
  const [search, setSearch] = React.useState("");
  const [user, setUser] = useState(null);
  const [domain, setDomain] = React.useState("All Domains");
  const [type, setType] = React.useState("All Types");
  const [level, setLevel] = React.useState("All Levels");

  const [showModal, setShowModal] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const [materials, setMaterials] = React.useState([]);

  // ================= FETCH MATERIALS =================
  React.useEffect(() => {
    fetchMaterials();
    fetchUser();
  }, []);

  const fetchMaterials = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/materials"
      );

      setMaterials(res.data);

    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };
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

  // ================= ADD MATERIAL =================
  // ================= ADD MATERIAL =================
  const handleAddMaterial = async (item) => {
    try {

      const payload = {
        ...item,

        // ✅ actual logged in user's name
        postedBy: user?.name || user?.username,
      };

      const res = await axios.post(
        "http://localhost:5000/api/materials",
        payload
      );

      setMaterials((prev) => [res.data, ...prev]);

      setShowModal(false);

    } catch (error) {
      console.log("Add Error:", error);
    }
  };

  // ================= DELETE MATERIAL =================
  const confirmDelete = async () => {
    try {

      await axios.delete(
        `http://localhost:5000/api/materials/${deleteId}`
      );

      setMaterials((prev) =>
        prev.filter((item) => item._id !== deleteId)
      );

      setShowDeleteModal(false);
      setDeleteId(null);

    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // ================= FILTER LOGIC =================
  const filteredMaterials = materials.filter((m) => {

    const matchSearch =
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.desc?.toLowerCase().includes(search.toLowerCase());

    const matchDomain =
      domain === "All Domains" ||
      m.domain === domain;

    const matchType =
      type === "All Types" ||
      m.type === type;

    const matchLevel =
      level === "All Levels" ||
      m.level === level;

    return (
      matchSearch &&
      matchDomain &&
      matchType &&
      matchLevel
    );
  });

  // ================= CARD STYLE =================
  const getCardStyle = (type) => {

    switch (type) {

      case "Courses":
        return {
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
          Icon: BookOpenIcon,
        };

      case "Video Tutorial":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          Icon: CalendarDaysIcon,
        };

      default:
        return {
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          Icon: ArchiveBoxIcon,
        };
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 overflow-y-auto p-8 bg-purple-50">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
              <ArchiveBoxIcon className="w-7 h-7 text-indigo-600" />
              StudyStack
            </h1>

            <p className="text-gray-500 mt-1">
              Curated cheat sheets and study materials for every domain.
            </p>
          </div>

          <button
            onClick={() => {

              // USER NOT LOGGED IN
              if (!user) {

                alert("⚠️ Please Signup/Login first");

                return;
              }

              // USER LOGGED IN
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:opacity-90 transition"
          >
            <span className="text-lg">+</span>
            Contribute
          </button>

        </div>

        {/* ================= FILTERS ================= */}
        <div className="bg-white border rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          {/* SEARCH */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Search
            </label>

            <input
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm w-full outline-none"
            />
          </div>

          {/* DOMAIN */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Domain
            </label>

            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full"
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

          {/* TYPE */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Material Type
            </label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full"
            >
              <option>All Types</option>
              <option>CheatSheet</option>
              <option>Article</option>
              <option>Video Tutorial</option>
              <option>Documentation</option>
              <option>Courses</option>
            </select>
          </div>

          {/* LEVEL */}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Difficulty
            </label>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full"
            >
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

        </div>

        {/* ================= CARDS ================= */}
        <div className="space-y-5">

          {filteredMaterials.length === 0 && (
            <div className="bg-white rounded-xl p-10 text-center shadow">
              <p className="text-gray-500">
                No materials match your filters.
              </p>
            </div>
          )}

          {filteredMaterials.map((card) => {

            const style = getCardStyle(card.type);

            return (
              <div
                key={card._id}
                className="bg-white border rounded-xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
              >

                {/* LEFT */}
                <div className="flex gap-4">

                  {/* ICON */}
                  <div
                    className={`w-12 h-12 rounded-lg ${style.iconBg} flex items-center justify-center`}
                  >
                    <style.Icon
                      className={`w-6 h-6 ${style.iconColor}`}
                    />
                  </div>

                  {/* CONTENT */}
                  <div>

                    <h2 className="font-semibold text-lg">
                      {card.title}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      {card.desc}
                    </p>

                    {/* TAGS */}
                    <div className="flex flex-wrap gap-2 mt-3">

                      {card.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">

                      <span>
                        📚 {card.domain}
                      </span>

                      <span>
                        🎯 {card.level}
                      </span>

                      <span>
                        🧩 {card.type}
                      </span>

                      <span>
                        👤 {card.postedBy}
                      </span>

                    </div>

                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                  {/* VIEW */}
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-50 font-semibold">
                      View ↗
                    </button>
                  </a>

                  {/* DELETE */}
                  {user?.name === card.postedBy && (
                    <button
                      onClick={() => {
                        setDeleteId(card._id);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 rounded-lg hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-5 h-5 text-red-600 hover:text-red-700" />
                    </button>
                  )}

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* ================= CONTRIBUTE MODAL ================= */}
      <ContributeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddMaterial}
      />

      {/* ================= DELETE MODAL ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl w-[520px] p-6 shadow-xl">

            <h2 className="text-xl font-semibold mb-2">
              Are you sure?
            </h2>

            <p className="text-gray-600 mb-6">
              This action cannot be undone.
              This will permanently delete your material.
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}