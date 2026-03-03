import React from "react";
import ContributeModal from "../components/ContributeModal";
import Sidebar from "../components/Sidebar";
import { Trash2 } from "lucide-react";

import {
  BookOpenIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";


export default function Dashboard() {

  const [search, setSearch] = React.useState("");
  const [domain, setDomain] = React.useState("All Domains");
  const [type, setType] = React.useState("All Types");
  const [level, setLevel] = React.useState("All Levels");
  const [showModal, setShowModal] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);


  const [materials, setMaterials] = React.useState([
    {
      id: 1,
      title: "Flexbox Froggy",
      desc: "A fun and interactive game to learn CSS Flexbox.",
      domain: "Web Development",
      type: "Courses",
      level: "Beginner",
      tags: ["Web Development", "Beginner"],
      link: "https://flexboxfroggy.com/",   // ✅ ADDED
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      Icon: BookOpenIcon,
    },
    {
      id: 2,
      title: "3Blue1Brown: Essence of linear algebra",
      desc: "An incredible video series that provides a geometric intuition for linear algebra concepts.",
      domain: "AI/ML",
      type: "Video Tutorial",
      level: "Intermediate",
      tags: ["AI ML", "Intermediate"],
      link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr", // ✅ ADDED
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      Icon: CalendarDaysIcon,
    },
    {
      id: 3,
      title: "React Official Documentation",
      desc: "The official and most up-to-date source for learning React.",
      domain: "Full stack development",
      type: "Documentation",
      level: "Intermediate",
      tags: ["Web Development", "Intermediate"],
      link: "https://react.dev/",   // ✅ ADDED
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      Icon: ArchiveBoxIcon,
    },
  ]);

  const handleAddMaterial = (item) => {
    setMaterials(prev => [item, ...prev]);
  };

  const confirmDelete = () => {
    setMaterials(prev => prev.filter(i => i.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };



  const filteredMaterials = materials.filter(m => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.desc.toLowerCase().includes(search.toLowerCase());

    const matchDomain = domain === "All Domains" || m.domain === domain;
    const matchType = type === "All Types" || m.type === type;
    const matchLevel = level === "All Levels" || m.level === level;

    return matchSearch && matchDomain && matchType && matchLevel;
  });

  const handleDelete = (id) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-purple-50">

        {/* Header */}
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
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow hover:opacity-90"
          >
            <span className="text-lg">+</span>
            Contribute
          </button>
        </div>

        {/* Filters — headings added */}
        <div className="bg-white border rounded-xl p-4 grid grid-cols-4 gap-4 mb-6">

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Search</label>
            <input
              placeholder="Search materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg px-4 py-2 text-sm w-full"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Domain</label>
            <select value={domain} onChange={e => setDomain(e.target.value)} className="border rounded-lg px-3 py-2 text-sm w-full">
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

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Material Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="border rounded-lg px-3 py-2 text-sm w-full">
              <option>All Types</option>
              <option>CheatSheet</option>
              <option>Article</option>
              <option>Video Tutorial</option>
              <option>Documentation</option>
              <option>Courses</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Difficulty</label>
            <select value={level} onChange={e => setLevel(e.target.value)} className="border rounded-lg px-3 py-2 text-sm w-full">
              <option>All Levels</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

        </div>

        {/* Cards */}
        <div className="space-y-5">
          {filteredMaterials.map(card => (
            <div key={card.id} className="bg-white border rounded-xl p-5 flex justify-between items-center shadow-sm">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                  <card.Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>

                <div>
                  <h2 className="font-semibold text-lg">{card.title}</h2>
                  <p className="text-gray-500 text-sm">{card.desc}</p>
                  <div className="flex gap-2 mt-2 text-xs">
                    {card.tags.map(t => (
                      <span key={t} className="px-3 py-1 bg-gray-100 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* ✅ View redirect added */}
                <a href={card.link} target="_blank" rel="noreferrer">
                  <button className="border px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 font-semibold">
                    View ↗
                  </button>
                </a>

                <button
                  onClick={() => {
                    setDeleteId(card.id);
                    setShowDeleteModal(true);
                  }}

                  className="p-2 rounded-lg hover:bg-red-50 transition"
                >
                  <Trash2 className="w-5 h-5 text-red-600 hover:text-red-700 " />
                </button>

              </div>
            </div>
          ))}

          {filteredMaterials.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No materials match your filters.
            </p>
          )}
        </div>

      </div>

      <ContributeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddMaterial}
      />

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[520px] p-6 shadow-xl">

            <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. This will permanently delete your material.
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
