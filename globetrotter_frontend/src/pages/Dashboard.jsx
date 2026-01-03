import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { cities } from "../data/cities";
import Header from "../components/Header";

export default function Dashboard({ user }) {
  const [trips, setTrips] = useState([]);
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

  return (
    <>
      <Header user={user} />

      <div className="dashboard-container">

        <div className="dashboard-header">
          <h2>Welcome, {user?.name}</h2>
        </div>

        <div className="banner">
          Your next adventure starts here ✈️
        </div>

        <div className="search-bar">
          <input placeholder="Search your trips..." />
          <button className="filter-btn">Group</button>
          <button className="filter-btn">Filter</button>
          <button className="filter-btn">Sort</button>
        </div>

        <div className="section-title">Top Regional Selections</div>
        <div className="region-grid">
          {cities.slice(0, 5).map(c => (
            <div key={c.name} className="region-card">
              <img src={`/cities/${c.image}`} alt={c.name} />
            </div>
          ))}
        </div>

        <div className="section-title">Previous Trips</div>
        <div className="trip-grid">
          {trips.map(t => (
            <div key={t.id} className="trip-card">
              <img src={getImage(t.city)} alt={t.name} />
              <h3>{t.name}</h3>
              <button className="btn-dark" onClick={() => navigate(`/trip/${t.id}`)}>
                View Trip
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/trips")}>
  My Trips
</button>


        <button className="fab" onClick={() => navigate("/trip/new")}>
          +
        </button>

      </div>
    </>
  );
}
