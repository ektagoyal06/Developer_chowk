// src/components/CreateProjectModal.jsx

import React, { useState } from "react";

export default function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [domain, setDomain] = useState("Web Development");
  const [level, setLevel] = useState("Beginner");
  const [teamSize, setTeamSize] = useState("");
  const [deadline, setDeadline] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (
      !title ||
      !desc ||
      !domain ||
      !level ||
      !teamSize ||
      !deadline
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      // CHECK LOGIN
      const res = await fetch(
        "http://localhost:5000/api/developer/current-user",
        {
          method: "GET",
          credentials: "include",
        }
      );

      // USER NOT LOGGED IN
      if (!res.ok) {
        alert("Signup/Signin first");
        return;
      }

      // USER DATA
      const user = await res.json();

      // PROJECT DATA
      const projectData = {
        title,
        description: desc,
        domain,
        level,

        members: `0/${teamSize} members`,
        applications: "0 applications",
        due: deadline,

        postedBy: user.username,
        postedByName: user.name,
        postedById: user._id,
      };

      // CREATE PROJECT
      await onCreate(projectData);

      // RESET FORM
      setTitle("");
      setDesc("");
      setDomain("Web Development");
      setLevel("Beginner");
      setTeamSize("");
      setDeadline("");

      // CLOSE MODAL
      onClose();

      alert("Project Created Successfully 🚀");

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <div className="bg-white w-[750px] rounded-xl shadow-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            Create New Project
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* TITLE */}
          <div>
            <label className="font-medium">
              Project Title
            </label>

            <input
              type="text"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-medium">
              Description
            </label>

            <textarea
              rows="4"
              placeholder="Describe your project..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-4">

            {/* DOMAIN */}
            <div>
              <label className="font-medium">
                Domain
              </label>

              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg"
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

            {/* LEVEL */}
            <div>
              <label className="font-medium">
                Difficulty Level
              </label>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* TEAM SIZE */}
            <div>
              <label className="font-medium">
                Team Size
              </label>

              <input
                type="number"
                placeholder="2"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* DEADLINE */}
            <div>
              <label className="font-medium">
                Deadline
              </label>

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full mt-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Create Project
          </button>

        </form>
      </div>
    </div>
  );
}