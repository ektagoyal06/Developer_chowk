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

export default function ProlanceDashboard() {

  const [contracts, setContracts] = useState([]);
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

  /* ================= FETCH USER ================= */

  useEffect(() => {

    fetchUser();

    fetchJobs();

    // LOAD CONTRACTS
    const savedContracts =
      JSON.parse(localStorage.getItem("dcContracts")) || [];

    setContracts(savedContracts);

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

  /* ================= FETCH JOBS ================= */

  const fetchJobs = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/jobs",
        {
          withCredentials: true,
        }
      );

      setJobs(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  /* ================= POST PROJECT ================= */

  const handleAddProject = async (project) => {

    try {

      const formattedProject = {

        ...project,

        poster:
          user?.fullName ||
          user?.name ||
          user?.username,

        posterUsername: user?.username,

        price:
          project.budgetType === "Hourly"
            ? `$${project.budget} / hr`
            : `$${project.budget}`,

        level: project.difficulty,

        tags: project.skills || [],
      };

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

  /* ================= DELETE JOB ================= */

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

  /* ================= APPLY PROPOSAL ================= */

  const handleApplyProposal = (proposalData) => {

    const newContract = {

      id: Date.now(),

      title: proposalData.job.title,

      description: proposalData.job.description,

      price: proposalData.job.price,

      poster: proposalData.job.poster,

      status: "Pending",

      techStack: proposalData.job.tags || [],

      proposal: proposalData.proposal,

      bid: proposalData.bid,

      delivery: proposalData.delivery,
    };

    const updatedContracts = [...contracts, newContract];

    setContracts(updatedContracts);

    localStorage.setItem(
      "dcContracts",
      JSON.stringify(updatedContracts)
    );

    alert("✅ Your proposal sent successfully!");
  };

  /* ================= FILTER JOBS ================= */

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
      (
        filterBudget === "$500 - $1000" &&
        numericPrice > 500 &&
        numericPrice <= 1000
      ) ||
      (
        filterBudget === "$1000+" &&
        numericPrice > 1000
      );

    return (
      matchesSearch &&
      matchesLevel &&
      matchesType &&
      matchesBudget
    );
  });

  return (

    <div className="flex h-screen bg-blue-50 text-gray-900">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold mb-1">
              Prolance
            </h1>

            <p className="text-gray-500">
              Find your next gig or hire top talent.
            </p>
          </div>

          <button
            onClick={() => {

              if (!user) {

                alert("⚠️ Please Signup/Login first");

                return;
              }

              setOpenPostModal(true);
            }}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
          >
            + Post a Project
          </button>
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-lg shadow">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/4"
          />

          <select
            value={filterDomain}
            onChange={(e) => setFilterDomain(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/5"
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

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/6"
          >
            <option>All Types</option>
            <option>Fixed Price</option>
            <option>Hourly Rate</option>
          </select>

          <select
            value={filterBudget}
            onChange={(e) => setFilterBudget(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/6"
          >
            <option>All Budgets</option>
            <option>$0 - $500</option>
            <option>$500 - $1000</option>
            <option>$1000+</option>
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 border rounded-lg w-1/6"
          >
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* TABS */}
        <div className="mb-6 bg-white rounded-lg shadow flex">

          <button
            onClick={() => setActiveTab("find")}
            className={`flex-1 py-3 font-semibold ${activeTab === "find"
              ? "border-b-2 border-black"
              : "text-gray-500"
              }`}
          >
            Find Work
          </button>

          <button
            onClick={() => setActiveTab("contracts")}
            className={`flex-1 py-3 font-semibold relative ${activeTab === "contracts"
              ? "border-b-2 border-black"
              : "text-gray-500"
              }`}
          >
            My Contracts

            {contracts.length > 0 && (
              <span className="absolute top-2 right-[35%] bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {contracts.length}
              </span>
            )}
          </button>
        </div>

        {/* FIND WORK */}
        {activeTab === "find" && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredJobs.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No jobs match your filters.
              </div>
            )}

            {filteredJobs.map((job, idx) => (

              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
              >

                <div>

                  <div className="flex justify-between items-center mb-2">

                    <h2 className="text-lg font-bold">
                      {job.title}
                    </h2>

                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-600">
                      {job.level}
                    </span>
                  </div>

                  <p className="text-green-600 font-semibold mb-2">
                    {job.price}
                  </p>

                  <p className="text-gray-600 text-sm mb-4">
                    {job.description}
                  </p>

                  <p className="text-sm text-gray-500 mt-3 mb-4">
                    👤 Posted by{" "}
                    <span className="font-semibold text-indigo-600">
                      {job.poster}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {(job.tags || []).map((tag) => (

                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-200 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="mt-4 flex items-center gap-2">

                  {/* APPLY */}
                  <button
                    onClick={() => {

                      if (!user) {

                        alert("⚠️ Please Signup/Login first to apply");

                        return;
                      }

                      setSelectedJob(job);
                    }}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold"
                  >
                    Apply Now →
                  </button>

                  {/* VIEW */}
                  <button
                    onClick={() => setViewJob(job)}
                    className="p-2 border rounded-lg hover:bg-gray-100"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>

                  {/* DELETE */}
                  {(
                    user?.fullName ||
                    user?.name ||
                    user?.username
                  ) === job.poster && (

                      <button
                        onClick={() => handleDeleteClick(idx)}
                        className="p-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MY CONTRACTS */}
        {activeTab === "contracts" && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {contracts.length === 0 ? (

              <div className="col-span-full bg-white p-6 rounded-lg shadow text-center text-gray-500">
                No contracts yet.
              </div>

            ) : (

              contracts.map((contract) => (

                <div
                  key={contract.id}
                  className="bg-white p-6 rounded-xl shadow-md border"
                >

                  <div className="flex justify-between items-center mb-3">

                    <h2 className="text-lg font-bold">
                      {contract.title}
                    </h2>

                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      {contract.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">
                    {contract.description}
                  </p>

                  <p className="text-green-600 font-semibold mb-2">
                    {contract.price}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    👤 Posted by{" "}
                    <span className="font-semibold text-indigo-600">
                      {contract.poster}
                    </span>
                  </p>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-2 mb-4">

                    {contract.techStack.map((tech, index) => (

                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="border-t pt-3 text-sm text-gray-600">

                    <p>
                      💰 Bid: ${contract.bid}
                    </p>

                    <p>
                      ⏳ Delivery: {contract.delivery}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* APPLY MODAL */}
      {/* APPLY MODAL */}
      {selectedJob && (

        <ApplyProposalModal
          job={selectedJob}

          onClose={() => setSelectedJob(null)}

          onSubmitProposal={(proposalData) => {

            const newContract = {

              id: Date.now(),

              title:
                proposalData.job.title,

              description:
                proposalData.job.description,

              price:
                proposalData.job.price,

              poster:
                proposalData.job.poster,

              status: "Pending",

              techStack:
                proposalData.job.tags || [],

              proposal:
                proposalData.proposal,

              bid:
                proposalData.bid,

              delivery:
                proposalData.delivery,

              fileName:
                proposalData.fileName || null,
            };

            // UPDATE CONTRACTS
            const updatedContracts = [
              ...contracts,
              newContract,
            ];

            // UPDATE STATE
            setContracts(updatedContracts);

            // SAVE TO LOCAL STORAGE
            localStorage.setItem(
              "dcContracts",
              JSON.stringify(updatedContracts)
            );

            // SUCCESS ALERT
            alert("✅ Your proposal sent successfully!");

            // CLOSE MODAL
            setSelectedJob(null);
          }}
        />
      )}

     

      {/* POST PROJECT MODAL */}
      {openPostModal && (

        <PostProjectModal
          closeModal={() => setOpenPostModal(false)}
          onAddProject={handleAddProject}
        />
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (

        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">

          <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Are you sure?
            </h2>

            <p className="text-gray-700 mb-8 font-semibold">
              This action cannot be undone.
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

      {/* VIEW JOB MODAL */}
      {viewJob && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 relative">

            <button
              onClick={() => setViewJob(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {viewJob.title}
            </h2>

            <div className="flex gap-3 items-center mb-4">

              <span className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm">
                {viewJob.level}
              </span>

              <span className="text-green-600 font-semibold text-lg">
                {viewJob.price}
              </span>
            </div>

            <div className="mb-4">

              <p className="text-sm text-gray-500">
                👤 Posted by{" "}
                <span className="font-semibold text-indigo-600">
                  {viewJob.poster}
                </span>
              </p>
            </div>

            <div className="mb-6">

              <h3 className="font-semibold mb-2">
                Required Skills
              </h3>

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

            <button
              onClick={() => {

                setViewJob(null);

                setSelectedJob(viewJob);
              }}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
            >
              Apply for this task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}