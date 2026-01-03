import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Trips({ user }) {
  const [data, setData] = useState({ ongoing: [], upcoming: [], completed: [] });
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    api.get(`/trip-list/${user.user_id}`).then(res => setData(res.data));
  }, [user]);

  const filterTrips = (trips) =>
    trips.filter(t =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.city.toLowerCase().includes(query.toLowerCase())
    );

  const Card = ({ trip }) => (
    <div className="trip-list-card">
      <h4>{trip.name}</h4>
      <p>{trip.city}</p>
      <p>{trip.start_date} → {trip.end_date}</p>
      <button className="btn-dark" onClick={() => navigate(`/trip/${trip.id}`)}>
        Open Trip
      </button>
    </div>
  );

  const Section = ({ title, trips }) => (
    <>
      <h3>{title}</h3>
      {trips.length === 0 ? (
        <p style={{ color: "#777" }}>No trips here.</p>
      ) : (
        filterTrips(trips).map(t => <Card key={t.id} trip={t} />)
      )}
    </>
  );

  return (
    <>
      <Header user={user} />

      <div className="page-container">

        <div className="search-bar">
          <input
            placeholder="Search trips by name or city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <Section title="🟢 Ongoing Trips" trips={data.ongoing} />
        <Section title="🟡 Upcoming Trips" trips={data.upcoming} />
        <Section title="🔵 Completed Trips" trips={data.completed} />

      </div>
    </>
  );
}
