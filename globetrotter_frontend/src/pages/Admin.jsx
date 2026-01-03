import { useEffect, useState } from "react";
import { api } from "../api";
import Header from "../components/Header";
import "../styles/admin.css";

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
          <button className={tab==="users"?"active":""} onClick={() => setTab("users")}>Manage Users</button>
          {/* <button className={tab==="cities"?"active":""} onClick={() => setTab("cities")}>Popular Cities</button>
          <button className={tab==="activities"?"active":""} onClick={() => setTab("activities")}>Popular Activities</button> */}
          <button className={tab==="trends"?"active":""} onClick={() => setTab("trends")}>User Trends</button>
        </div>

        <div className="admin-layout">

          {/* LEFT PANEL */}
          <div className="admin-left">
            {tab === "users" && users.map(u => (
              <div key={u.id} className="admin-item">
                {u.name}
                <span>{u.email}</span>
              </div>
            ))}

            {tab === "cities" && cities.map(c => (
              <div key={c.city} className="admin-item">
                {c.city}
                <span>{c.count} trips</span>
              </div>
            ))}

            {tab === "activities" && activities.map(a => (
              <div key={a.name} className="admin-item">
                {a.name}
                <span>{a.count}</span>
              </div>
            ))}

            {tab === "trends" && (
              <>
                <div className="admin-item">Active Users <span>{stats.users}</span></div>
                <div className="admin-item">Total Trips <span>{stats.trips}</span></div>
                <div className="admin-item">Activities Logged <span>{stats.activities}</span></div>
              </>
            )}
          </div>

          {/* CENTER PANEL */}
          <div className="admin-center">

            {tab === "users" && (
              <>
                <div className="chart pie">Total Users: {stats.users}</div>
                <div className="chart bar">Total Trips: {stats.trips}</div>
              </>
            )}

            {tab === "cities" && (
              <>
                <div className="chart bar">Top City: {cities[0]?.city}</div>
                <div className="chart pie">Cities Tracked: {cities.length}</div>
              </>
            )}

            {tab === "activities" && (
              <>
                <div className="chart pie">Top Activity: {activities[0]?.name}</div>
                <div className="chart bar">Total Activities: {activities.length}</div>
              </>
            )}

            {tab === "trends" && (
              <>
                <div className="chart pie">Users: {stats.users}</div>
                <div className="chart line">Trips: {stats.trips}</div>
                <div className="chart bar">Activities: {stats.activities}</div>
              </>
            )}

          </div>

          {/* RIGHT PANEL */}
          <div className="admin-right">
            <h3>Platform Stats</h3>
            <p>Total Users: {stats.users}</p>
            <p>Total Trips: {stats.trips}</p>
            <p>Total Activities: {stats.activities}</p>

            <p className="note">
              This dashboard shows real-time platform analytics, most popular destinations
              and user engagement across GlobeTrotter.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
