import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function Timeline() {
  const { tripId } = useParams();      // Get trip id from URL
  const navigate = useNavigate();     // For page navigation
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/timeline/${tripId}`).then(res => setData(res.data));
  }, [tripId]);

  return (
    <div>
      <h2>Trip Timeline</h2>

      {data.map((d, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px"
          }}
        >
          <b>{d.date}</b>
          <div>{d.city}</div>
          <div>{d.activity}</div>
          <div>₹{d.cost}</div>
        </div>
      ))}

      <button onClick={() => navigate("/dashboard")}>
        Back to Trips
      </button>
    </div>
  );
}
