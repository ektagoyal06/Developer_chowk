import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DeveloperSignup from "./pages/DeveloperSignup";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Teams from "./pages/Teams";
import Prolance from "./pages/Prolance";
import Bug_bounty from "./pages/Bug_bounty";
import MindMerge from "./pages/MindMerge";
import Connect from "./pages/Connect";
import StudyStack from "./pages/StudyStack";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import Leaderboard from "./pages/Leaderboard"; // ✅ ADDED

const App = () => {

  // ================= GLOBAL USER =================
  const [dev, setDev] = useState(null);

  const [loading, setLoading] = useState(true);

  // ================= FETCH LOGGED IN USER =================
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/developer/current-user",
        {
          withCredentials: true,
        }
      );

      setDev(res.data);

    } catch (error) {

      // USER NOT LOGGED IN
      setDev(null);

    } finally {

      setLoading(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <Router>

      <Routes>

        {/* LANDING */}
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            <DeveloperSignup setDev={setDev} />
          }
        />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <Home dev={dev} />
          }
        />

        {/* PROJECT */}
        <Route
          path="/project"
          element={
            <Project dev={dev} />
          }
        />

        {/* TEAMS */}
        <Route
          path="/teams"
          element={
            <Teams dev={dev} />
          }
        />

        {/* PROLANCE */}
        <Route
          path="/prolance"
          element={
            <Prolance dev={dev} />
          }
        />

        {/* BUG BOUNTY */}
        <Route
          path="/bug-bounty"
          element={
            <Bug_bounty dev={dev} />
          }
        />

        {/* MIND MERGE */}
        <Route
          path="/mind-merge"
          element={
            <MindMerge dev={dev} />
          }
        />

        {/* CONNECT */}
        <Route
          path="/connect"
          element={
            <Connect dev={dev} />
          }
        />

        {/* STUDY STACK */}
        <Route
          path="/study-stack"
          element={
            <StudyStack dev={dev} />
          }
        />

        {/* LEADERBOARD ✅ */}
        <Route
          path="/leaderboard"
          element={
            <Leaderboard dev={dev} />
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/developer-dashboard"
          element={
            <DeveloperDashboard dev={dev} />
          }
        />

      </Routes>

    </Router>
  );
};

export default App;