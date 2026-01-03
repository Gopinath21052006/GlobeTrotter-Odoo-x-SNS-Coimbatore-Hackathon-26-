import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import Timeline from "./pages/Timeline";
import Signup from "./pages/Signup";


export default function App() {
  const [user, setUser] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [page, setPage] = useState("login");

  if (page === "login") return <Login setUser={setUser} setPage={setPage} />;
  if (page === "dashboard") return <Dashboard user={user} setTripId={setTripId} setPage={setPage} />;
  if (page === "planner") return <TripPlanner tripId={tripId} setPage={setPage} />;
  if (page === "timeline") return <Timeline tripId={tripId} setPage={setPage} />;
  if (page === "signup") return <Signup setPage={setPage} />;

}
