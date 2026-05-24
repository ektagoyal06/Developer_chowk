import React, { useEffect, useState } from "react";
import PostProjectModal from "../components/PostProjectModal";
import ApplyProposalModal from "../components/ApplyProposalModal";
import Sidebar from "../components/Sidebar";
import axios from "axios";
axios.defaults.withCredentials = true;
import {
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
// import { Link } from "react-router-dom";


export default function ProlanceDashboard() {
  const [jobs, setJobs] = useState([]);
  const [viewJob, setViewJob] = useState(null);
  const [search, setSearch] = useState("");
  const [filterDomain, setFilterDomain] = useState("All Domains");
  const [filterType, setFilterType] = useState("All Types");
  const [filterBudget, setFilterBudget] = useState("All Budgets");
  const [filterLevel, setFilterLevel] = useState("All Levels");
  const [openPostModal, setOpenPostModal] = useState(false);
  const [activeTab, setActiveTab] = useState("find");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {

    fetchUser();

    fetchJobs();

  }, []);
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/developer/current-user",
        {
          withCredentials: true,
        }
      );

      setUser(res.data);

    } catch (error) {

      if (error.response?.status === 401) {
        setUser(null);
        return;
      }

      console.log(error);
    }
  };

  const fetchJobs = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/jobs",
        {
          withCredentials: true,
        }
      );

      console.log("Jobs:", res.data);

      setJobs(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // ================= HANDLE ADD PROJECT =================
  const handleAddProject = async (project) => {

    try {

      console.log("Current User:", user);

      const formattedProject = {
        ...project,

        // ✅ FIXED POSTER NAME
        poster:
          user?.fullName ||
          user?.name ||
          user?.username,

        posterUsername: user?.username,

        price:
          project.budgetType === "Hourly"
            ? `$${project.budget} / hr`
            : `$${project.budget}`,

        level: project.difficulty.toLowerCase(),

        tags: project.skills || [],
      };

      console.log("Sending Project:", formattedProject);

      await axios.post(
        "http://localhost:5000/api/jobs",
        formattedProject,
        {
          withCredentials: true,
        }
      );

      fetchJobs();

    } catch (error) {

      console.log(error);

    }
  };
  const handleDeleteClick = (index) => {
    setJobToDelete(index);
    setShowDeleteModal(true);
  };

  const confirmDeleteJob = async () => {

    try {

      await axios.delete(
        `http://localhost:5000/api/jobs/${jobs[jobToDelete]._id}`
      );

      fetchJobs();

      setShowDeleteModal(false);

      setJobToDelete(null);

    } catch (error) {
      console.log(error);
    }
  };
  // ✅ FILTER LOGIC (ADDED)
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());

    const matchesLevel =
      filterLevel === "All Levels" ||
      job.level.toLowerCase() === filterLevel.toLowerCase();

    const isHourly = job.price?.includes("/ hr");
    const matchesType =
      filterType === "All Types" ||
      (filterType === "Hourly Rate" && isHourly) ||
      (filterType === "Fixed Price" && !isHourly);

    let numericPrice = parseInt(
      (job.price || "0").replace(/[^0-9]/g, "")
    );
    const matchesBudget =
      filterBudget === "All Budgets" ||
      (filterBudget === "$0 - $500" && numericPrice <= 500) ||
      (filterBudget === "$500 - $1000" && numericPrice > 500 && numericPrice <= 1000) ||
      (filterBudget === "$1000+" && numericPrice > 1000);

    return matchesSearch && matchesLevel && matchesType && matchesBudget;
  });

  return (
    <div className="flex h-screen bg-blue-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Prolance</h1>
            <p className="text-gray-500">Find your next gig or hire top talent.</p>
          </div>
          <button
            onClick={() => {

              // USER NOT LOGGED IN
              if (!user) {

                alert("⚠️ Please Signup/Login first");

                return;
              }

              // USER LOGGED IN
              setOpenPostModal(true);
            }}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
          >
            + Post a Project
          </button>
        </div>

        {/* Filters (UNCHANGED UI) */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-lg shadow">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/4"
          />

          <select value={filterDomain} onChange={(e) => setFilterDomain(e.target.value)} className="px-3 py-2 border rounded-lg w-1/5">
            <option>All Domains</option>
            <option>Web Development</option>
            <option>Full stack development</option>
            <option>Mobile App</option>
            <option>Blockchain</option>
            <option>AI/ML</option>
            <option>Game Development</option>
            <option>Data Scientist</option>
          </select>

          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 border rounded-lg w-1/6">
            <option>All Types</option>
            <option>Fixed Price</option>
            <option>Hourly Rate</option>
          </select>

          <select value={filterBudget} onChange={(e) => setFilterBudget(e.target.value)} className="px-3 py-2 border rounded-lg w-1/6">
            <option>All Budgets</option>
            <option>$0 - $500</option>
            <option>$500 - $1000</option>
            <option>$1000+</option>
          </select>

          <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="px-3 py-2 border rounded-lg w-1/6">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Toggle */}
        <div className="mb-6 bg-white rounded-lg shadow flex">
          <button onClick={() => setActiveTab("find")} className={`flex-1 py-3 font-semibold ${activeTab === "find" ? "border-b-2 border-black" : "text-gray-500"}`}>
            Find Work
          </button>
          <button onClick={() => setActiveTab("contracts")} className={`flex-1 py-3 font-semibold ${activeTab === "contracts" ? "border-b-2 border-black" : "text-gray-500"}`}>
            My Contracts
          </button>
        </div>

        {activeTab === "find" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No jobs match your filters.
              </div>
            )}

            {filteredJobs.map((job, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">{job.title}</h2>
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-600">
                      {job.level}
                    </span>
                  </div>
                  <p className="text-green-600 font-semibold mb-2">{job.price}</p>
                  <div className="mb-4">

                    <p className="text-gray-600 text-sm">
                      {job.description}
                    </p>

                    <p className="text-sm text-gray-500 mt-3">
                      👤 Posted by{" "}
                      <span className="font-semibold text-indigo-600">
                        {job.poster}
                      </span>
                    </p>

                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(job.tags || []).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2">

                    {/* Apply Button (Main Action) */}
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
                    >
                      Apply Now →
                    </button>

                    {/* View Button */}
                    <button
                      onClick={() => setViewJob(job)}
                      className="p-2 border text-gray rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>

                    {/* Delete Button */}
                    {(
                      user?.fullName ||
                      user?.name ||
                      user?.username
                    ) === job.poster && (

                        <button
                          onClick={() => handleDeleteClick(idx)}
                          className="p-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 flex items-center justify-center"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>

                      )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "contracts" && (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            No contracts yet.
          </div>
        )}
      </div>
      {selectedJob && (
        <ApplyProposalModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {openPostModal && (
        <PostProjectModal
          closeModal={() => setOpenPostModal(false)}
          onAddProject={handleAddProject}   // ✅ IMPORTANT
        />
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>

            <p className="text-gray-700 mb-8 font-semibold">
              This action cannot be undone. This will permanently delete this job.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteJob}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
      {viewJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 relative">

            {/* Close */}
            <button
              onClick={() => setViewJob(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-2">
              {viewJob.title}
            </h2>

            {/* Level + Price */}
            <div className="flex gap-3 items-center mb-4">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                {viewJob.level}
              </span>
              <span className="text-green-600 font-semibold text-lg">
                {viewJob.price}
              </span>
            </div>

            {/* Description */}
            {/* Description */}
            <div className="mb-6">

              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  👤 Posted by{" "}
                  <span className="font-semibold text-indigo-600">
                    {viewJob.poster}
                  </span>
                </p>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {viewJob.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-200 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setViewJob(null);
                    setSelectedJob(viewJob);
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
                >
                  Apply for this task
                </button>

              </div>

            </div>
          </div>
        </div>
      )};
    </div>
  )
}
