import React from "react";
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

const sidebarLinks = [
  { icon: HomeIcon, title: "Home", subtitle: "Your personalized feed" },
  { icon: FolderIcon, title: "ProjectArena", subtitle: "Discover & collaborate" },
  { icon: UserGroupIcon, title: "TeamsHive", subtitle: "Find your squad" },
  { icon: BriefcaseIcon, title: "Prolance", subtitle: "Earn while you code" },
  { icon: Cog6ToothIcon, title: "Bug Bounty", subtitle: "Fix & get rewards" },
  { icon: ChatBubbleLeftRightIcon, title: "Let's Connect", subtitle: "Find mentors" },
  { icon: BookOpenIcon, title: "MindMerge", subtitle: "Buy & sell notes" },
  { icon: ArchiveBoxIcon, title: "StudyStack", subtitle: "Courses & materials" },
  { icon: TrophyIcon, title: "Leaderboard", subtitle: "Compete & rank up" },
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

const projects = [
  {
    title: "React Developer for E-commerce Platform",
    desc: "Looking for an experienced React developer to build modern e-commerce features",
    due: "Due in 5 days",
    type: "Project",
    btnText: "Apply Now",
  },
  {
    title: "Mobile App UI Bug Fixes",
    desc: "Several UI inconsistencies in our React Native app need fixing",
    due: "Due in 2 days",
    type: "Bug",
    btnText: "Fix Bug",
  },
  {
    title: "Backend API Development",
    desc: "Node.js API development for SaaS platform",
    due: "Due in 1 week",
    type: "Freelance",
    btnText: "Submit Proposal",
  },
  {
    title: "Data Visualization with D...",
    desc: "Create interactive charts for dashboard.",
    due: "Due in 10 days",
    type: "Project",
    btnText: "Apply Now",
  },
];

const competitions = [
  {
    title: "Google Summer of Code 2024",
    org: "Google",
    deadline: "Deadline: Mar 19",
    prize: "$6000",
  },
  {
    title: "Microsoft Imagine Cup",
    org: "Microsoft",
    deadline: "Deadline: Apr 15",
    prize: "$100K",
  },
  {
    title: "Facebook Hackathon",
    org: "Meta",
    deadline: "Deadline: Mar 25",
    prize: "$50K",
  },
  {
    title: "Flipkart Grid 5.0",
    org: "Flipkart",
    deadline: "Deadline: Jul 30",
    prize: "",
  },
];

export default function Dashboard() {
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
          {sidebarLinks.map(({ icon: Icon, title, subtitle }) => (
            <a
              href="#"
              key={title}
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <Icon className="w-5 h-5" />
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-400">{subtitle}</p>
              </div>
            </a>
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
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Welcome + Stats Row */}
          <div className="flex flex-wrap items-stretch gap-6">
            <div className="flex-1 min-w-[300px] bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl p-6 text-white shadow-lg">
              <h1 className="font-bold text-2xl">Welcome, Anjali 👋</h1>
              <p className="text-sm mt-1">Code, collaborate, conquer! 🎯</p>
              <div className="mt-5 space-x-3">
                <button className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-md font-semibold">Complete Profile</button>
                <button className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-md font-semibold">Create Team Room</button>
                <button className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-md font-semibold">Explore Projects</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md bg-blue-50 p-4 rounded-md">
              {stats.map(({ icon: Icon, title, value }, index) => {
                let iconBgColor = "";
                let iconTextColor = "";
                switch (title) {
                  case "Day Streak":
                    iconBgColor = "bg-orange-200";
                    iconTextColor = "text-orange-600";
                    break;
                  case "Bugs Fixed":
                    iconBgColor = "bg-red-200";
                    iconTextColor = "text-red-600";
                    break;
                  case "Projects":
                    iconBgColor = "bg-blue-200";
                    iconTextColor = "text-blue-700";
                    break;
                  case "Rating":
                    iconBgColor = "bg-green-200";
                    iconTextColor = "text-green-600";
                    break;
                  default:
                    iconBgColor = "bg-gray-200";
                    iconTextColor = "text-gray-600";
                }
                return (
                  <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
                    <div className={`p-3 rounded-lg ${iconBgColor} ${iconTextColor} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{value}</p>
                      <p className="text-sm text-gray-600">{title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Projects Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">What You're Missing Out 🔥</h2>
              <div className="flex space-x-1">
                <button className="p-1 rounded hover:bg-gray-200">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button className="p-1 rounded hover:bg-gray-200">
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {projects.map(({ title, desc, due, type, btnText }, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow max-w-xs flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-sm">{title}</h3>
                      <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5">{type}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">{desc}</p>
                    <div className="flex items-center text-gray-400 text-xs space-x-1">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{due}</span>
                    </div>
                  </div>
                  <button className="mt-4 bg-black text-white text-sm font-semibold rounded-md py-2 hover:bg-gray-900">
                    {btnText}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Competitions Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Latest Competitions & Hackathons 🏆</h2>
              <div className="flex space-x-1">
                <button className="p-1 rounded hover:bg-gray-200">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button className="p-1 rounded hover:bg-gray-200">
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {competitions.map(({ title, org, deadline, prize }, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow max-w-xs flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm font-semibold">
                      <h3 className="text-sm font-bold">{title}</h3>
                      {prize && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 rounded-lg px-2 flex items-center space-x-1">
                          <TrophyIcon className="w-4 h-4" />
                          <span>{prize}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{org}</p>
                    <div className="flex items-center text-red-600 text-xs space-x-1">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{deadline}</span>
                    </div>
                  </div>
                  <button className="mt-4 bg-yellow-500 text-white text-sm font-semibold rounded-md py-2 hover:bg-yellow-600">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Top Companies Hiring Section */}
          <section>
            <div className="flex justify-between items-center mb-4 mt-10">
              <h2 className="font-semibold text-lg">Top Companies Hiring 💼</h2>
              <div className="flex space-x-1">
                <button className="p-1 rounded hover:bg-gray-200">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button className="p-1 rounded hover:bg-gray-200">
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {/* Company Card 1 */}
              <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🏢</div>
                  <div>
                    <h3 className="font-semibold text-sm">Frontend Developer</h3>
                    <p className="text-xs text-gray-600">Swiggy</p>
                  </div>
                </div>

                <p className="text-gray-600 mt-3 text-xs flex items-center gap-2">📍 Bangalore</p>
                <p className="text-green-600 font-medium mt-1 text-sm">₹ 8-15 LPA</p>

                <div className="flex gap-2 mt-3">
                  <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">React</span>
                  <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">JavaScript</span>
                </div>

                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg text-sm">
                  View Job
                </button>
              </div>

              {/* Company Card 2 */}
              <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🏢</div>
                  <div>
                    <h3 className="font-semibold text-sm">Full Stack Developer</h3>
                    <p className="text-xs text-gray-600">Zomato</p>
                  </div>
                </div>

                <p className="text-gray-600 mt-3 text-xs flex items-center gap-2">📍 Remote</p>
                <p className="text-green-600 font-medium mt-1 text-sm">₹ 12-20 LPA</p>

                <div className="flex gap-2 mt-3">
                  <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">Node.js</span>
                  <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">React</span>
                </div>

                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg text-sm">
                  View Job
                </button>
              </div>

              {/* Company Card 3 */}
              <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🏢</div>
                  <div>
                    <h3 className="font-semibold text-sm">Backend Developer</h3>
                    <p className="text-xs text-gray-600">Paytm</p>
                  </div>
                </div>

                <p className="text-gray-600 mt-3 text-xs flex items-center gap-2">📍 Noida</p>
                <p className="text-green-600 font-medium mt-1 text-sm">₹ 10-18 LPA</p>

                <div className="flex gap-2 mt-3">
                  <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">Java</span>
                  <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">Spring</span>
                </div>

                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg text-sm">
                  View Job
                </button>
              </div>

              {/* Company Card 4 */}
              <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🏢</div>
                  <div>
                    <h3 className="font-semibold text-sm">SDE-1</h3>
                    <p className="text-xs text-gray-600">Amazon</p>
                  </div>
                </div>

                <p className="text-gray-600 mt-3 text-xs flex items-center gap-2">📍 Hyderabad</p>
                <p className="text-green-600 font-medium mt-1 text-sm">₹ 15-25 LPA</p>

                <div className="flex gap-2 mt-3">
                  <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">DSA</span>
                  <span className="bg-gray-100 px-3 py-1 text-xs rounded-full">System Design</span>
                </div>

                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg text-sm">
                  View Job
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
