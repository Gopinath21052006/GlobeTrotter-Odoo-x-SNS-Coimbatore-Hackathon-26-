import { useEffect, useState } from "react";
import { api } from "../api";

export default function Timeline({ tripId, setPage }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/timeline/${tripId}`).then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Trip Timeline</h2>
      {data.map((d, i) => (
        <div key={i} style={{border:"1px solid #ccc", margin:"10px", padding:"10px"}}>
          <b>{d.date}</b>
          <div>{d.city}</div>
          <div>{d.activity}</div>
          <div>₹{d.cost}</div>
        </div>
      ))}

      <button onClick={() => setPage("dashboard")}>Back to Trips</button>
    </div>
  );
}
