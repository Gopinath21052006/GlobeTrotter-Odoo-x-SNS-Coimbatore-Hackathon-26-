import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Timeline() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/timeline/${tripId}`)
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, [tripId]);

  const grouped = data.reduce((acc, item) => {
    acc[item.date] = acc[item.date] || [];
    acc[item.date].push(item);
    return acc;
  }, {});

  if (loading) {
    return <div className="center-screen">Loading timeline…</div>;
  }

  if (data.length === 0) {
    return (
      <div className="center-screen">
        <div className="app-card">
          <h3>No activities yet</h3>
          <p>Add activities in Trip Planner to see your timeline.</p>
          <button className="btn-primary" onClick={() => navigate(`/trip/${tripId}`)}>
            Go to Planner
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-page">
      <h2 className="page-title">Trip Timeline</h2>

      <div className="timeline">
        {Object.keys(grouped).map(date => (
          <div key={date}>
            <h4 style={{ margin: "20px 0 10px" }}>{date}</h4>

            {grouped[date].map((d, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot"></div>

                <div className="timeline-card">
                  <div className="timeline-city">📍 {d.city}</div>
                  <div className="timeline-activity">{d.activity}</div>
                  <div className="timeline-cost">₹{d.cost}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button className="btn-primary" onClick={() => navigate(`/itinerary/${tripId}`)}>
          Itinerary
        </button>
        <button className="btn-primary" onClick={() => navigate(`/budget/${tripId}`)}>
          Budget
        </button>
        <button className="btn-primary" onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
      </div>
    </div>
  );
}
