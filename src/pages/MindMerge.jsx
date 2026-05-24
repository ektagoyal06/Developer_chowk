import React, { useEffect, useState } from "react";
import axios from "axios";
import SellNoteModal from "../components/SellNoteModal";
import Sidebar from "../components/Sidebar";
import {
  CalendarDaysIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";   // <-- ADDED

export default function Dashboard() {
  /* ===================== STATES ===================== */
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState("All");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchNotes();
    fetchUser();
  }, []);

  const fetchNotes = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/notes"
      );

      setNotes(res.data);

    } catch (error) {
      console.log(error);
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
  /* ===================== ADD NOTE ===================== */
  const handleAddNote = async (newNote) => {
    try {

      const payload = {
  ...newNote,
  postedBy: user?.name || user?.username,
};

      const res = await axios.post(
        "http://localhost:5000/api/notes",
        payload
      );

      setNotes((prev) => [res.data, ...prev]);

    } catch (error) {
      console.log(error);
    }
  };


  /* ===================== FILTER LOGIC ===================== */
  const filteredNotes = notes.filter((note) => {
    const matchSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.desc.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.join(" ").toLowerCase().includes(search.toLowerCase());

    const matchDomain = domain === "All" || note.domain === domain;
    const matchType = type === "All" || note.type === type;
    const matchPrice =
      price === "All" ||
      (price === "0-100" && note.price <= 100) ||
      (price === "100-500" && note.price > 100 && note.price <= 500) ||
      (price === "500+" && note.price > 500);

    return matchSearch && matchDomain && matchType && matchPrice;
  });

  /* ===================== DELETE ===================== */
  const handleDelete = (note) => {
    setSelectedNote(note);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {

      await axios.delete(
        `http://localhost:5000/api/notes/${selectedNote._id}`
      );

      setNotes((prev) =>
        prev.filter((n) => n._id !== selectedNote._id)
      );

      setShowConfirm(false);
      setSelectedNote(null);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* ===================== SIDEBAR (UNCHANGED) ===================== */}
      <Sidebar />

      {/* ===================== MINDMERGE CONTENT ===================== */}
      <div className="flex-1 p-8 overflow-y-auto bg-green-50">

        {/* Header */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">📘 MindMerge</h1>
            <p className="text-gray-600">
              Buy and sell study notes from top students.
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
              setOpenSellModal(true);
            }}
            className="flex items-center gap-1 bg-green-600 text-white px-3 h-10 rounded font-bold text-sm mt-5"
          >
            <PlusIcon className="w-5 h-5" />
            Sell Your Notes
          </button>


        </div>

        {/* Filters */}
        <div className="bg-white p-3 rounded-xl shadow flex gap-4 mb-8 items-center">
          {/* Search */}
          <div className="flex items-center border rounded-lg px-4 h-10 flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="ml-3 w-full outline-none text-sm"
            />
          </div>

          {/* Domain */}
          <select
            onChange={(e) => setDomain(e.target.value)}
            className="border rounded-lg px-4 h-12 w-48 text-sm"
          >
            <option value="All">All Domains</option>
            <option>Web Development</option>
            <option>AI/ML</option>
            <option>Data Scientist</option>
          </select>

          {/* Type */}
          <select
            onChange={(e) => setType(e.target.value)}
            className="border rounded-lg px-4 h-12 w-40 text-sm"
          >
            <option value="All">All Types</option>
            <option>Free</option>
            <option>Paid</option>
          </select>

          {/* Price */}
          <select
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg px-4 h-12 w-40 text-sm"
          >
            <option value="All">All Prices</option>
            <option>0-100</option>
            <option>100-500</option>
            <option>500+</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[330px]">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between min-h-[300px] hover:shadow-md transition"
            >
              {/* Top */}
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg leading-snug">
                    {note.title}
                  </h3>
                  <TrashIcon
                    onClick={() => handleDelete(note)}
                    className="w-7 h-7 text-red-500 cursor-pointer hover:text-red-600"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
  by {note.postedBy || "Unknown User"}
</p>

                <p className="text-sm text-gray-600 mt-4 line-clamp-3">
                  {note.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Button */}
              {note.type === "Free" ? (
                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Download
                </button>
              ) : (
                <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium">
                  <ShoppingCartIcon className="w-4 h-4" />
                  Buy Now
                </button>
              )}

            </div>
          ))}
        </div>

      </div>

      {/* ===================== CONFIRM DELETE MODAL ===================== */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <ExclamationTriangleIcon className="w-6 h-6" />
              <h2 className="font-bold text-lg">Delete Note</h2>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                "{selectedNote?.title}"
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <SellNoteModal
        open={openSellModal}
        onClose={() => setOpenSellModal(false)}
        onAddNote={handleAddNote}
      />

    </div>
  );
}