import React, { useState } from "react";
import { Link } from "react-router-dom";

const DeveloperDashboard = ({ dev = {} }) => {

  // ===== ACTIVE TAB STATE =====
  const [activeTab, setActiveTab] = useState("project");

  // ===== HEATMAP DATA =====
  const months = [
    { name: "Jan", days: 31 },
    { name: "Feb", days: 28 },
    { name: "Mar", days: 31 },
    { name: "Apr", days: 30 },
    { name: "May", days: 31 },
    { name: "Jun", days: 30 },
    { name: "Jul", days: 31 },
    { name: "Aug", days: 31 },
    { name: "Sep", days: 30 },
    { name: "Oct", days: 31 },
    { name: "Nov", days: 30 },
    { name: "Dec", days: 31 },
  ];

  // ===== RECENT ACTIVITIES =====
  const activities = {
    project: [
      {
        name: "Contributed to Developer Chowk",
        time: "2 hours ago",
      },
      {
        name: "Built MERN Stack Portfolio",
        time: "Yesterday",
      },
      {
        name: "Added Authentication System",
        time: "3 days ago",
      },
    ],

    bug: [
      {
        name: "Fixed Navbar Responsiveness Bug",
        time: "1 day ago",
      },
      {
        name: "Resolved JWT Login Issue",
        time: "2 days ago",
      },
    ],

    freelance: [
      {
        name: "Completed Salon Website",
        time: "4 days ago",
      },
      {
        name: "Delivered Client Dashboard UI",
        time: "1 week ago",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">

      {/* ===== TOP RIGHT HOME ICON ===== */}
      <Link
        to="/home"
        className="absolute top-5 right-5 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-lg hover:scale-105 transition duration-200"
      >
        {dev?.name?.charAt(0)?.toUpperCase() || "D"}
      </Link>

      {/* ===== HEADER ===== */}
      <div className="max-w-[1400px] mx-auto px-8 pt-10">

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-indigo-100">
          <div className="flex gap-8 items-start flex-col lg:flex-row">

            {/* ===== PROFILE SECTION ===== */}
            <div className="w-full lg:w-[320px] bg-white rounded-3xl shadow-lg border border-indigo-100 p-6 flex flex-col gap-6">

              {/* PROFILE TOP */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                  {dev?.name?.charAt(0)?.toUpperCase() || "D"}
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {dev?.name || "Developer"}
                  </h2>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition">
                Edit Profile
              </button>

              {/* ===== BASIC INFO ===== */}
              <div className="space-y-3 text-sm text-gray-700 font-semibold">

                <p>📍 {dev?.location || "Location not added"}</p>

                <p>🎓 {dev?.college || "College not added"}</p>

                {dev?.github && (
                  <p>
                    🐙
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-indigo-600 hover:underline break-all"
                    >
                      GitHub
                    </a>
                  </p>
                )}

                {dev?.linkedin && (
                  <p>
                    💼
                    <a
                      href={dev.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-indigo-600 hover:underline break-all"
                    >
                      LinkedIn
                    </a>
                  </p>
                )}

                {/* ===== RESUME ===== */}
                {dev?.resumeLink && (
                  <p>
                    📄
                    <a
                      href={dev.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-indigo-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </p>
                )}

              </div>

              <hr />

              {/* ===== TECH STACK ===== */}
              <div>
                <h2 className="text-xl font-bold text-indigo-900 mb-4">
                  💻 Tech Stack
                </h2>

                <div className="flex flex-wrap gap-3">
                  {dev?.stacks?.length > 0 ? (
                    dev.stacks.map((stack, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium shadow"
                      >
                        {stack}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No Tech Stack Added
                    </p>
                  )}
                </div>
              </div>

              <hr />

              {/* ===== SKILLS ===== */}
              <div>
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">
                  🧠 Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {dev?.skills?.length > 0 ? (
                    dev.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No Skills Added
                    </p>
                  )}
                </div>
              </div>

              <hr />

              {/* ===== GOALS ===== */}
              <div>
                <h2 className="text-xl font-bold text-indigo-900 mb-3">
                  🎯 Goals on DC
                </h2>

                <div className="flex flex-wrap gap-2">
                  {dev?.aims?.length > 0 ? (
                    dev.aims.map((aim, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {aim}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No Goals Added
                    </p>
                  )}
                </div>
              </div>

              <hr />

              {/* ===== CERTIFICATIONS ===== */}
              <div>
                <h2 className="text-xl font-bold text-indigo-900 mt-2 mb-5">
                  📜 Certifications
                </h2>

                <div className="space-y-2">
                  {dev?.certs?.length > 0 ? (
                    dev.certs.map((cert, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg px-5 py-2 text-sm"
                      >
                        <span className="font-medium text-yellow-900">
                          {cert.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No Certifications Added
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* ===== RIGHT SECTION ===== */}
            <div className="flex-1 flex flex-col gap-6 w-full">

              {/* ===== STATS ===== */}
              <div className="bg-white rounded-3xl shadow-md p-6 border border-indigo-100">

                <h2 className="text-xl font-bold text-indigo-900 mb-6">
                  📊 Developer Stats
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                  <div className="bg-indigo-100 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-indigo-700">
                      {dev?.projects?.length || 0}
                    </p>

                    <p className="text-sm text-blue-900 mt-1 font-bold">
                      Projects
                    </p>
                  </div>

                  <div className="bg-red-100 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">
                      12
                    </p>

                    <p className="text-sm text-red-900 font-bold mt-1">
                      Bugs Solved
                    </p>
                  </div>

                  <div className="bg-purple-100 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-purple-700">
                      5
                    </p>

                    <p className="text-sm text-purple-900 font-bold mt-1">
                      Freelance Projects
                    </p>
                  </div>

                  <div className="bg-green-100 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      88
                    </p>

                    <p className="text-sm text-green-800 font-bold mt-1">
                      Reputation
                    </p>
                  </div>

                </div>
              </div>

              {/* ===== PROJECTS ===== */}
              <div className="bg-white rounded-3xl shadow-md py-4 px-5 border border-indigo-100">

                <h2 className="text-xl font-bold text-indigo-900 mb-6">
                  📂 Projects
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  {dev?.projects?.length > 0 ? (
                    dev.projects.map((p, i) => (
                      <div
                        key={i}
                        className="rounded-2xl p-4 border border-indigo-100 bg-indigo-50 hover:shadow-lg transition flex flex-col justify-between min-h-[180px]"
                      >

                        <div>
                          <h3 className="font-semibold text-indigo-800 mb-2">
                            {p.title}
                          </h3>

                          <p className="text-sm text-indigo-700 mb-3">
                            {p.description}
                          </p>
                        </div>

                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 text-sm font-medium hover:underline"
                          >
                            🔗 View Project
                          </a>
                        )}

                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      No Projects Added
                    </p>
                  )}

                </div>
              </div>

              {/* ===== HEATMAP ===== */}
              <div className="bg-white rounded-3xl shadow-md py-5 px-6 border border-indigo-100">

                <h2 className="text-xl font-bold text-indigo-900 mb-6">
                  🔥 Activity Heatmap
                </h2>

                <div className="flex flex-wrap gap-6">

                  {months.map((month, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center"
                    >

                      <div className="grid grid-cols-7 gap-[4px] mb-3">

                        {Array.from({
                          length: month.days,
                        }).map((_, j) => (

                          <div
                            key={j}
                            className="w-[12px] h-[12px] bg-gray-500 rounded-sm hover:scale-110 transition"
                          />

                        ))}

                      </div>

                      <span className="text-sm font-semibold text-gray-700">
                        {month.name}
                      </span>

                    </div>
                  ))}

                </div>

              </div>

              {/* ===== RECENT ACTIVITY ===== */}
              <div className="bg-white rounded-3xl shadow-md py-5 px-6 border border-indigo-100">

                <h2 className="text-xl font-bold text-indigo-900 mb-5">
                  ⚡ Recent Activity
                </h2>

                <div className="flex flex-wrap gap-4 mb-6">

                  <button
                    onClick={() => setActiveTab("project")}
                    className={`px-8 py-2 rounded-xl text-sm font-medium transition
                    ${
                      activeTab === "project"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                    }`}
                  >
                    Project Contribution
                  </button>

                  <button
                    onClick={() => setActiveTab("bug")}
                    className={`px-8 py-2 rounded-xl text-sm font-medium transition
                    ${
                      activeTab === "bug"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                    }`}
                  >
                    Bug Solved
                  </button>

                  <button
                    onClick={() => setActiveTab("freelance")}
                    className={`px-8 py-2 rounded-xl text-sm font-medium transition
                    ${
                      activeTab === "freelance"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                    }`}
                  >
                    Freelance Project
                  </button>

                </div>

                <div className="flex flex-col gap-3">

                  {activities?.[activeTab]?.length > 0 ? (

                    activities[activeTab].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center bg-gray-50 hover:bg-indigo-50 transition px-4 py-3 rounded-xl border border-gray-100"
                      >

                        <span className="text-gray-800 font-medium">
                          {item.name}
                        </span>

                        <span className="text-gray-500 text-sm">
                          {item.time}
                        </span>

                      </div>
                    ))

                  ) : (

                    <div className="text-center text-gray-500 py-8 font-medium">
                      No Recent Activity
                    </div>

                  )}

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;