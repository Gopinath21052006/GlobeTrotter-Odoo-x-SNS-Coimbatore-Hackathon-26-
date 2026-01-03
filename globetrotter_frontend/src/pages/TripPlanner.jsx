import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function TripPlanner() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState("");
  const [activity, setActivity] = useState("");
  const [cost, setCost] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadStops();
  }, [tripId]);

  const loadStops = async () => {
    const res = await api.get(`/stops/${tripId}`);
    setStops(res.data);
  };

  const addCity = async () => {
    if (!city) {
      setMessage("Please enter a city name.");
      return;
    }

    await api.post("/stops", null, {
      params: {
        trip_id: tripId,
        city,
        start_date: "2025-01-01",
        end_date: "2025-01-02"
      }
    });

    await loadStops();
    setCity("");
    setMessage("City added to your trip!");
  };

  const addActivity = async () => {
    if (!selectedStop || !activity || !cost) {
      setMessage("Please select a city and fill activity & cost.");
      return;
    }

    await api.post("/activities", null, {
      params: {
        stop_id: selectedStop,
        name: activity,
        cost,
        date: "2025-01-01"
      }
    });

    setActivity("");
    setCost("");
    setMessage("Activity added successfully!");
  };

  return (
    <>
      <Header />

      <div className="page-container">
        <h2 className="page-title">Plan Your Trip</h2>

        <div className="trip-progress">
          🧭 Trip → 📍 Cities → 🎯 Activities → 📅 Itinerary → 💰 Budget
        </div>

        {message && (
          <div style={{ marginBottom: "15px", color: "green" }}>{message}</div>
        )}

        {/* Add City */}
        <div className="app-card">
          <h3>1️⃣ Add a City</h3>
          <input
            className="input-box"
            placeholder="Enter city name (ex: Paris)"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button className="btn-primary" onClick={addCity}>
            Add City
          </button>
        </div>

        {/* Add Activity */}
        <div className="app-card">
          <h3>2️⃣ Add an Activity</h3>

          <select
            className="input-box"
            value={selectedStop}
            onChange={e => setSelectedStop(e.target.value)}
          >
            <option value="">Select a City</option>
            {stops.map(s => (
              <option key={s.id} value={s.id}>
                {s.city}
              </option>
            ))}
          </select>

          <input
            className="input-box"
            placeholder="Activity name (ex: Eiffel Tower)"
            value={activity}
            onChange={e => setActivity(e.target.value)}
          />

          <input
            className="input-box"
            placeholder="Cost (₹)"
            type="number"
            value={cost}
            onChange={e => setCost(e.target.value)}
          />

          <button className="btn-primary" onClick={addActivity}>
            Add Activity
          </button>
        </div>

        {/* City List */}
        <div className="app-card">
          <h3>📍 Your Cities</h3>
          {stops.length === 0 ? (
            <p style={{ color: "#777" }}>No cities added yet.</p>
          ) : (
            stops.map(s => (
              <div key={s.id}>• {s.city}</div>
            ))
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
          <button className="btn-primary" onClick={() => navigate(`/itinerary/${tripId}`)}>
            View Itinerary
          </button>
          <button className="btn-primary" onClick={() => navigate(`/timeline/${tripId}`)}>
            Timeline
          </button>
          <button className="btn-primary" onClick={() => navigate(`/budget/${tripId}`)}>
            Budget
          </button>
          <button className="btn-primary" onClick={() => navigate(`/share/${tripId}`)}>
            Share
          </button>
        </div>
      </div>
    </>
  );
}
