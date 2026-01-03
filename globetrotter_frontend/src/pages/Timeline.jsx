import axios from "axios";
import { useEffect, useState } from "react";

export default function Timeline({ tripId, setPage }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/timeline/${tripId}`)
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Trip Timeline</h2>
      {data.map((d, i) => (
        <div key={i}>
          {d.date} – {d.city} – {d.activity} – ₹{d.cost}
        </div>
      ))}
      <button onClick={() => setPage("dashboard")}>Back</button>
    </div>
  );
}
