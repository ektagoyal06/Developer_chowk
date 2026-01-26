import React, { useState } from "react";
import CreateMentorshipModal from "../components/CreateMentorshipModal";
import BookSessionModal from "../components/BookSessionModal";
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
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  BoltIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";   // <-- ADDED

const mentors = [
  {
    id: 1,
    name: "Anjali Arora",
    rating: 0,
    sessions: 0,
    title: "Interview preparation",
    description: "Effective tips for cracking technical & HR interviews.",
    duration: 60,
    price: 500,
    type: "One-on-One",
    expertise: "Interview",
    tags: ["communication", "body language"],
  },
  {
    id: 2,
    name: "Priya Sharma",
    rating: 4.8,
    sessions: 45,
    title: "React & Redux Mastery",
    description: "Advanced React patterns and performance optimization.",
    duration: 60,
    price: 800,
    type: "One-on-One",
    expertise: "Technical",
    tags: ["React", "Redux", "JavaScript"],
  },
  {
    id: 3,
    name: "Rahul Verma",
    rating: 4.9,
    sessions: 67,
    title: "Full Stack Career Path",
    description: "Personalized guidance to become a full stack developer.",
    duration: 45,
    price: 500,
    type: "One-on-One",
    expertise: "Career",
    tags: ["Career", "Full Stack", "Node.js"],
  },
];


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

export default function Dashboard() {
  const [search, setSearch] = React.useState("");
  const [expertise, setExpertise] = React.useState("All");
  const [type, setType] = React.useState("All");
  const [price, setPrice] = React.useState("All");
  const [activeTab, setActiveTab] = React.useState("browse");
  const [showMentorshipForm, setShowMentorshipForm] = React.useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [mySessions, setMySessions] = React.useState([]); // empty for now
  


  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(search.toLowerCase()) ||
      mentor.title.toLowerCase().includes(search.toLowerCase());

    const matchesExpertise =
      expertise === "All" || mentor.expertise === expertise;

    const matchesType =
      type === "All" || mentor.type === type;

    const matchesPrice =
      price === "All" ||
      (price === "Free" && mentor.price === 0) ||
      (price === "Paid" && mentor.price > 0);

    return (
      matchesSearch &&
      matchesExpertise &&
      matchesType &&
      matchesPrice
    );
  });


  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
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
      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-indigo-50 to-gray-100">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 mt-5">
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
              Let's Connect
            </h1>
            <p className="text-gray-500">
              Find mentors for career guidance and skill development
            </p>
          </div>

          <button
            onClick={() => setShowMentorshipForm(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700"
          >
            + Offer Mentorship
          </button>

        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 mb-6">
          <input
            placeholder="Search mentors..."
            className="border rounded-lg px-4 py-2 w-[400px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2 w-1/5"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
          >
            <option value="All">All Expertise</option>
            <option value="Technical">Technical domain</option>
            <option value="Career">Career guidance</option>
            <option value="Interview">Interview Prep</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2 w-1/5"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="One-on-One">One-on-One</option>
            <option value="Group">Group</option>
            <option value="Workshop">Workshop</option>
          </select>

          <select
            className="border rounded-lg px-3 py-2 w-1/5"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>


        {/* Toggle */}
        <div className="bg-white rounded-lg shadow flex mb-6">
          <button
            onClick={() => setActiveTab("browse")}
            className={`flex-1 py-3 font-semibold ${activeTab === "browse"
              ? "border-b-2 border-black"
              : "text-gray-500"
              }`}
          >
            Browse Mentors
          </button>

          <button
            onClick={() => setActiveTab("sessions")}
            className={`flex-1 py-3 font-semibold ${activeTab === "sessions"
              ? "border-b-2 border-black"
              : "text-gray-500"
              }`}
          >
            My Sessions
          </button>
        </div>


        {/* Mentor Cards */}
        {/* Content based on active tab */}
        {activeTab === "browse" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredMentors.length === 0 ? (
              <p className="text-gray-500 col-span-3 text-center">
                No mentors found 😕
              </p>
            ) : (
              filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">
                        {mentor.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="font-semibold">{mentor.name}</h2>
                        <p className="text-sm text-gray-500">
                          ⭐ {mentor.rating} ({mentor.sessions} sessions)
                        </p>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-2">{mentor.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {mentor.description}
                    </p>

                    <p className="text-sm mb-1">⏱ {mentor.duration} minutes</p>
                    <p className="text-green-600 font-semibold mb-2">
                      ₹ {mentor.price}
                    </p>
                    <p className="text-sm mb-3">👤 {mentor.type}</p>

                    <div className="flex flex-wrap gap-2">
                      {mentor.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setOpenBooking(true)}
                    className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold"
                  >
                    Book Session
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            {mySessions.length === 0 ? (
              <p className="text-gray-500 text-lg">
                My Sessions dashboard coming soon!
              </p>
            ) : (
              <div>
                {/* future sessions UI */}
              </div>
            )}
          </div>
        )}


      </div>
      <CreateMentorshipModal
        open={showMentorshipForm}
        onClose={() => setShowMentorshipForm(false)}
      />

      <BookSessionModal
        open={openBooking}
        onClose={() => setOpenBooking(false)}
      />

    </div>
  );
}
