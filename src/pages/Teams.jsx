// Dashboard.jsx
import React, { useState } from "react";
import CreateTeamRoomModal from "../components/CreateTeamRoomModal";
import LookingForMembersModal from "../components/LookingForMembersModal";
import { EyeIcon, UserPlusIcon } from "lucide-react";
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
  BoltIcon,
  ChartBarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Sidebar links
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
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Browse Projects");

  const [projects, setProjects] = useState(defaultProjects);

  const [isOpen, setIsOpen] = useState(false);
  const [isLookingModalOpen, setIsLookingModalOpen] = useState(false);

  // ADD NEW PROJECT FROM MODAL
  const handleAddProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  return (
    <div className="flex h-screen bg-blue-50 text-gray-900">

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
              to={path}
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

      {/* Main Area */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          {/* Left Side Title */}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 mt-5">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md relative">

              {proj.recruiting && (
                <span className="absolute top-4 right-4 bg-gray-200 px-2 py-1 rounded-full text-xs">
                  recruiting
                </span>
              )}

              <h2 className="text-lg font-bold mb-2">{proj.title}</h2>
              <p className="text-gray-600 mb-4">{proj.description}</p>

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
                  <span key={tag} className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <button className="px-3 py-2 border rounded-lg hover:bg-gray-100 transition flex items-center gap-1">
                  <EyeIcon size={16} /> Explore
                </button>
                <button className="px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-1">
                  <UserPlusIcon size={16} /> Join Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALS */}
      <CreateTeamRoomModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <LookingForMembersModal
        isOpen={isLookingModalOpen}
        onClose={() => setIsLookingModalOpen(false)}
        onPost={handleAddProject}
      />
    </div>
  );
}
