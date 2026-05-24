import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  TrophyIcon,
  MagnifyingGlassIcon,
  FireIcon,
  StarIcon,
  BoltIcon,
  FunnelIcon,
} from "@heroicons/react/24/solid";

export default function Leaderboard() {

  const [users, setUsers] = useState([
  {
    _id: "1",
    name: "Anjali Arora",
    username: "anjaliaroraa100",
    domain: "Web Development",
    points: 980,
    contributions: 54,
    bugsSolved: 32,
  },

  {
    _id: "2",
    name: "Rahul Sharma",
    username: "rahulcodes",
    domain: "AI/ML",
    points: 870,
    contributions: 40,
    bugsSolved: 28,
  },

  {
    _id: "3",
    name: "Priya Singh",
    username: "priya_dev",
    domain: "Blockchain",
    points: 760,
    contributions: 37,
    bugsSolved: 20,
  },

  {
    _id: "4",
    name: "Aman Verma",
    username: "amanxdev",
    domain: "Mobile App",
    points: 650,
    contributions: 31,
    bugsSolved: 18,
  },

  {
    _id: "5",
    name: "Sneha Kapoor",
    username: "snehahacks",
    domain: "Cyber Security",
    points: 720,
    contributions: 44,
    bugsSolved: 39,
  },

  {
    _id: "6",
    name: "Kunal Mehta",
    username: "kunalbuilds",
    domain: "Game Development",
    points: 510,
    contributions: 21,
    bugsSolved: 10,
  },

  {
    _id: "7",
    name: "Rohit Jain",
    username: "rohit_ai",
    domain: "AI/ML",
    points: 840,
    contributions: 38,
    bugsSolved: 24,
  },

  {
    _id: "8",
    name: "Muskan Gupta",
    username: "muskanweb",
    domain: "Web Development",
    points: 920,
    contributions: 48,
    bugsSolved: 29,
  },

  {
    _id: "9",
    name: "Dev Malhotra",
    username: "devcodes",
    domain: "Blockchain",
    points: 600,
    contributions: 26,
    bugsSolved: 14,
  },

  {
    _id: "10",
    name: "Tanya Arora",
    username: "tanya_ui",
    domain: "Mobile App",
    points: 580,
    contributions: 24,
    bugsSolved: 11,
  },
]);
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [sortBy, setSortBy] = useState("points");
  const [timeFilter, setTimeFilter] = useState("All Time");

//   useEffect(() => {
//     fetchLeaderboard();
//   }, []);

  const fetchLeaderboard = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/leaderboard"
      );

      setUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // ================= FILTER + SORT =================
  const filteredUsers = users
    .filter((user) => {

      const matchSearch =
        user.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        user.username
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchDomain =
        domain === "All" ||
        user.domain === domain;

      return matchSearch && matchDomain;
    })

    .sort((a, b) => {

      if (sortBy === "points") {
        return b.points - a.points;
      }

      if (sortBy === "contributions") {
        return b.contributions - a.contributions;
      }

      if (sortBy === "bugs") {
        return b.bugsSolved - a.bugsSolved;
      }

      return 0;
    });

  // ================= TOP 3 =================
  const topThree = filteredUsers.slice(0, 3);

  return (
    <div className="flex h-screen bg-gradient-to-b from-yellow-50 to-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-8">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">

              <TrophyIcon className="w-10 h-10 text-yellow-500" />

              Developer Leaderboard
            </h1>

            <p className="text-gray-500 mt-2">
              Top contributors, bug hunters, mentors and developers.
            </p>
          </div>

          {/* LIVE STATS */}
          <div className="flex gap-4">

            <div className="bg-white rounded-2xl px-6 py-4 shadow">
              <p className="text-gray-500 text-sm">
                Total Developers
              </p>

              <h2 className="text-2xl font-bold">
                {users.length}
              </h2>
            </div>

            <div className="bg-white rounded-2xl px-6 py-4 shadow">
              <p className="text-gray-500 text-sm">
                Total Points
              </p>

              <h2 className="text-2xl font-bold text-purple-600">
                {users.reduce(
                  (acc, curr) => acc + curr.points,
                  0
                )}
              </h2>
            </div>

          </div>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="bg-white rounded-2xl shadow p-5 flex flex-wrap gap-4 mb-8">

          {/* SEARCH */}
          <div className="relative flex-1 min-w-[250px]">

            <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-3 text-gray-400" />

            <input
              type="text"
              placeholder="Search developers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* DOMAIN */}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="All">All Domains</option>

            <option>Web Development</option>

            <option>AI/ML</option>

            <option>Mobile App</option>

            <option>Blockchain</option>

            <option>Game Development</option>

            <option>Cyber Security</option>
          </select>

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="points">
              Sort by Points
            </option>

            <option value="contributions">
              Sort by Contributions
            </option>

            <option value="bugs">
              Sort by Bugs Solved
            </option>
          </select>

          {/* TIME */}
          <select
            value={timeFilter}
            onChange={(e) =>
              setTimeFilter(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          >
            <option>All Time</option>
            <option>This Month</option>
            <option>This Week</option>
          </select>

        </div>

        {/* ================= TOP 3 ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {topThree.map((user, index) => (

            <div
              key={user._id}
              className={`rounded-3xl p-8 shadow-lg relative overflow-hidden
              
              ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
                  : index === 1
                  ? "bg-gradient-to-r from-gray-300 to-gray-400 text-black"
                  : "bg-gradient-to-r from-orange-300 to-orange-400 text-white"
              }
              
              `}
            >

              {/* RANK */}
              <div className="absolute top-5 right-5 text-6xl opacity-20 font-black">
                #{index + 1}
              </div>

              {/* AVATAR */}
              <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur flex items-center justify-center text-3xl font-bold mb-5">
                {user.name?.charAt(0)}
              </div>

              {/* NAME */}
              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>

              <p className="opacity-90 mb-5">
                @{user.username}
              </p>

              {/* STATS */}
              <div className="space-y-2">

                <div className="flex justify-between">
                  <span>Points</span>

                  <span className="font-bold">
                    {user.points}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Contributions</span>

                  <span className="font-bold">
                    {user.contributions}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Bugs Solved</span>

                  <span className="font-bold">
                    {user.bugsSolved}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-7 bg-gray-100 px-6 py-4 font-semibold text-gray-600">

            <div>Rank</div>

            <div className="col-span-2">
              Developer
            </div>

            <div>Domain</div>

            <div>Points</div>

            <div>Contributions</div>

            <div>Bugs Solved</div>

          </div>

          {/* ROWS */}
          {filteredUsers.map((user, index) => (

            <div
              key={user._id}
              className="grid grid-cols-7 px-6 py-5 border-b hover:bg-yellow-50 transition items-center"
            >

              {/* RANK */}
              <div className="font-bold text-lg">

                #{index + 1}
              </div>

              {/* USER */}
              <div className="col-span-2 flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
                  {user.name?.charAt(0)}
                </div>

                <div>

                  <h3 className="font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    @{user.username}
                  </p>

                </div>
              </div>

              {/* DOMAIN */}
              <div>

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {user.domain}
                </span>

              </div>

              {/* POINTS */}
              <div className="font-bold text-yellow-600 flex items-center gap-2">

                <BoltIcon className="w-5 h-5" />

                {user.points}
              </div>

              {/* CONTRIBUTIONS */}
              <div className="font-semibold text-indigo-600">

                {user.contributions}
              </div>

              {/* BUGS */}
              <div className="font-semibold text-red-500 flex items-center gap-2">

                <FireIcon className="w-5 h-5" />

                {user.bugsSolved}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}