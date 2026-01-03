import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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
import "./styles/base.css";
import "./styles/components.css";
import "./styles/auth.css";
import "./styles/dashboard.css";
import TripCreate from "./pages/TripCreate";
import Itinerary from "./pages/Itinerary";
import Trips from "./pages/Trips";
import Search from "./pages/Search";
import Community from "./pages/Community";
import Calendar from "./pages/Calendar";




export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:token" element={<ResetPassword />} />

      <Route path="/dashboard" element={<Dashboard user={user} />} />
      <Route path="/trip/:tripId" element={<TripPlanner />} />
      <Route path="/timeline/:tripId" element={<Timeline />} />
      <Route path="/budget/:tripId" element={<Budget />} />
      <Route path="/share/:tripId" element={<Share />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile user={user} />} />
      <Route path="/community" element={<Community user={user} />} />
      <Route path="/calendar" element={<Calendar user={user} />} />
      <Route path="/admin" element={<Admin user={user} />} />

      <Route path="/trip/new" element={<TripCreate user={user} />} />
      <Route path="/trips" element={<Trips user={user} />} />
       <Route path="/itinerary/:tripId" element={<Itinerary />} /> 
      <Route path="/trip/:tripId/itinerary" element={<Itinerary user={user} />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
