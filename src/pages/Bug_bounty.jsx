import React, { useState } from "react";
import PostBugModal from "../components/PostBugModal";
import BugDetailsModal from "../components/BugDetailsModal";
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
  ChartBarIcon,
  BoltIcon,
  StarIcon,
  BugAntIcon,
  MagnifyingGlassIcon,
  PlusIcon,
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

// Bug cards data
const initialBugs = [

  {
    title: "Flutter App Crash on Android",
    level: "high",
    reward: 30,
    desc: "App crashes when trying to access device camera on certain Android devices.",
    tags: ["Flutter", "Dart", "Android"],
    postedBy: "anjaliaroraa100", // ✅ ADDED
  },
  {
    title: "React Component Memory Leak",
    level: "high",
    reward: 25,
    desc: "Memory leak in a React component when using useEffect with websocket connections.",
    tags: ["React", "JavaScript", "WebSocket"],
    postedBy: "rahul_dev",
  },
  {
    title: "Database Query Performance Issue",
    level: "medium",
    reward: 20,
    desc: "Slow query performance when fetching user data with related posts.",
    tags: ["MongoDB", "Mongoose", "Node.js"],
    postedBy: "db_master",
  },
];
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");

  // ✅ FILTER STATES
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [reward, setReward] = useState("All");
  const [selectedBug, setSelectedBug] = useState(null);
  const [openBugModal, setOpenBugModal] = useState(false);
  const [priceRange, setPriceRange] = useState("All");
  const [bugs, setBugs] = useState(initialBugs);


  const handleAddBug = (bugData) => {
    setBugs(prev => [
      {
        ...bugData,
        id: Date.now(),
        postedBy: "anjaliaroraa100"
      },
      ...prev
    ]);
  };

  // ✅ FILTER LOGIC
  const filteredBugs = bugs.filter((bug) => {
    const matchesSearch =
      bug.title.toLowerCase().includes(search.toLowerCase()) ||
      bug.desc.toLowerCase().includes(search.toLowerCase());

    const matchesDomain =
      domain === "All" || bug.tags.includes(domain);

    const matchesReward =
      reward === "All" || reward === "points";

    const matchesPrice =
      priceRange === "All" || bug.reward >= Number(priceRange);

    return matchesSearch && matchesDomain && matchesReward && matchesPrice;
  });


  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* ================= SIDEBAR ================= */}
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
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-orange-50 to-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 mt-5">
              <BugAntIcon className="w-6 h-6" /> Bug Bounty
            </h1>
            <p className="text-gray-500">
              Get rewarded for your problem-solving skills.
            </p>
          </div>
          <button
            onClick={() => setOpenBugModal(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-600"
          >
            <PlusIcon className="w-5 h-5" />
            Post a Bug
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 mb-6">
          {/* Search */}
          <div className="relative w-1/3">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              placeholder="Search bugs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Domain */}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/5"
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

          {/* Reward Type */}
          <select
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/5"
          >
            <option value="All">All Rewards</option>
            <option value="points">Points only</option>
            <option value="paid">Paid</option>
          </select>

          {/* Price */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border rounded-lg px-3 py-2 w-1/5"
          >
            <option value="All">All Prices</option>
            <option value="20">0–20 pts</option>
            <option value="25">21–25 pts</option>
            <option value="30">26+ pts</option>
          </select>
        </div>

        {/* Toggle */}
        <div className="bg-white rounded-lg shadow flex mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 py-3 font-semibold ${activeTab === "all" ? "border-b-2 border-black" : "text-gray-500"
              }`}
          >
            All Bugs
          </button>
          <button
            onClick={() => setActiveTab("my")}
            className={`flex-1 py-3 font-semibold ${activeTab === "my" ? "border-b-2 border-black" : "text-gray-500"
              }`}
          >
            My Bugs
          </button>
        </div>

        {/* Bug Cards */}
        {activeTab === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filteredBugs.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No bugs match your filters.
              </div>
            )}

            {filteredBugs.map((bug, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-lg">{bug.title}</h2>

                    <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-orange-100 text-orange-600 leading-none">
                      {bug.level}
                    </span>
                  </div>


                  <p className="text-green-600 font-semibold mb-3">
                    ⚡ {bug.reward} pts
                  </p>

                  <p className="text-gray-600 text-sm mb-4">{bug.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {bug.tags.map((tag) => (
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
                  onClick={() => setSelectedBug(bug)}
                  className="mt-6 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg font-semibold"
                >
                  Apply
                </button>

              </div>
            ))}
          </div>
        )}

        {activeTab === "my" && (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No bugs posted yet.
          </div>
        )}
        {openBugModal && (
          <PostBugModal
  closeModal={() => setOpenBugModal(false)}
  onPostBug={handleAddBug}
/>


        )}
        {selectedBug && (
          <BugDetailsModal
            bug={selectedBug}
            onClose={() => setSelectedBug(null)}
          />
        )}

      </div>
    </div>
  );
}
