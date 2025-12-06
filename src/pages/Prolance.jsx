import React, { useState } from "react";

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

// Sample projects/jobs
const jobs = [
  {
    title: "Mobile App UI/UX Design",
    level: "beginner",
    price: "$400",
    description:
      "Need a talented designer to create mockups and prototypes for a fitness tracking mobile app. Should include user onboarding,...",
    tags: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
  },
  {
    title: "WordPress Plugin Development",
    level: "intermediate",
    price: "$600",
    description:
      "Develop a custom WordPress plugin for appointment booking with calendar integration, email notifications, and payment...",
    tags: ["WordPress", "PHP", "MySQL", "JavaScript"],
  },
  {
    title: "Data Analysis and Visualization",
    level: "intermediate",
    price: "$45 / hr",
    description:
      "Analyze sales data and create interactive dashboards using Python and visualization libraries. Need insights on customer behavior,...",
    tags: ["Python", "Pandas", "Matplotlib", "Data Analysis"],
  },
];

export default function ProlanceDashboard() {
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("All Domains");
  const [filterType, setFilterType] = useState("All Types");
  const [filterBudget, setFilterBudget] = useState("All Budgets");
  const [filterLevel, setFilterLevel] = useState("All Levels");

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

      {/* Main Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mt-5">Prolance</h1>
            <p className="text-gray-500">Find your next gig or hire top talent.</p>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            + Post a Project
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-lg shadow">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/4 focus:outline-none focus:ring-1 focus:ring-blue-500 "
          />
          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/5 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>All Domains</option>
            <option>Web Development</option>
            <option>Mobile App</option>
            <option>Data Science</option>
            <option>AI/ML</option>
            <option>Blockchain</option>
            <option>Game development</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/6 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>All Types</option>
            <option>Fixed Price</option>
            <option>Hourly Rate</option>
          </select>
          <select
            value={filterBudget}
            onChange={(e) => setFilterBudget(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/6 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>All Budgets</option>
            <option>$0 - $500</option>
            <option>$500 - $1000</option>
            <option>$1000+</option>
          </select>
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/6 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-bold">{job.title}</h2>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${job.level === "beginner"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                      }`}
                  >
                    {job.level}
                  </span>
                </div>
                <p className="text-green-600 font-semibold mb-2">{job.price}</p>
                <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition">
                Apply Now &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
