import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Itinerary() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ days: {}, totals: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/itinerary/${tripId}`)
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return <div className="center-screen">Loading itinerary…</div>;
  }

  const days = Object.keys(data.days);

  if (days.length === 0) {
    return (
      <div className="center-screen">
        <div className="app-card">
          <h3>No itinerary yet</h3>
          <p>Add cities and activities to see your trip plan.</p>
          <button className="btn-primary" onClick={() => navigate(`/trip/${tripId}`)}>
            Go to Trip Planner
          </button>
        </div>
      </div>
    );
  }

  const grandTotal = Object.values(data.totals).reduce(
    (sum, v) => sum + Number(v),
    0
  );

  return (
    <>
      <Header />

      <div className="page-container">
        <h2 className="page-title">🗺️ Trip Itinerary</h2>

        {days.map((day, i) => (
          <div key={day} className="day-card">
            <h3>Day {i + 1} — {day}</h3>

            {data.days[day].map((a, idx) => (
              <div key={idx} className="activity-row">
                <span>
                  {a.activity} <small style={{ color: "#777" }}>({a.city})</small>
                </span>
                <span>₹{a.cost}</span>
              </div>
            ))}

            <div className="day-total">
              Day Total: ₹{data.totals[day]}
            </div>
          </div>
        ))}

        <div className="app-card" style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>💰 Total Trip Cost</h3>
          <h1>₹ {grandTotal}</h1>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "15px" }}>
            <button className="btn-primary" onClick={() => navigate(`/timeline/${tripId}`)}>
              Timeline
            </button>
            <button className="btn-primary" onClick={() => navigate(`/budget/${tripId}`)}>
              Budget
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
