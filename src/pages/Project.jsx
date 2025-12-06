import React, { useState } from "react";
import CreateProjectModal from "../components/CreateProjectModal";
import { Link } from "react-router-dom";

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
  EyeIcon,
  TrashIcon,
  UsersIcon,
  UserPlusIcon,
  CalendarIcon,
  PlusIcon,
  BoltIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

/* Sidebar Links */
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


/* Default Projects */
const initialProjects = [
  {
    title: "Real-time Chat Application",
    level: "intermediate",
    domain: "web development",
    description:
      "Create a modern chat application with features like group chats, file sharing, video calls, and message encryption.",
    members: "1/3 members",
    applications: "0 applications",
    due: "Due by Mar 30, 2025",
  },
  {
    title: "Campus Event Management...",
    level: "intermediate",
    domain: "web development",
    description:
      "Create a platform for managing college events, registrations, notifications, and feedback.",
    members: "1/3 members",
    applications: "0 applications",
    due: "Due by Feb 28, 2025",
  },
  {
    title: "Blockchain-Based Voting...",
    level: "advanced",
    domain: "blockchain",
    description:
      "Decentralized voting system using blockchain ensuring secure and tamper-proof voting.",
    members: "5/10 members",
    applications: "2 applications",
    due: "Due by Apr 10, 2025",
  },
  {
    title: "AI-Powered Study Assistant",
    level: "advanced",
    domain: "ai/ml",
    description:
      "Smart assistant helping students with quizzes, summaries, and study schedules.",
    members: "3/6 members",
    applications: "1 application",
    due: "Due by May 15, 2025",
  },
];

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
  const [projects, setProjects] = useState(initialProjects);
  const [openModal, setOpenModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [activeTab, setActiveTab] = useState("Projects");

  /* ⭐ Delete Modal State ⭐ */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  /* ⭐ CREATE PROJECT HANDLER ⭐ */
  const handleCreate = (newProj) => {
    setProjects([...projects, newProj]);
  };

  /* Handle Sell Project Submission */
  const handleListForSale = (newProject) => {
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
    setProjects([...projects, projectObj]);
    setOpenSellModal(false);
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
                    to={path}                // <-- ADDED NAVIGATION
                    key={title}
                    className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">{title}</p>
                      <p className="text-xs text-gray-400">{subtitle}</p>
                    </div>
                  </Link>
                ))}
              </nav>
      
              <div className="m-4 p-4 bg-white rounded-lg shadow text-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl">
                    <UserCircleIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="font-bold">Anjali Arora</h2>
                    <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">Developer</span>
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10 bg-gradient-to-br from-indigo-50 to-white">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">ProjectArena</h2>
            <p className="text-gray-600">
              Discover amazing projects and build together
            </p>
          </div>

          {/* Conditional Button: Create Project or Sell Project */}
          {activeTab === "Projects" && (
            <button
              onClick={() => setOpenModal(true)}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 font-semibold hover:brightness-110 transition"
            >
              <PlusIcon className="w-5 h-5" />
              Create Project
            </button>
          )}

          {activeTab === "ProjMart" && (
            <button
              onClick={() => setOpenSellModal(true)}
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
            {filteredProjects.map(
              (
                { title, level, domain, description, members, applications, due },
                idx
              ) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-lg">{title}</h3>
                      <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-600 text-xs">
                        open
                      </span>
                    </div>

                    <div className="flex gap-2 flex-wrap mb-2">
                      <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs capitalize">
                        {level}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs lowercase">
                        {domain}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {description}
                    </p>

                    <div className="mt-4 text-xs text-gray-500 space-y-1">
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-4 h-4" /> {members}
                      </div>
                      <div className="flex items-center gap-1">
                        <UserPlusIcon className="w-4 h-4" /> {applications}
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" /> {due}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-md hover:brightness-110">
                      Apply
                    </button>

                    <button className="w-10 h-10 border rounded-md flex items-center justify-center hover:bg-gray-100">
                      <EyeIcon className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => {
                        setDeleteIndex(idx);
                        setShowDeleteModal(true);
                      }}
                      className="w-10 h-10 border border-red-400 rounded-md flex items-center justify-center hover:bg-red-100"
                    >
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* PROJMART */}
        {activeTab === "ProjMart" && (
          <div className="p-6 bg-white rounded-lg shadow">
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
                onClick={() => {
                  setProjects(projects.filter((_, i) => i !== deleteIndex));
                  setShowDeleteModal(false);
                }}
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
