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

  useEffect(() => {
    loadStops();
  }, [tripId]);

  const loadStops = async () => {
    const res = await api.get(`/stops/${tripId}`);
    setStops(res.data);
  };

  const addCity = async () => {
    if (!city) return alert("Enter a city");

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
  };

  const addActivity = async () => {
    if (!selectedStop || !activity || !cost)
      return alert("Fill all activity fields");

    await api.post("/activities", null, {
      params: {
        stop_id: selectedStop,
        name: activity,
        cost,
        date: "2025-01-01"
      }
    });

    alert("Activity added");
    setActivity("");
    setCost("");
  };

  return (
    <>
      <Header />

      <div className="page-container">
        <h2 className="page-title">Trip Planner</h2>

        {/* Add City */}
        <div className="app-card">
          <h3>Add City</h3>
          <input
            className="input-box"
            placeholder="Enter city name"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button className="btn-primary" onClick={addCity}>
            Add City
          </button>
        </div>

        <br />

        {/* Add Activity */}
        <div className="app-card">
          <h3>Add Activity</h3>

          <select
            className="input-box"
            value={selectedStop}
            onChange={e => setSelectedStop(e.target.value)}
          >
            <option value="">Select City</option>
            {stops.map(s => (
              <option key={s.id} value={s.id}>
                {s.city}
              </option>
            ))}
          </select>

          <input
            className="input-box"
            placeholder="Activity name"
            value={activity}
            onChange={e => setActivity(e.target.value)}
          />

          <input
            className="input-box"
            placeholder="Cost"
            type="number"
            value={cost}
            onChange={e => setCost(e.target.value)}
          />

          <button className="btn-primary" onClick={addActivity}>
            Add Activity
          </button>
        </div>

        <br />

        {/* City List */}
        <div className="app-card">
          <h3>Trip Cities</h3>
          {stops.map(s => (
            <div key={s.id}>
              📍 {s.city}
            </div>
          ))}
        </div>

        <br />

        {/* Navigation */}
        <div style={{ display: "flex", gap: "10px" }}>
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
