import React, { useState } from "react";
import CreateMentorshipModal from "../components/CreateMentorshipModal";
import BookSessionModal from "../components/BookSessionModal";
import Sidebar from "../components/Sidebar";
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
  TrashIcon,
} from "@heroicons/react/24/outline";


const initialMentors = [

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

export default function Dashboard() {
  const [search, setSearch] = React.useState("");
  const [expertise, setExpertise] = React.useState("All");
  const [type, setType] = React.useState("All");
  const [price, setPrice] = React.useState("All");
  const [activeTab, setActiveTab] = React.useState("browse");
  const [showMentorshipForm, setShowMentorshipForm] = React.useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [mySessions, setMySessions] = React.useState([]); // empty for now
  const [mentorList, setMentorList] = useState(initialMentors);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState(null);

  /* ===== ADD MENTOR FROM MODAL ===== */
  const handleAddMentor = (mentor) => {
    setMentorList(prev => [
      {
        ...mentor,
        id: Date.now(),
        rating: 0,
        sessions: 0,
      },
      ...prev
    ]);
  };
  const handleDeleteClick = (id) => {
    setMentorToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteMentor = () => {
    setMentorList(prev => prev.filter(m => m.id !== mentorToDelete));
    setShowDeleteModal(false);
    setMentorToDelete(null);
  };

  const filteredMentors = mentorList.filter(
    (mentor) => {
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
      <Sidebar />
      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-indigo-50 to-gray-100">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
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

                  <div className="mt-6 flex gap-2 items-center">

                    {/* Book */}
                    <button
                      onClick={() => {
                        setSelectedMentor(mentor);
                        setOpenBooking(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg font-semibold"
                    >
                      Book Session
                    </button>

                    {/* Trash (only if posted by current user) */}

                    <button
                      onClick={() => handleDeleteClick(mentor.id)}
                      className="px-3 py-2 border border-red-400 rounded-lg text-red-600 hover:bg-red-100 flex items-center justify-center"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>

                  </div>
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
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] rounded-2xl shadow-xl p-8">

              <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>

              <p className="text-gray-600 mb-8">
                This action cannot be undone. This will permanently delete this mentorship listing.
              </p>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDeleteMentor}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
      <CreateMentorshipModal
        open={showMentorshipForm}
        onClose={() => setShowMentorshipForm(false)}
        onAddMentor={handleAddMentor}
      />

      <BookSessionModal
        open={openBooking}
        onClose={() => {
          setOpenBooking(false);
          setSelectedMentor(null);
        }}
        mentor={selectedMentor}
      />

    </div>
  );
}
