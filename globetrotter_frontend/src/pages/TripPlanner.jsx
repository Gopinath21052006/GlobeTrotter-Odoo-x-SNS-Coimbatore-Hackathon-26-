import { useEffect, useState } from "react";
import { api } from "../api";

export default function TripPlanner({ tripId, setPage }) {
  const [city, setCity] = useState("");
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState("");
  const [activity, setActivity] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    api.get(`/stops/${tripId}`).then(res => setStops(res.data));
  }, []);

  const addCity = async () => {
    await api.post("/stops", null, {
      params: {
        trip_id: tripId,
        city,
        start_date: "2025-01-01",
        end_date: "2025-01-02"
      }
    });
    window.location.reload();
  };

  const addActivity = async () => {
    await api.post("/activities", null, {
      params: {
        stop_id: selectedStop,
        name: activity,
        cost,
        date: "2025-01-01"
      }
    });
    alert("Activity added");
  };

  return (
    <div>
      <h2>Trip Planner</h2>

      <input placeholder="City" onChange={e => setCity(e.target.value)} />
      <button onClick={addCity}>Add City</button>

      <select onChange={e => setSelectedStop(e.target.value)}>
        <option>Select City</option>
        {stops.map(s => (
          <option key={s.id} value={s.id}>{s.city}</option>
        ))}
      </select>

      <input placeholder="Activity" onChange={e => setActivity(e.target.value)} />
      <input placeholder="Cost" onChange={e => setCost(e.target.value)} />
      <button onClick={addActivity}>Add Activity</button>

      <button onClick={() => setPage("timeline")}>View Timeline</button>
      <button onClick={() => setPage("budget")}>View Budget</button>
      <button onClick={() => setPage("share")}>Share Trip</button>
    </div>
  );
}
