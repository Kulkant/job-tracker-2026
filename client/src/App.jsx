import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Landing from "./pages/Landing.jsx";
import SharedLayout from "./components/dashboard/SharedLayout.jsx";
import Stats from "./components/dashboard/Stats.jsx";
import AllJobs from "./components/dashboard/AllJobs.jsx";
import AddJob from "./components/dashboard/AddJob.jsx";
import Profile from "./components/dashboard/Profile.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
