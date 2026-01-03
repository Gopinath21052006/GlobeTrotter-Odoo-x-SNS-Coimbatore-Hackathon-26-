import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import Timeline from "./pages/Timeline";
import Budget from "./pages/Budget";
import Share from "./pages/Share";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TripCreate from "./pages/TripCreate";
import Itinerary from "./pages/Itinerary";
import Trips from "./pages/Trips";
import Search from "./pages/Search";
import Community from "./pages/Community";
import Calendar from "./pages/Calendar";

import "./styles/base.css";
import "./styles/components.css";
import "./styles/auth.css";
import "./styles/dashboard.css";

export default function App() {
  const [user, setUser] = useState(null);

  // Restore user after refresh
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    return children;
  };

  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />

      {/* Protected (login required) */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard user={user} /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile user={user} /></PrivateRoute>} />
      <Route path="/calendar" element={<PrivateRoute><Calendar user={user} /></PrivateRoute>} />
      <Route path="/community" element={<PrivateRoute><Community user={user} /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
      <Route path="/trips" element={<PrivateRoute><Trips user={user} /></PrivateRoute>} />
      <Route path="/trip/new" element={<PrivateRoute><TripCreate user={user} /></PrivateRoute>} />
      <Route path="/trip/:tripId" element={<PrivateRoute><TripPlanner /></PrivateRoute>} />
      <Route path="/itinerary/:tripId" element={<PrivateRoute><Itinerary /></PrivateRoute>} />
      <Route path="/timeline/:tripId" element={<PrivateRoute><Timeline /></PrivateRoute>} />
      <Route path="/budget/:tripId" element={<PrivateRoute><Budget /></PrivateRoute>} />
      <Route path="/share/:tripId" element={<PrivateRoute><Share /></PrivateRoute>} />

      {/* Admin (hackathon mode: login only) */}
      <Route path="/admin" element={<Admin user={user} />} />



    </Routes>
  );
}
