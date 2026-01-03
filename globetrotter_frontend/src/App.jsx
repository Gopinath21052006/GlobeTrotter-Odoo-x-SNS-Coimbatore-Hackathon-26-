import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import Timeline from "./pages/Timeline";
import Signup from "./pages/Signup";
import Budget from "./pages/Budget";
import Share from "./pages/Share";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";



export default function App() {
  const [user, setUser] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [page, setPage] = useState("login");

  if (page === "login") return <Login setUser={setUser} setPage={setPage} />;
  if (page === "dashboard") return <Dashboard user={user} setTripId={setTripId} setPage={setPage} />;
  if (page === "planner") return <TripPlanner tripId={tripId} setPage={setPage} />;
  if (page === "timeline") return <Timeline tripId={tripId} setPage={setPage} />;
  if (page === "signup") return <Signup setPage={setPage} />;
  if (page === "budget") return <Budget tripId={tripId} setPage={setPage} />;
  if (page === "share") return <Share tripId={tripId} setPage={setPage} />;
  if (page === "admin") return <Admin setPage={setPage} />;
  if (page === "profile") return <Profile user={user} setPage={setPage} />;
  if (page === "forgot") return <ForgotPassword setPage={setPage} />;
  if (page === "reset") return <ResetPassword token={resetToken} setPage={setPage} />;

}
