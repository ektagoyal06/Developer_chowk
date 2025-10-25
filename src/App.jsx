import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import routing components
import LandingPage from "./pages/LandingPage";
import DeveloperSignup from "./pages/DeveloperSignup";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<DeveloperSignup />} />
    </Routes>
  </Router>
);

export default App;
