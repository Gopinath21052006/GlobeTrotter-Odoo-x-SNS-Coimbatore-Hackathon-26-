import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function Budget() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/budget/${tripId}`)
      .then(res => setTotal(res.data.total_cost))
      .finally(() => setLoading(false));
  }, [tripId]);

  if (loading) {
    return <div className="center-screen">Calculating budget…</div>;
  }

  const getStatus = () => {
    if (total < 10000) return "Low Budget 🟢";
    if (total < 50000) return "Moderate Budget 🟡";
    return "Luxury Trip 🔴";
  };

  return (
    <div className="budget-page">

      <h2 className="page-title">💰 Trip Budget</h2>

      <div className="budget-card">
        <p>Total Spend</p>
        <h1>₹ {total}</h1>
        <span>{getStatus()}</span>
      </div>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px" }}>
        <button className="btn-primary" onClick={() => navigate(`/timeline/${tripId}`)}>
          View Timeline
        </button>
        <button className="btn-primary" onClick={() => navigate(`/itinerary/${tripId}`)}>
          View Itinerary
        </button>
      </div>

    </div>
  );
}
