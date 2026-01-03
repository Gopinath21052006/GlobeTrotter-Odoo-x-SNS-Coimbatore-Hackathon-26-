import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard({ user, setTripId, setPage }) {
  const [trips, setTrips] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/trips/${user.user_id}`)
      .then(res => setTrips(res.data));
  }, []);

  const createTrip = async () => {
    await axios.post("http://127.0.0.1:8000/trips", null, {
      params: {
        user_id: user.user_id,
        name,
        start_date: "2025-01-01",
        end_date: "2025-01-05"
      }
    });
    window.location.reload();
  };

  return (
    <div>
      <h2>Your Trips</h2>
      <input placeholder="Trip name" onChange={e => setName(e.target.value)} />
      <button onClick={createTrip}>Create Trip</button>

      {trips.map(t => (
        <div key={t.id}>
          {t.name}
          <button onClick={() => { setTripId(t.id); setPage("planner"); }}>
            Open
          </button>
        </div>
      ))}
    </div>
  );
}
