import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { cities } from "../data/cities";
import Header from "../components/Header";

export default function Dashboard({ user }) {
  const [trips, setTrips] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    api.get(`/trips/${user.user_id}`).then(res => setTrips(res.data));
  }, [user]);

  const getImage = (cityName) => {
    const city = cities.find(c =>
      cityName?.toLowerCase().includes(c.name.toLowerCase())
    );
    return city ? `/cities/${city.image}` : `/cities/paris.jpg`;
  };

  const filteredTrips = trips.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.city.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Header user={user} />

      <div className="dashboard-container">

        {/* HERO */}
        <div className="banner">
          Welcome back, {user?.name} 👋
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "25px" }}>
          <button className="btn-primary" onClick={() => navigate("/calendar")}>
            📅 Calendar
          </button>
          <button className="btn-primary" onClick={() => navigate("/trip/new")}>
            ✈️ New Trip
          </button>
          <button className="btn-dark" onClick={() => navigate("/trips")}>
            My Trips
          </button>
        </div>

        {/* SEARCH */}
        <div className="search-bar">
          <input
            placeholder="Search your trips..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* REGIONS */}
        <h3 className="section-title">🌍 Popular Destinations</h3>
        <div className="region-grid">
          {cities.slice(0, 5).map(c => (
            <div
              key={c.name}
              className="region-card"
              onClick={() => navigate("/search")}
            >
              <img src={`/cities/${c.image}`} alt={c.name} />
              <p>{c.name}</p>
            </div>
          ))}
        </div>

        {/* TRIPS */}
        <h3 className="section-title">🧳 Your Trips</h3>

        {filteredTrips.length === 0 ? (
          <div className="app-card" style={{ textAlign: "center" }}>
            <p>No trips found.</p>
            <button className="btn-primary" onClick={() => navigate("/trip/new")}>
              Create your first trip
            </button>
          </div>
        ) : (
          <div className="trip-grid">
            {filteredTrips.map(t => (
              <div key={t.id} className="trip-card">
                <img src={getImage(t.city)} alt={t.name} />
                <h3>{t.name}</h3>
                <button
                  className="btn-dark"
                  onClick={() => navigate(`/trip/${t.id}`)}
                >
                  Open Trip
                </button>
                
              </div>
            ))}
          </div>
        )}

        {/* FAB */}
        <button className="fab" onClick={() => navigate("/trip/new")}>
          +
        </button>

      </div>
    </>
  );
}

