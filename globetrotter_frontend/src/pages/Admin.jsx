import { useEffect, useState } from "react";
import { api } from "../api";
import Header from "../components/Header";

export default function Admin({ user }) {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/admin/users").then(r => setUsers(r.data));
    api.get("/admin/popular-cities").then(r => setCities(r.data));
    api.get("/admin/popular-activities").then(r => setActivities(r.data));
    api.get("/admin/stats").then(r => setStats(r.data));
  }, []);

  return (
    <>
      <Header user={user} />

      <div className="admin-page">

        {/* TOP BAR */}
        <div className="admin-tabs">
          <button onClick={() => setTab("users")}>Manage Users</button>
          <button onClick={() => setTab("cities")}>Popular Cities</button>
          <button onClick={() => setTab("activities")}>Popular Activities</button>
          <button onClick={() => setTab("trends")}>User Trends</button>
        </div>

        <div className="admin-layout">

          {/* LEFT LIST */}
          <div className="admin-left">
            {tab === "users" && users.map(u => (
              <div key={u.id} className="admin-item">
                {u.name}<span>{u.email}</span>
              </div>
            ))}

            {tab === "cities" && cities.map(c => (
              <div key={c.city} className="admin-item">
                {c.city} <span>{c.count} trips</span>
              </div>
            ))}

            {tab === "activities" && activities.map(a => (
              <div key={a.name} className="admin-item">
                {a.name} <span>{a.count}</span>
              </div>
            ))}
          </div>

          {/* CENTER CHARTS */}
          <div className="admin-center">
            <div className="chart pie">Users vs Trips</div>
            <div className="chart line">Activity Growth</div>
            <div className="chart bar">Top Cities</div>
          </div>

          {/* RIGHT INFO PANEL */}
          <div className="admin-right">
            <h3>Platform Stats</h3>
            <p>Total Users: {stats.users}</p>
            <p>Total Trips: {stats.trips}</p>
            <p>Total Activities: {stats.activities}</p>

            <p className="note">
              This panel helps admins understand user behavior, most visited cities and
              platform growth.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
