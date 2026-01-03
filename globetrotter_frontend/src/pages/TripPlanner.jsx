import axios from "axios";
import { useState } from "react";

export default function TripPlanner({ tripId, setPage }) {
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");
  const [cost, setCost] = useState("");

  const addCity = async () => {
    await axios.post("http://127.0.0.1:8000/stops", null, {
      params: {
        trip_id: tripId,
        city,
        start_date: "2025-01-01",
        end_date: "2025-01-02"
      }
    });
    alert("City added");
  };

  const addActivity = async () => {
    await axios.post("http://127.0.0.1:8000/activities", null, {
      params: {
        stop_id: 1,
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

      <input placeholder="Activity" onChange={e => setActivity(e.target.value)} />
      <input placeholder="Cost" onChange={e => setCost(e.target.value)} />
      <button onClick={addActivity}>Add Activity</button>

      <button onClick={() => setPage("timeline")}>View Timeline</button>
    </div>
  );
}
