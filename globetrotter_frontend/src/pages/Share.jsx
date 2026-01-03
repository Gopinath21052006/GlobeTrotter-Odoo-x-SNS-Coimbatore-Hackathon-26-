import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Share() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/share/${tripId}`)
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return <div className="center-screen">Loading itinerary…</div>;
  }

  if (!data || data.stops.length === 0) {
    return (
      <div className="center-screen">
        <div className="app-card">
          <h3>No trip details yet</h3>
          <p>Add cities and activities before sharing your trip.</p>
          <button className="btn-primary" onClick={() => navigate(`/trip/${tripId}`)}>
            Go to Planner
          </button>
        </div>
      </div>
    );
  }

  const total = data.stops.reduce(
    (sum, s) =>
      sum + s.activities.reduce((a, b) => a + Number(b.cost), 0),
    0
  );

  return (
    <div className="share-page">

      <h2 className="page-title">{data.trip}</h2>

      <div className="share-summary">
        Total Trip Cost: <b>₹ {total}</b>
      </div>

      {data.stops.map((s, i) => (
        <div key={i} className="share-city">
          <h3>📍 {s.city}</h3>

          {s.activities.map((a, j) => (
            <div key={j} className="share-activity">
              <span>{a.name}</span>
              <span>₹{a.cost}</span>
            </div>
          ))}
        </div>
      ))}

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button className="btn-primary" onClick={() => navigate(`/budget/${tripId}`)}>
          View Budget
        </button>
        <button className="btn-primary" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      </div>

    </div>
  );
}
