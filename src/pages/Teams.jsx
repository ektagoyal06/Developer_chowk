// Dashboard.jsx
import React, { useState } from "react";
import CreateTeamRoomModal from "../components/CreateTeamRoomModal";
import LookingForMembersModal from "../components/LookingForMembersModal";
import Sidebar from "../components/Sidebar";
import { EyeIcon, UserPlusIcon } from "lucide-react";
import {
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Default projects
const defaultProjects = [
  {
    title: "Real-time Collaboration Whiteboard",
    description:
      "Developing an interactive whiteboard application for remote teams with real-time collaboration, video chat integration, and cloud sync.",
    level: "intermediate",
    type: "web development",
    members: "1/3 members",
    due: "Due by Aug 1, 2024",
    tags: ["React", "WebSockets", "Canvas API"],
    recruiting: true,
    poster: "Anjali Arora",
  },
  {
    title: "E-Commerce Platform with AI Recommendations",
    description:
      "Building a full-featured e-commerce platform with AI-powered product recommendations, real-time inventory management, and secure payment integration.",
    level: "advanced",
    type: "web development",
    members: "2/5 members",
    due: "Due by Aug 15, 2024",
    tags: ["React", "Node.js", "MongoDB"],
    recruiting: true,
    poster: "Anjali Arora",
  },
  {
    title: "Social Media App for College Students",
    description:
      "Creating a mobile-first social networking app specifically designed for college students with features like study groups, event planning, and messaging.",
    level: "intermediate",
    type: "mobile app",
    members: "1/4 members",
    due: "Due by Jul 30, 2024",
    tags: ["React Native", "Firebase", "Node.js"],
    recruiting: true,
    poster: "Anjali Arora",
  },
];

export default function Dashboard() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("Browse Projects");
  const [projects, setProjects] = useState(defaultProjects);
  const [isOpen, setIsOpen] = useState(false);
  const [isLookingModalOpen, setIsLookingModalOpen] = useState(false);
  const [selectedBrowseProject, setSelectedBrowseProject] = useState(null);
  const [showBrowseModal, setShowBrowseModal] = useState(false);
  const currentUser = "Anjali Arora";

  // ADD NEW PROJECT FROM MODAL
  const handleAddProject = (newProject) => {
    setProjects((prev) => [
      { ...newProject, poster: currentUser }, // ✅ ensure poster saved
      ...prev,
    ]);
  };
  // ✅ DELETE FUNCTION
  const handleDeleteProject = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {
      setProjects((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const handleDeleteClick = (index) => {
    setProjectToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteProject = () => {
    setProjects((prev) => prev.filter((_, i) => i !== projectToDelete));
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  return (
    <div className="flex h-screen bg-blue-50 text-gray-900">
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          {/* Left Side Title */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
              <span>👥</span> TeamsHive
            </h1>
            <p className="text-gray-500">
              Create teams, collaborate on projects, and grow together
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex gap-3 mb-4 -ml-12">
            {/* Create Team Room */}
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={() => setIsOpen(true)}
            >
              + Create Team Room
            </button>

            {/* Looking for Team Members */}
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={() => setIsLookingModalOpen(true)}
            >
              + Looking for Team Members
            </button>
          </div>
        </header>


        {/* Tabs */}
        <div className="flex border-b bg-white rounded-lg overflow-hidden w-full mb-8">
          {["Browse Projects", "Browse Rooms", "My Rooms", "Applications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-2 transition
                ${activeTab === tab ? "border-b-2 border-black font-semibold" : "text-gray-500"}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* PROJECTS GRID */}
        {/* TAB CONTENT */}
        {activeTab === "Browse Projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md relative flex flex-col h-full">

                {proj.recruiting && (
                  <span className="absolute top-4 right-4 bg-gray-200 px-2 py-1 rounded-full text-xs">
                    recruiting
                  </span>
                )}

                {/* CONTENT WRAPPER */}
                <div className="flex-1">

                  <h2 className="text-lg font-bold mb-2">{proj.title}</h2>

                  <p className="text-gray-600 mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100">
                      {proj.level}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-200">
                      {proj.type}
                    </span>
                  </div>

                  <div className="text-gray-500 text-sm mb-4">
                    <p>{proj.members}</p>
                    <p>{proj.due}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-200 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-auto w-full">

                  <button
                    onClick={() => {
                      setSelectedBrowseProject(proj);
                      setShowBrowseModal(true);
                    }}
                    className="flex-1 min-w-0 px-3 py-2 border rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-1 font-semibold"
                  >
                    <EyeIcon size={16} /> Explore
                  </button>

                  <button
                    className="flex-1 min-w-0 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-1"
                  >
                    <UserPlusIcon size={16} /> Join Team
                  </button>
                  {/* ✅ DUSTBIN BUTTON (Only Poster Can See) */}
                  {proj.poster === currentUser && (
                    <button
                      onClick={() => handleDeleteClick(idx)}
                      className="px-3 py-2 border rounded-lg hover:bg-red-100 transition flex items-center justify-center text-red-600"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}

                </div>

              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE FOR OTHER TABS */}
        {activeTab !== "Browse Projects" && (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            Nothing is posted yet.
          </div>
        )}
      </div>

      {/* MODALS */}
      <CreateTeamRoomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleAddProject}
      />

      <LookingForMembersModal
        isOpen={isLookingModalOpen}
        onClose={() => setIsLookingModalOpen(false)}
        onPostProject={handleAddProject}
      />
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>

            <p className="text-gray-600 mb-8">
              This action cannot be undone. This will permanently delete your material.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteProject}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
      {showBrowseModal && selectedBrowseProject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[650px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setShowBrowseModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">
              {selectedBrowseProject.title}
            </h2>

            {/* Recruiting Badge */}
            {selectedBrowseProject.recruiting && (
              <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-xs mb-4">
                Recruiting
              </span>
            )}

            {/* Description */}
            <div className="mb-5">
              <h3 className="font-semibold mb-2">Project Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedBrowseProject.description}
              </p>
            </div>

            {/* Level + Type */}
            <div className="flex gap-3 mb-5">
              <span className="px-3 py-1 bg-yellow-100 rounded-full text-sm">
                {selectedBrowseProject.level}
              </span>
              <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                {selectedBrowseProject.type}
              </span>
            </div>

            {/* Members + Due */}
            <div className="text-gray-600 text-sm space-y-2 mb-5">
              <p>👥 {selectedBrowseProject.members}</p>
              <p>📅 {selectedBrowseProject.due}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedBrowseProject.tags?.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100 transition">
                Contact Team
              </button>
              <button className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                Join Team
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
