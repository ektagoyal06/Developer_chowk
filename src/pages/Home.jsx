import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  TrophyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";


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


export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("dcUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name);
    }
  }, []);

  const stats = [
    {
      icon: CalendarDaysIcon,
      title: "Day Streak",
      value: "12",
    },
    {
      icon: TrophyIcon,
      title: "Bugs Fixed",
      value: "34",
    },
    {
      icon: CalendarDaysIcon,
      title: "Projects",
      value: "8",
    },
    {
      icon: TrophyIcon,
      title: "Rating",
      value: "4.8",
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-purple-50">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Welcome + Stats Row */}
          <div className="flex flex-wrap items-stretch gap-6">
            <div className="flex-1 min-w-[300px] bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl p-6 text-white shadow-lg">
              <h1 className="font-bold text-4xl">
                Welcome, {userName || "Developer"} 👋
              </h1>
              <p className="text-lg mt-1">Code, collaborate, conquer! 🎯</p>
              <div className="mt-5 space-x-3">
                <button className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-md font-semibold">Complete Profile</button>
                <button className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-md font-semibold">Create Team Room</button>
                <button
                  onClick={() => navigate("/project")}
                  className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-md font-semibold"
                >
                  Explore Projects
                </button>
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

              {/* Company cards (unchanged) */}

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
