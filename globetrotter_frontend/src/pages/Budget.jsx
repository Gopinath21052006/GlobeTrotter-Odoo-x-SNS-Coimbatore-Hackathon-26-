import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function Budget() {
  const { tripId } = useParams();        // read trip id from URL
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get(`/budget/${tripId}`)
      .then(res => setTotal(res.data.total_cost));
  }, [tripId]);

  return (
    <div>
      <h2>Trip Budget</h2>
      <h1>₹ {total}</h1>

      <button onClick={() => navigate(`/timeline/${tripId}`)}>
        View Timeline
      </button>
    </div>
  );
}
