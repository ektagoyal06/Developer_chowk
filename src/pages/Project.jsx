import React, { useEffect, useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import Sidebar from "../components/Sidebar";
import axios from "axios";
// import { Link } from "react-router-dom";

import {
  EyeIcon,
  TrashIcon,
  UsersIcon,
  UserPlusIcon,
  CalendarIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";



function SellProjectModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [domain, setDomain] = useState("Web Development");
  const [techStack, setTechStack] = useState("");
  const [coverImage, setCoverImage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const techStackArray = techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);

    onSubmit({
      title,
      description,
      price,
      domain,
      techStack: techStackArray,
      coverImage,
    });

    // Reset form after submit
    setTitle("");
    setDescription("");
    setPrice("");
    setDomain("Web Development");
    setTechStack("");
    setCoverImage("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Close Modal"
          title="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-6">Sell Your Project</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              required
              placeholder="e.g., Full-Stack E-commerce Site"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              placeholder="Describe your project, features, and what's included."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="price" className="block font-medium mb-1">
                Price (INR)
              </label>
              <input
                type="number"
                id="price"
                min="0"
                required
                placeholder="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="domain" className="block font-medium mb-1">
                Domain
              </label>
              <select
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
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
            <label htmlFor="techStack" className="block font-medium mb-1">
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              id="techStack"
              placeholder="e.g., React, Firebase, Stripe"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block font-medium mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
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

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [activeTab, setActiveTab] = useState("Projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  /* ⭐ Delete Modal State ⭐ */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

 useEffect(() => {

  fetchProjects(); // ALWAYS FETCH PROJECTS

}, []);

  const fetchCurrentUser = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/developer/current-user",
        {
          withCredentials: true,
        }
      );

      setCurrentUser(res.data);

    } catch (error) {

      setCurrentUser(null);

    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  /* ⭐ CREATE PROJECT HANDLER ⭐ */
  const handleCreate = async (newProj) => {
    try {

      // Check logged in user from backend
      const authRes = await axios.get(
        "http://localhost:5000/api/developer/current-user",
        {
          withCredentials: true,
        }
      );

      const user = authRes.data;

      // If not logged in
      if (!user) {
        alert("Signup/Signin first");
        return;
      }

      const payload = {
        title: newProj.title,
        level: newProj.level,
        domain: newProj.domain,
        description: newProj.description,

        members: `${newProj.teamSize} members`,
        applications: "0 applications",
        due: newProj.deadline,

        postedBy: user.username,
        postedByName: user.name,
        userId: user._id,
      };

      await axios.post(
        "http://localhost:5000/api/projects",
        payload,
        {
          withCredentials: true,
        }
      );

      fetchProjects();

      setOpenModal(false);

    } catch (error) {

      alert("Signup/Signin first");

      console.log(error);

    }
  };

  /* Handle Sell Project Submission */
  const handleListForSale = async (newProject) => {
    try {
      const projectObj = {
        title: newProject.title,
        level: "N/A",
        domain: newProject.domain.toLowerCase(),
        description: newProject.description,
        members: "N/A",
        applications: "N/A",
        due: "N/A",
        price: newProject.price,
        techStack: newProject.techStack,
        coverImage: newProject.coverImage,
      };

      await axios.post(
        "http://localhost:5000/api/projects",
        projectObj,
        {
          withCredentials: true,
        }
      );

      fetchProjects();
      setOpenSellModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/developer/current-user",
        {
          withCredentials: true,
        }
      );

      const user = res.data;

      if (!user) {
        alert("Signup/Signin first");
        return;
      }

      alert(`✅ ${user.name}, your application submitted successfully!`);

    } catch (error) {

      alert("Signup/Signin first");

      console.log(error);

    }
  };
  /* ---------------------- FILTER LOGIC ---------------------- */
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain =
      selectedDomain === "All Domains" ||
      p.domain.toLowerCase() === selectedDomain.toLowerCase();

    const matchesLevel =
      selectedLevel === "All Levels" ||
      p.level.toLowerCase() === selectedLevel.toLowerCase();

    return matchesSearch && matchesDomain && matchesLevel;
  });

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 bg-gradient-to-br from-indigo-50 to-white">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">ProjectArena</h2>
            <p className="text-gray-600 font-semibold">
              Discover amazing projects and build together
            </p>
          </div>

          {/* Conditional Button: Create Project or Sell Project */}
          {activeTab === "Projects" && (
            <button
              onClick={async () => {
                try {

                  const res = await fetch(
                    "http://localhost:5000/api/developer/current-user",
                    {
                      credentials: "include",
                    }
                  );

                  if (!res.ok) {
                    alert("Signup/Signin first");
                    return;
                  }

                  setOpenModal(true);

                } catch (error) {

                  alert("Signup/Signin first");

                  console.log(error);

                }
              }}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 font-semibold hover:brightness-110 transition"
            >
              <PlusIcon className="w-5 h-5" />
              Create Project
            </button>
          )}

          {activeTab === "ProjMart" && (
            <button
              onClick={async () => {
                try {

                  const res = await axios.get(
                    "http://localhost:5000/api/developer/current-user",
                    {
                      withCredentials: true,
                    }
                  );

                  if (!res.data) {
                    alert("Signup/Signin first");
                    return;
                  }

                  setOpenSellModal(true);

                } catch (error) {

                  alert("Signup/Signin first");
                  console.log(error);

                }
              }}
              className="inline-flex items-center gap-2 rounded-md bg-green-600 text-white px-5 py-2 font-semibold hover:bg-green-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Sell Project
            </button>
          )}
        </header>

        {/* TABS */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex bg-gray-100 rounded-lg overflow-hidden mb-5">
            <button
              onClick={() => setActiveTab("Projects")}
              className={`w-1/2 py-3 text-center font-semibold 
                ${activeTab === "Projects"
                  ? "text-indigo-600 bg-white border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Projects
            </button>

            <button
              onClick={() => setActiveTab("ProjMart")}
              className={`w-1/2 py-3 text-center font-semibold 
                ${activeTab === "ProjMart"
                  ? "text-indigo-600 bg-white border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              ProjMart
            </button>
          </div>

          {/* Filters and Search visible only on Projects tab */}
          {activeTab === "Projects" && (
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-grow">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                  🔍
                </span>

                <input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Domain */}
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-4 py-2 w-56 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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

              {/* Level */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 w-56 border border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          )}
        </div>

        {/* PROJECT CARDS */}
        {activeTab === "Projects" && (
          <div className="grid grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  {/* TOP */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {project.title}
                    </h3>

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
                      Open
                    </span>
                  </div>

                  {/* POSTED BY */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm">
                      {project.postedByName?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Posted by: {project.postedByName}
                      </p>


                    </div>
                  </div>

                  {/* TAGS */}
                  <div className="flex gap-2 flex-wrap mb-3">
                    <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs capitalize">
                      {project.level}
                    </span>

                    <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs">
                      {project.domain}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* DETAILS */}
                  <div className="mt-5 text-xs text-gray-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4" />
                      <span>{project.members}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <UserPlusIcon className="w-4 h-4" />
                      <span>{project.applications}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{project.due}</span>
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleApply}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-md hover:brightness-110 transition"
                  >
                    Apply
                  </button>

                  {/* VIEW */}
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setShowProjectModal(true);
                    }}
                    className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100 transition"
                  >
                    <EyeIcon className="w-5 h-5 text-gray-800" />
                  </button>

                  {/* DELETE */}
                  {currentUser?._id === project.userId && (

                    <button
                      onClick={() => {
                        setDeleteIndex(project._id);
                        setShowDeleteModal(true);
                      }}
                      className="w-10 h-10 border border-red-300 rounded-md flex items-center justify-center hover:bg-red-50 transition"
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJMART */}
        {activeTab === "ProjMart" && (
          <div className="p-6 ">
            <div className="grid grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="border rounded-lg overflow-hidden shadow">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
                  alt="EventCraft"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">EventCraft</h2>
                  <p className="text-green-600 font-bold mb-2 text-xl">₹ 15000</p>
                  <p className="text-gray-600 text-sm mb-3 leading-snug">
                    An event booking platform from where organizer can organize the event and user can book tickets...
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">MongoDB. React.js</span>
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">Node.js</span>
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">Express.js</span>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded flex gap-2 justify-center items-center font-semibold transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h1l3 8h10l3-8h1"
                      />
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border rounded-lg overflow-hidden shadow">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
                  alt="Full-Stack E-commerce Platform"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">Full-Stack E-commerce Platform</h2>
                  <p className="text-green-600 font-bold mb-2 text-xl">₹ 15000</p>
                  <p className="text-gray-600 text-sm mb-3 leading-snug">
                    A complete e-commerce solution built with the MERN stack. Includes user authentication,...
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">React</span>
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">Node.js</span>
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">Express</span>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded flex gap-2 justify-center items-center font-semibold transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h1l3 8h10l3-8h1"
                      />
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="border rounded-lg overflow-hidden shadow">
                <img
                  src="https://images.unsplash.com/photo-1546484959-f9fc6b6846cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
                  alt="Mobile Fitness Tracker App"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">Mobile Fitness Tracker App</h2>
                  <p className="text-green-600 font-bold mb-2 text-xl">₹ 12000</p>
                  <p className="text-gray-600 text-sm mb-3 leading-snug">
                    A cross-platform fitness app built with React Native. Tracks steps, calories, and workouts....
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">React Native</span>
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">Firebase</span>
                    <span className="text-xs bg-gray-200 rounded-xl px-3 py-1">Chart.js</span>
                  </div>
                  <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded flex gap-2 justify-center items-center font-semibold transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h1l3 8h10l3-8h1"
                      />
                    </svg>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">

            {/* Close Button */}
            <button
              onClick={() => setShowProjectModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {/* Project Title */}
            <h2 className="text-2xl font-bold mb-3">
              {selectedProject.title}
            </h2>

            {/* Status */}
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm">
              Open
            </span>

            {/* Tags */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm capitalize">
                {selectedProject.level}
              </span>
              <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm lowercase">
                {selectedProject.domain}
              </span>
            </div>

            {/* Description */}
            <div className="mt-5">
              <h3 className="font-semibold mb-2">Project Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4" />
                Members Required: {selectedProject.members}
              </div>

              <div className="flex items-center gap-2">
                <UserPlusIcon className="w-4 h-4" />
                Applications: {selectedProject.applications}
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                Due Date: {selectedProject.due}
              </div>
            </div>

            {/* Apply Button */}
            <button className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-md font-semibold hover:brightness-110">
              Apply for this Project
            </button>

          </div>
        </div>
      )}
      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[600px]">
            <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. This will permanently delete your
              project.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  try {

                    await axios.delete(
                      `http://localhost:5000/api/projects/${deleteIndex}`
                    );

                    fetchProjects();

                    setShowDeleteModal(false);

                  } catch (error) {

                    if (error.response?.status === 401) {
                      setUser(null);
                      return;
                    }

                    console.log(error);

                  }
                }
                }
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      <CreateProjectModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onCreate={handleCreate}
      />

      {/* SELL PROJECT MODAL */}
      <SellProjectModal
        isOpen={openSellModal}
        onClose={() => setOpenSellModal(false)}
        onSubmit={handleListForSale}
      />
    </div>
  );
}
