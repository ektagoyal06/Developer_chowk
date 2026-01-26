import React, { useState } from "react";
import SellNoteModal from "../components/SellNoteModal";
import {
  HomeIcon,
  FolderIcon,
  UserGroupIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ArchiveBoxIcon,
  TrophyIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  BoltIcon,
  StarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ShoppingCartIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";


import { Link } from "react-router-dom";   // <-- ADDED

// ✅ Added path field for navigation
const sidebarLinks = [
  { icon: HomeIcon, title: "Home", subtitle: "Your personalized feed", path: "/" },
  { icon: FolderIcon, title: "ProjectArena", subtitle: "Discover & collaborate", path: "/project" },
  { icon: UserGroupIcon, title: "TeamsHive", subtitle: "Find your squad", path: "/teams" },
  { icon: BriefcaseIcon, title: "Prolance", subtitle: "Earn while you code", path: "/prolance" },
  { icon: Cog6ToothIcon, title: "Bug Bounty", subtitle: "Fix & get rewards", path: "/bug-bounty" },
  { icon: ChatBubbleLeftRightIcon, title: "Let's Connect", subtitle: "Find mentors", path: "/connect" },
  { icon: BookOpenIcon, title: "MindMerge", subtitle: "Buy & sell notes", path: "/mind-merge" },
  { icon: ArchiveBoxIcon, title: "StudyStack", subtitle: "Courses & materials", path: "/study-stack" },
  { icon: TrophyIcon, title: "Leaderboard", subtitle: "Compete & rank up", path: "/leaderboard" },
];

const stats = [
  {
    icon: BoltIcon,
    title: "Day Streak",
    value: 0,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: BoltIcon,
    title: "Bugs Fixed",
    value: 0,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: ChartBarIcon,
    title: "Projects",
    value: 0,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: StarIcon,
    title: "Rating",
    value: 0,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
];

const initialNotes = [
  {
    id: 1,
    title: "Data Structures & Algorithms Cheatsheet",
    desc: "All major DS&A concepts in a concise, easy-to-read format.",
    tags: ["dsa", "algorithms"],
    domain: "Data Scientist",
    type: "Free",
    price: 0,
  },
  {
    id: 2,
    title: "Comprehensive React Hooks Guide",
    desc: "Deep dive into every React hook with examples.",
    tags: ["react", "hooks"],
    domain: "Web Development",
    type: "Paid",
    price: 299,
  },
  {
    id: 3,
    title: "Introduction to Python for AI/ML",
    desc: "Beginner-friendly Python, NumPy & Pandas notes.",
    tags: ["python", "ai"],
    domain: "AI/ML",
    type: "Paid",
    price: 499,
  },
  {
    id: 4,
    title: "Machine Learning Notes - Complete Course",
    desc: "Supervised & unsupervised learning explained.",
    tags: ["ml", "ai"],
    domain: "AI/ML",
    type: "Paid",
    price: 799,
  },
];


export default function Dashboard() {
  /* ===================== STATES ===================== */
  const [notes, setNotes] = useState(initialNotes);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState("All");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [openSellModal, setOpenSellModal] = useState(false);

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

  const confirmDelete = () => {
    setNotes(notes.filter((n) => n.id !== selectedNote.id));
    setShowConfirm(false);
    setSelectedNote(null);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* ===================== SIDEBAR (UNCHANGED) ===================== */}
      <div className="w-64 bg-white flex flex-col border-r border-gray-300">
        <div className="flex items-center p-4 space-x-3 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            &lt;/&gt;
          </div>
          <div>
            <h1 className="font-bold text-lg">Developer Chowk</h1>
            <p className="text-xs text-gray-600">Build. Collaborate. Grow.</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {sidebarLinks.map(({ icon: Icon, title, subtitle, path }) => (
            <Link
              to={path}
              key={title}
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900"
            >
              <Icon className="w-5 h-5" />
              <div className="text-sm">
                <p className="font-semibold">{title}</p>
                <p className="text-xs text-gray-400">{subtitle}</p>
              </div>
            </Link>
          ))}
        </nav>

        <div className="m-4 p-4 bg-white rounded-lg shadow">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="w-10 h-10 text-purple-600" />
            <div>
              <h2 className="font-bold">Anjali Arora</h2>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                Developer
              </span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
            <p className="flex items-center text-green-600 space-x-1">
              <BoltIcon className="w-4 h-4" />
              <span>Streak: 0</span>
            </p>
            <p className="flex items-center text-orange-500 space-x-1">
              <StarIcon className="w-4 h-4" />
              <span>Rating: 0</span>
            </p>
            <p className="flex items-center text-blue-700 space-x-1">
              <ChartBarIcon className="w-4 h-4" />
              <span>Projects: 0</span>
            </p>
            <p className="flex items-center text-red-600 space-x-1">
              <BoltIcon className="w-4 h-4" />
              <span>Bugs: 0</span>
            </p>
          </div>
        </div>
      </div>

      {/* ===================== MINDMERGE CONTENT ===================== */}
      <div className="flex-1 p-8 overflow-y-auto bg-green-50">

        {/* Header */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mt-5">📘 MindMerge</h1>
            <p className="text-gray-600">
              Buy and sell study notes from top students.
            </p>
          </div>
          <button
        onClick={() => setOpenSellModal(true)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
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
                  by anjaliaroraa100
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
      />
    </div>
  );
}