// Dashboard.jsx
import React, { useEffect, useState } from "react";
import CreateTeamRoomModal from "../components/CreateTeamRoomModal";
import LookingForMembersModal from "../components/LookingForMembersModal";
import Sidebar from "../components/Sidebar";
import { EyeIcon, UserPlusIcon } from "lucide-react";
import axios from "axios";
import {
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Default projects


export default function Dashboard() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState("Browse Projects");
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLookingModalOpen, setIsLookingModalOpen] = useState(false);
  const [selectedBrowseProject, setSelectedBrowseProject] = useState(null);
  const [showBrowseModal, setShowBrowseModal] = useState(false);

  const currentUser = user?.name || null;

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

    setUser(null);

    if (error.response?.status !== 401) {
      console.log(error);
    }

  } finally {

    setLoadingUser(false);

  }
};

  useEffect(() => {

  fetchUser();

  fetchTeams();

}, []);

  const fetchTeams = async () => {
  try {

    const res = await axios.get(
      "http://localhost:5000/api/teams",
      {
        withCredentials: true,
      }
    );

    setProjects(res.data);

  } catch (error) {

    if (error.response?.status === 401) {

      setProjects([]);

      return;
    }

    console.log(error);
  }
};

  // ADD NEW PROJECT FROM MODAL
  const handleAddProject = async (newProject) => {
    try {
      const projectObj = {
        ...newProject,
        poster: currentUser,
      };

      await axios.post(
  "http://localhost:5000/api/teams",
  projectObj,
  {
    withCredentials: true,
  }
);

      fetchTeams();
    } catch (error) {
      console.log(error);
    }
  };
  // ✅ DELETE FUNCTION
  
  const handleDeleteClick = (index) => {
    setProjectToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteProject = async () => {
    try {
      await axios.delete(
  `http://localhost:5000/api/teams/${projects[projectToDelete]._id}`,
  {
    withCredentials: true,
  }
);

      fetchTeams();

      setShowDeleteModal(false);
      setProjectToDelete(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinTeam = async () => {

  if (!user) {

    alert("⚠️ Please Sign Up / Login first to join a team.");

    return;
  }

  try {

    alert("✅ Request sent to join the team!");

  } catch (error) {

    console.log(error);

  }
};
if (loadingUser) {

  return (
    <div className="h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

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
              onClick={() => {
                if (!user) {
                  alert("⚠️ Please Signup/Login first");
                  return;
                }

                setIsOpen(true);
              }}
            >
              + Create Team Room
            </button>

            {/* Looking for Team Members */}
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              onClick={() => {
                if (!user) {
                  alert("⚠️ Please Signup/Login first");
                  return;
                }

                setIsLookingModalOpen(true);
              }}
            >
              + Looking for Team Members
            </button>
          </div>
        </header>


        {/* Tabs */}
        <div className="flex border-b bg-white rounded-lg overflow-hidden w-full mb-8 p-2 text-lg font-semibold">
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
                    onClick={handleJoinTeam}
                    className="flex-1 min-w-0 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-1"
                  >
                    <UserPlusIcon size={16} /> Join Team
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBrowseProject(proj);
                      setShowBrowseModal(true);
                    }}
                    className="px-3 py-2 border rounded-lg hover:bg-gray-100 transition flex items-center justify-center text-gray-600"
                  >
                    <EyeIcon size={16} />
                  </button>


                  {/* ✅ DUSTBIN BUTTON (Only Poster Can See) */}
                  {currentUser && proj.poster === currentUser && (
                    <button
                      onClick={() => handleDeleteClick(idx)}
                      className="px-3 py-2 border border-red-400 rounded-lg hover:bg-red-100 transition flex items-center justify-center text-red-600"
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
              <button className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100 transition font-bold">
                Contact Team
              </button>
              <button
                onClick={handleJoinTeam}
                className="flex-1 min-w-0 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-1"
              >
                <UserPlusIcon size={16} /> Join Team
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
