import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import Header from "../components/Header";
import { cities } from "../data/cities";

export default function TripCreate({ user }) {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    name: "",
    city: "",
    start_date: "",
    end_date: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const selectCity = (c) => {
    setTrip({
      ...trip,
      city: c.name,
      name: `${c.name} Trip`
    });
  };

  const createTrip = async () => {
    setError("");

    if (!trip.name || !trip.city || !trip.start_date || !trip.end_date) {
      setError("Please fill all trip details.");
      return;
    }

    if (trip.end_date < trip.start_date) {
      setError("End date must be after start date.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/trips", null, {
        params: {
          user_id: user.user_id,
          name: trip.name,
          city: trip.city,
          start_date: trip.start_date,
          end_date: trip.end_date
        }
      });

      navigate("/dashboard");
    } catch {
      setError("Failed to create trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header user={user} />

      <div className="page-container">

        <h2 className="page-title">Plan a New Trip</h2>

        <p style={{ color: "#666", marginBottom: "15px" }}>
          Start by selecting where and when you want to travel.
        </p>

        {error && (
          <div style={{ color: "red", marginBottom: "15px" }}>
            {error}
          </div>
        )}

        <div className="trip-form">

          <input
            className="input-box"
            name="name"
            placeholder="Trip Name (e.g. Paris Getaway)"
            value={trip.name}
            onChange={handle}
          />

          <input
            className="input-box"
            name="city"
            placeholder="City (or click one below)"
            value={trip.city}
            onChange={handle}
          />

          <div className="date-row">
            <input
              type="date"
              name="start_date"
              className="input-box"
              onChange={handle}
            />
            <input
              type="date"
              name="end_date"
              className="input-box"
              onChange={handle}
            />
          </div>

          <button
            className="btn-primary"
            onClick={createTrip}
            disabled={loading}
          >
            {loading ? "Creating trip..." : "Create My Trip"}
          </button>
        </div>

        <h3 className="section-title">
          Popular Destinations
        </h3>

        <div className="region-grid">
          {cities.map(c => (
            <div
              key={c.name}
              className="region-card"
              onClick={() => selectCity(c)}
            >
              <img src={`/cities/${c.image}`} alt={c.name} />
              <p>{c.name}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
