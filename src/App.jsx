import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import DeveloperSignup from "./pages/DeveloperSignup";
import Home from "./pages/Home";   // ✅ Added Home.jsx
import Project from "./pages/Project"; 
import Teams from "./pages/Teams";   

const App = () => (
  <Router>
    <Routes>
      <Route path="/landingpage" element={<LandingPage />} />
      <Route path="/signup" element={<DeveloperSignup />} />
      <Route path="/home" element={<Home />} />   {/* ✅ Added Route */}
      <Route path="/" element={<Project />} />
      <Route path="/teams" element={<Teams />} />
    </Routes>
  </Router>
);

export default App;
