import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Share() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/share/${tripId}`).then(res => setData(res.data));
  }, [tripId]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>{data.trip}</h2>

      {data.stops.map((s, i) => (
        <div key={i}>
          <h3>{s.city}</h3>
          {s.activities.map((a, j) => (
            <div key={j}>
              {a.name} – ₹{a.cost}
            </div>
          ))}
        </div>
      ))}

      <button onClick={() => navigate("/dashboard")}>
        Back
      </button>
    </div>
  );
}
