import React, { useState } from "react";
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

const App = () => {

  // GLOBAL USER STATE
  const [dev, setDev] = useState(null);

  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        {/* PASS setDev */}
        <Route
          path="/signup"
          element={
            <DeveloperSignup setDev={setDev} />
          }
        />

        {/* PASS dev */}
        <Route
          path="/home"
          element={<Home dev={dev} />}
        />

        <Route path="/project" element={<Project />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/prolance" element={<Prolance />} />
        <Route path="/bug-bounty" element={<Bug_bounty />} />
        <Route path="/mind-merge" element={<MindMerge />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/study-stack" element={<StudyStack />} />

        {/* PASS dev */}
        <Route
          path="/developer-dashboard"
          element={<DeveloperDashboard dev={dev} />}
        />

      </Routes>
    </Router>
  );
};

export default App;