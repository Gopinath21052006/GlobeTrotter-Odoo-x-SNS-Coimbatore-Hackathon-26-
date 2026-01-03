import { useEffect, useState } from "react";
import { api } from "../api";

export default function Budget({ tripId, setPage }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get(`/budget/${tripId}`).then(res => setTotal(res.data.total_cost));
  }, []);

  return (
    <div>
      <h2>Trip Budget</h2>
      <h1>₹ {total}</h1>
      <button onClick={() => setPage("timeline")}>View Timeline</button>
    </div>
  );
}
