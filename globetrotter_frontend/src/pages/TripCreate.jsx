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
    try {
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
      alert("Failed to create trip");
    }
  };

  return (
    <>
      <Header user={user} />

      <div className="page-container">

        <h2 className="page-title">Plan a New Trip</h2>

        <div className="trip-form">

          <input
            className="input-box"
            name="name"
            placeholder="Trip Name"
            value={trip.name}
            onChange={handle}
          />

          <input
            className="input-box"
            name="city"
            placeholder="Select a Place"
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

          <button className="btn-primary" onClick={createTrip}>
            Create Trip
          </button>
        </div>

        <h3 className="section-title">
          Suggestions for Places to Visit
        </h3>

        <div className="region-grid">
          {cities.map(c => (
            <div
              key={c.name}
              className="region-card"
              onClick={() => selectCity(c)}
            >
              <img src={`/cities/${c.image}`} />
              <p>{c.name}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
