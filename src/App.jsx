import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DeveloperSignup from "./pages/DeveloperSignup";
import Home from "./pages/Home";   // ✅ Added Home.jsx
import Project from "./pages/Project"; 
import Teams from "./pages/Teams";   
import Prolance from "./pages/Prolance"; 
import Bug_bounty from "./pages/Bug_bounty"; 
import MindMerge from "./pages/MindMerge"; 
import Connect from "./pages/Connect"; 
import StudyStack from "./pages/StudyStack"; 


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<DeveloperSignup />} />
      <Route path="/home" element={<Home />} />   {/* ✅ Added Route */}
      <Route path="/project" element={<Project />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/prolance" element={<Prolance />} />
      <Route path="/bug-bounty" element={<Bug_bounty />} />
      <Route path="/mind-merge" element={<MindMerge />} />
      <Route path="/connect" element={<Connect />} />
      <Route path="/study-stack" element={<StudyStack />} />
    </Routes>
  </Router>
);

export default App;
